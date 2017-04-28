const deepGroupRemove = (arr , name)=>{// need to take in an array of all articles and and a name of group abd remove the group from all the articles
const myLength = arr.length;
for(let i = 0; i <  arr.length; i++ ){
    for(let z = 0; z < arr[i].relatedArticles.length; z++ ){
        if(arr[i].relatedArticles[z].name === name){
            arr[i].relatedArticles.splice(z ,1);
        }
    }
}
return arr
}

module.exports = deepGroupRemove