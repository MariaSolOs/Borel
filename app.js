//Package imports
const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      path = require('path');
require('dotenv').config();

//Models
const Institution = require('./models/Institution');
const NotePost = require('./models/NotePost');

//Setting environment variables
const PORT = process.env.PORT || 5000;
      
//Mongoose setup 
require('./config/mongoose');

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.post('/notes', (req, res) => {
    //Create note post
    const newNote = new NotePost({
        institution: req.body.inst,
        course: req.body.course,
        images: req.body.URLs,
        creatorEmail: req.body.email
    });
    newNote.save()
    .then(note => {
        //Save institution and course if needed
        Institution.findOne({name: req.body.inst})
        .then(inst => {
            if(!inst) {
                const newInst = new Institution({
                    name: req.body.inst,
                    courses: [req.body.course]
                });
                newInst.save();
            }
            else if(!inst.courses.includes(req.body.course)) {
                inst.courses.push(req.body.course);
                inst.save();
            }
            res.status(200).send('Note created');
        }
    )})
    .catch(err => res.status(404).send('Mongoose error: ', err));
});

app.get('/institutions', (req, res) => {
    Institution.find({})
    .then(institutions => res.json(institutions))
    .catch(err => res.status(404).send('Mongoose error: ', err))
});

app.get('/notes', (req, res) => {
    NotePost.find({
        institution: req.query.inst, 
        course: req.query.course
    })
    .then(notes => res.json(notes))
    .catch(err => res.status(404).send('Mongoose error: ', err))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Borel on port ${PORT}.`);
});