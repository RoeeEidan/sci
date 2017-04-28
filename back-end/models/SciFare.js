const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Defining the schema for reviews
const articleSchema = new Schema({
    heroObjects: Array,
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
    heroObjects: Array,
    relatedArticles: [articleSchema],
    title: String,
    name: String,
    articleBody: String,
    date: String,
    showAtHomePage: Boolean,
    summery: String,
});


const sciFareSchema = new Schema({
            subCategorys: Array,
            heroObjects: Array,
            allArticles: [articleSchema],
            scince: [articleSchema],
            health: [articleSchema],
            technology: [articleSchema],
            groups: [groupSchema], 
        });





const SciFare = mongoose.model('SciFare', sciFareSchema);
module.exports = SciFare;
