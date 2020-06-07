//Package imports
const express = require('express'),
      app = express(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
require('dotenv').config();

//Models
const NotePost = require('./models/NotePost');

//Setting environment variables
const mongoUrl = process.env.MONGODB_URI,
      PORT = process.env.PORT || 5000;
      
//Mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUrl);

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/notes', (req, res) => {
    const newNote = new NotePost({
        creatorEmail: req.body.email,
        courseCode: req.body.courseCode,
        courseNumber: req.body.courseNumber,
        images: req.body.URLs
    });
    newNote.save()
    .then(note => res.status(200).send('Note created'))
    .catch(err => res.status(404).send('Mongoose error'));
});

app.get('/notes', (req, res) => {
    NotePost.find({courseCode: req.query.courseCode,
    courseNumber: req.query.courseNumber})
    .then(notes => res.json(notes))
    .catch(err => res.status(404).send('Mongoose error'))
});

app.listen(PORT, () => {
    console.log(`Borel on port ${PORT}.`);
});