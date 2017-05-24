const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SciFare = require('./models/SciFare');
let fs = require('fs');
const bcrypt = require('bcryptjs');
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

const PORT = process.env.PORT || 8080;


mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to db at /data/db/")
});


let StateID = '5902e27baca2984a1299180a';


// Loging Stuff


app.post('/newuser', (req, res) => {
  console.log('GOT THE POST REQUEST')
  bcrypt.genSalt(10, (err, salt) => {
    console.log('SALT STARTED')
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      console.log('BYCRYPT STARTED Hashh!!!', hash);
      // Store hash in your password DB.
      if (err) throw err;
      SciFare.findById(StateID)
        .then(scifare => {
          let username = req.body.username
          scifare.users = { username: username, hash: hash }
          res.send('user created');
          return scifare.save();
        })
        .catch(err => {
          console.log(err);
        })
    });
  });
});


app.post('/login', (req, res) => {
  var pass = req.body.password;
  let user;
  SciFare.findById(StateID)
    .then(scifare => {
      user = scifare.users
      bcrypt.compare(pass, user.hash).then((resault) => {
        if (resault === true) {
          res.json(true)
        }else {
          res.json(false)
          // res.status(403)
          // .json({ err: 'Incorrect password' });
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
});



// DATA BASE STUFF 




app.post('/isGrouped', function (req, res) {//add new hero
  console.log(req.body)
  let thisHero = req.body;
  SciFare.findById(StateID)
    .then(scifare => {
      let articlesArray = [...scifare.allArticles]
      if (articlesArray[req.body.index].articleGroups) {
        let thisGroups = articlesArray[req.body.index].articleGroups;
        for (let i = 0; i < thisGroups.length; i++) { // loops through the article related groups
          if (thisGroups[i] === req.body.name) {
            res.send(i);
          }
        }
        res.send(false);
      } else {
        alert("problem at server.js 107")
      }
      return true
    })
    .catch(err => {
      console.log(err);
    })
});

//HOME PAGE CHANGES


app.post('/NewHero', function (req, res) {//add new hero
  console.log(req.body)
  let thisHero = req.body;
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.heroObjects.push(thisHero);
      console.log(scifare);
      res.send('new hero saved!');
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
      res.send("Sub Category Removed");
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});



app.post('/RemoveNoCategoryArticles', function (req, res) {  //remove a articles with no category USED TO HELP ME, NO USEAGE FROM USER
  console.log(req.body.index)
  let index = req.body.index;
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(scifare);
      for(let i = 0; i < scifare.allArticles.length; i++){
        if(!scifare.allArticles[i].category || (scifare.allArticles[i].category === 'Chose a Category') || (scifare.allArticles[i].category === '') ){
          scifare.allArticles.splice(i , 1)
        }
      }
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


app.get('/GetHomePageContent', (req, res) => { // get the home page state 
  SciFare.findById(StateID)
    .then(scifare => {
      let homePageObject = {};
      homePageObject.heroObjects = scifare.heroObjects;
      homePageObject.subCategorys = scifare.subCategorys;
      homePageObject.articles = [];
      homePageObject.groups = [];
      for (let i = 0; i < scifare.allArticles.length; i++) {
        let article = {
          index: i,
          name: scifare.allArticles[i].name,
          category: scifare.allArticles[i].category,
          articleGroups: scifare.allArticles[i].articleGroups,
          _id: scifare.allArticles[i]._id,
          isHidden: scifare.allArticles[i].isHidden,
          showAtHomePage: scifare.allArticles[i].showAtHomePage
        }
        homePageObject.articles.push(article);
      }
      for (let i = 0; i < scifare.groups.length; i++) {
        let group = {
          index: i,
          name: scifare.groups[i].name,
          _id: scifare.groups[i]._id,
          isHidden: scifare.groups[i].isHidden,
        }
        homePageObject.groups.push(group);
      }
      res.json(homePageObject);
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
    summery: req.body.summery,
    isHidden: req.body.isHidden,
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


app.post('/SaveToArticlesInProcess', function (req, res) {//  save article to inProcess
  console.log('we got a post', req.body)
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
      scifare.articlesInProcess.push(newArticle);
      // console.log(scifare.inProcess);
      res.send("Saved to in process");
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});



app.post('/updateArticlesInProcess/:index', function (req, res) {//  save article to inProcess
  console.log('we got a post', req.body)
  let newArticle = {
    isHidden: req.body.isHidden,
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
      scifare.articlesInProcess[req.params.index] = newArticle;
      // console.log(scifare.inProcess);
      res.send("updated in process");
      return scifare.save();
    })
    .catch(err => {
      console.log(err);
    })
});



app.post('/saveGroupToInProcess', function (req, res) {//saving a group article
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
    subCategorys: req.body.subCategorys,
    isHidden: req.body.isHidden,
  }
  SciFare.findById(StateID)
    .then(scifare => {
      scifare.groupsInProcess.push(newGroup);
      console.log(scifare);
      res.send('group saved');
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
      console.log(req.body.article);
      let article = req.body.article;
      scifare.allArticles[req.body.index] = article;
      scifare.save();
      res.send('article updated');
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.post('/EditGroup/:x', (req, res) => { //edit a group object by id
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(req.body);
      let article = req.body.article;
      scifare.groups[req.body.index] = article;
      scifare.save();
      res.send('yess');
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.post('/RemoveGroupFromArticle', (req, res) => { //remove a group from article
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(req.body);
      for (let i = 0; i < scifare.allArticles[req.body.articleIndex].articleGroups.length; i++) {
        console.log(scifare.allArticles[req.body.articleIndex].articleGroups[i], scifare.groups[req.body.groupIndex].name)
        if (scifare.allArticles[req.body.articleIndex].articleGroups[i] === scifare.groups[req.body.groupIndex].name) {
          console.log('FOUNDDD')
          scifare.allArticles[req.body.articleIndex].articleGroups.splice(i, 1)
        }
      }
      scifare.save();
      res.send('yess');
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});


app.post('/AddGroupToArticle', (req, res) => { //add a group to article 
  SciFare.findById(StateID)
    .then(scifare => {
      console.log(req.body);
      // thisAllArticles[index].articleGroups.splice(groupIndex, 1)
      scifare.allArticles[req.body.articleIndex].articleGroups.push(scifare.groups[req.body.groupIndex].name)
      scifare.save();
      res.send('yess');
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});

//AddGroupToArticle'


app.post('/NewGroup', function (req, res) {//adding a group to the state
  console.log('we got a post')
  let newGroup = {
    isHidden: req.body.isHidden,
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
        for (let z = 0; z < scifare.allArticles.length; z++) { // 
          console.log('started the 2nd for loop')
          if (scifare.allArticles[z].name === newGroup.relatedArticles[i].name) {
            console.log('found a match')
            scifare.allArticles[z].articleGroups.push(newGroup.name) // pushs the group in to each related article
          }
        }
      }
      scifare.groups.push(newGroup);
      console.log(scifare);
      res.send(scifare.groups[scifare.groups.length - 1]._id);
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
      // console.log('IDDDDDD', scifare.groups[req.body.index]._id)
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


app.get('/GetGroup/:id', (req, res) => { // get group by id 
  SciFare.findById(StateID)
    .then(scifare => {
      let group = scifare.groups[req.params.id];
      res.json(group);
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