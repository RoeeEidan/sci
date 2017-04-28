const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let fs = require('fs'); 
let S3FS = require('s3fs');
let multiparty = require('connect-multiparty');
let multer = require('multer');
var assert = require('assert');
var env = require('node-env-file');

env(__dirname + '/.env');

let multipartyMiddleware = multiparty(); 

let upload = multer({ dest : 'public/uploads/'})

let s3fsImpl = new S3FS('roeetestbucket123' , {
  accessKeyId: process.env.KEYID,
  secretAccessKey: process.env.ACCESSKEYID
});


s3fsImpl.create();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + 'build/')); // for build

app.use(multipartyMiddleware); 

// mongoose.connect('mongodb://localhost/data/db/');
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// 	console.log("Connected to db at /data/db/")
// });

const PORT = process.env.PORT || 8080;


/// POST REQUESTS

app.post('/uploads', upload.single('avatar') ,function(req,res,next){ //upload image from whysiwyg editor
  console.log('req.files.image',req.files.image)
  let file = req.files.image
    let stream = fs.createReadStream(file.path);
    return s3fsImpl.writeFile(file.originalFilename, stream , {"ContentType":"image/png"} ).then(function(){
      fs.unlink(file.path , function(err){
        if(err){
          console.error(err)
        }
      })
      res.send('yesss');
  })
});

// app.post('/herouploads', upload.single('avatar') ,function(req,res,next){ //upload image from whysiwyg editor
//   console.log('req.body',req.files.image)
//   let file = req.files.image
//     let stream = fs.createReadStream(file.path);
//     return s3fsImpl.writeFile(file.originalFilename, stream , {"ContentType":"image/png"} ).then(function(){
//       fs.unlink(file.path , function(err){
//         if(err){
//           console.error(err)
//         }
//       })
//       res.send('yesss');
//   })
// });

app.post('/newArticle',function(req,res){// recives the html string from the editor
  console.log('we got a post request',  req.body )
  res.end("yes");
});


// GET REQUESTS

app.get('/', function (req, res) { //get all review by id
   console.log('get endpoint /')
  res.sendFile('/index.html',{root: __dirname + '/puclic'});
}); 



 
 
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`)
})