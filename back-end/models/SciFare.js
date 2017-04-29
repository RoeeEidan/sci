const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Defining the schema for reviews

const heroSchema = new Schema({
    type: String,
    title: String,
    credit: String,
    url: String,
    name: String
})


const articleSchema = new Schema({
    heroObjects: [heroSchema],
    title: String,
    name: String,
    articleBody: String,
    articleGroups: Array,
    category: String,
    subCategorys: Array,
    date: String,
    showAtHomePage: Boolean,
    summery: String
})

const groupSchema = new Schema({
    heroObjects: [heroSchema],
    relatedArticles: [articleSchema],
    title: String,
    name: String,
    subCategorys: Array,
    articleBody: String,
    date: String,
    showAtHomePage: Boolean,
    summery: String,
});


const sciFareSchema = new Schema({
    subCategorys: Array,
    heroObjects: [heroSchema],
    allArticles: [articleSchema],
    scince: [articleSchema],
    health: [articleSchema],
    technology: [articleSchema],
    groups: [groupSchema],
});





const SciFare = mongoose.model('SciFare', sciFareSchema);
module.exports = SciFare;
