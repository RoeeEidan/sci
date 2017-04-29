const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SciFare = require('./models/SciFare');
let fs = require('fs');
let S3FS = require('s3fs');
let multiparty = require('connect-multiparty');
let multer = require('multer');
var assert = require('assert');
var env = require('node-env-file');

// functions

let deepGroupRemove = require('./functions/deepGroupRemove');
let deepGroupAdd = require('./functions/deepGroupAdd');

env(__dirname + '/.env');

let multipartyMiddleware = multiparty();

let upload = multer({ dest: 'public/uploads/' })

let s3fsImpl = new S3FS('roeetestbucket123', {
  accessKeyId: process.env.KEYID,
  secretAccessKey: process.env.ACCESSKEYID
});


s3fsImpl.create();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + 'build/')); // for build

app.use(multipartyMiddleware);

mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to db at /data/db/")
});

const PORT = process.env.PORT || 8080;

// DATA BASE STUFF 


let StateID = '5902e27baca2984a1299180a';


//HOME PAGE CHANGES


app.post('/NewHero', function (req, res) {//add new hero
  console.log(req.body)
  let thisHero = req.body;
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.heroObjects.push(thisHero);
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/RemoveHero', function (req, res) {//Remove Home Hero
  console.log(req.body)
  let id = req.body.index;
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.heroObjects.splice(id, 1);
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/NewCategory', function (req, res) {//Add New Category
  console.log(req.body.category)
  let category = req.body.category;
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.subCategorys.push(category)
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/RemoveCategory', function (req, res) {//remove a  Category
  console.log(req.body.index)
  let index = req.body.index;
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.subCategorys.splice(index, 1);
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});









app.get('/GetState', (req, res) => { // get the entire state 

  SciFare.findById(StateID)
    .then(scifare => {
      res.json(scifare);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.get('/GetArticle/:id', (req, res) => { // get article by id 

  SciFare.findById(StateID)
    .then(scifare => {
      let article = scifare.allArticles[req.params.id];

      res.json(article);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});



app.post('/NewState', function (req, res) {//create a new State
  console.log('got a post req', req.body)
  let newSciFare = SciFare({
    subCategorys: req.body.subCategorys,
    heroObjects: req.body.heroObjects,
    allArticles: req.body.allArticles,
    scince: req.body.scince,
    health: req.body.health,
    technology: req.body.technology,
    groups: req.body.groups,
  });

  newSciFare.save((err, newSciFare) => {
    if (err) {
      res.send(err);
    } else {
      console.log('newSciFare created.')
      res.send('yes');
    }
  })
});


app.post('/NewArticle', function (req, res) {//adding a article to the state
  console.log('we got a post')
  let newArticle = {
    heroObjects: req.body.heroObjects,
    title: req.body.title,
    name: req.body.name,
    articleBody: req.body.articleBody,
    articleGroups: req.body.articleGroups,
    category: req.body.category,
    subCategorys: req.body.subCategorys,
    date: req.body.date,
    showAtHomePage: req.body.showAtHomePage,
    summery: req.body.summery
  }
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.allArticles.push(newArticle);
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});


app.post('/DeleteArticle/:x', (req, res) => { //Delete a article by id
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(scifare.allArticles)
      scifare.allArticles.remove({ "_id": req.params.x });
      scifare.save();
      console.log(scifare.allArticles)
      res.json({ scifare });

    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.post('/DeleteArticle/:x', (req, res) => { //Edit a article by id
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(scifare.allArticles)
      scifare.allArticles.remove({ "_id": req.params.x });
      scifare.save();
      console.log(scifare.allArticles)
      res.json({ scifare });

    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.post('/EditArticle/:x', (req, res) => { //edit a article object by id
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(req.body);
      let article = req.body.article;
      scifare.allArticles[req.body.index] = article;
      scifare.save();
      res.json({ article });
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


// app.put('/:objectId', (req,res) => {
// 	let __object = req.body;
// 	let update = {
// 			property1:__object.property1,
// 			property2:__object.property2,
// 			property3:__object.property3,
// 		}

// 	let query = {"_id":req.params.objectId}

// 	[YOUR_MODEL_NAME].findOneAndUpdate(query, update, { new:true, runValidators:true })
// 		.then(updatedObject => {
// 			res.json(updatedObject);
// 		})
// 		.catch(err => {
// 			console.log(err)
// 			res.status(400).json({err});
// 		})

// });


app.post('/NewGroup', function (req, res) {//adding a group to the state
  console.log('we got a post')
  let newGroup = {
    heroObjects: req.body.heroObjects,
    relatedArticles: req.body.relatedArticles,
    title: req.body.title,
    name: req.body.name,
    articleBody: req.body.articleBody,
    date: req.body.date,
    showAtHomePage: req.body.showAtHomePage,
    summery: req.body.summery,
    subCategorys: req.body.subCategorys
  }
  SciFare.findById(StateID)
    .then(scifare => {
      console.log('started the thn()')
      let allArticles = [...scifare.allArticles];
      for (let i = 0; i < newGroup.relatedArticles.length; i++) { // adds the group to the related articles
        console.log('started the 1st for loop')
        for (let z = 0; z < scifare.allArticles.length; z++) {
          console.log('started the 2nd for loop')
          if (scifare.allArticles[z].name === newGroup.relatedArticles[i].name) {
            console.log('found a match')
            scifare.allArticles[z].articleGroups.push(newGroup.name)
          }
        }
      }
      scifare.groups.push(newGroup);
      console.log(scifare);
      res.send(scifare);
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});



app.post('/DeleteGroup/:x', (req, res) => { //Delete a group by id
  SciFare.findById(StateID)
    .then(scifare => {
      let name = req.body.name;
      for (let i = 0; i < scifare.allArticles.length; i++) { // removes the group from the related articles
        for (let z = 0; z < scifare.allArticles[i].articleGroups.length; z++) {
          if (scifare.allArticles[i].articleGroups[z] === name) {
            scifare.allArticles[i].articleGroups.splice(z, 1);
            console.log('removed');
          }
        }
      }
      console.log('id', req.params.x)
      scifare.groups.remove({ "_id": req.params.x });
      scifare.save();
      res.json({ scifare });

    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});



/// POST REQUESTS

app.post('/uploads', upload.single('avatar'), function (req, res, next) { //upload image from whysiwyg editor
  console.log('req.files.image', req.files.image)
  let file = req.files.image
  let stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream, { "ContentType": "image/png" }).then(function () {
    fs.unlink(file.path, function (err) {
      if (err) {
        console.error(err)
      }
    })
    res.send('yesss');
  })
});


app.post('/newArticle', function (req, res) {// recives the html string from the editor
  console.log('we got a post request', req.body)
  res.end("yes");
});


// GET REQUESTS

app.get('/', function (req, res) { //get all review by id
  console.log('get endpoint /')
  res.sendFile('/index.html', { root: __dirname + '/puclic' });
});





app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`)
})