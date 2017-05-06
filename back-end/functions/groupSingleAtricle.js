// articleGroups = scifare.allArticles[].articleGroups // ["name" , "name"]
// 1. needs to check if grouped
//2. if grouped to remove 
// and if not to add

const check = (groupName, articleGroups) => {
    // checks if grouped or not if grouped returns an object with info if not returns false
    for (let i = 0; i < articleGroups.length; i++) {
        if (articleGroups[i] === groupName) {
            return i
        }
    }
    return false
}

const singleArticleGroupRemove = (scifare) => {
    // needs to remove the article for the groups[].relatedArticles[] //( its a entire atricle )
}

const add = (scifare) => {
    
}

