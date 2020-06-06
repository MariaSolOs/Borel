//Package imports
const express = require('express'),
      app = express(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
require('dotenv').config();

//Models
const Image = require('./models/Image');

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

app.post('/notes/images', (req, res) => {
    Image.create({URL: req.body.url})
    .catch(err => console.log(err));
});

app.get('/notes/:imgId', (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Borel on port ${PORT}.`);
});