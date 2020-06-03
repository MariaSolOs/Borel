const express = require('express'),
      app = express(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser')
      multer = require('multer')
      GridFsStorage = require('multer-gridfs-storage'),
      Grid = require('gridfs-stream')
      crypto = require('crypto');

//Setting environment variables
const dbUrl = 'mongodb+srv://mariaSolOs:BorelisOphelia1518@boreldb-qkm76.azure.mongodb.net/test?retryWrites=true&w=majority',
//    dbUrl = process.env.BOREL_DATABASEURL || "mongodb://localhost/borel_app",
      PORT = process.env.PORT || 5000;
      
//Mongoose setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(dbUrl);
const conn = mongoose.createConnection(dbUrl);

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

//Create storage engine
const storage = new GridFsStorage({
    url: dbUrl,
    file: (req, file) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
        if(err) {return reject(err)}
        const filename = file.originalname;
        const fileInfo = {
            filename: filename,
            bucketName: 'images'
        }
        resolve(fileInfo);
        });
    })}
});
const upload = multer({storage});

app.post('/notes', upload.single('file'), (req, res, err) => {
    console.log('["/notes" post route]', req.body);
});

// app.get('/notes/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     //Check if file
//     if(!file || file.length === 0) {
//         return res.status(404).json({
//             err: "No file exists"
//         })
//     }   
//     //Check if image
//     if(file.contentType === "image/jpeg" || file.contentType === "image/png") {
//         //Read output to browser
//         const readstream = gfs.createReadStream(file.filename);
//         res.set('Content-Type', file.contentType);
//         readstream.pipe(res);
//     } else {
//         res.status(404).json({
//             err: "Not an image"
//         });
//     }
//   });
// });

app.get('/notes/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files || files.length === 0){
        return res.status(404).json({
          message: "Could not find file"
        });
      }
      var readstream = gfs.createReadStream({
        filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
    });
  });

app.listen(PORT, () => {
    console.log(`Borel on port ${PORT}.`);
});