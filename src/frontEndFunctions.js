import axios from 'axios';

export const getHomePageState = async () => {
    const response = await axios.get('http://localhost:8080/GetHomePageContent')
    let homePageObject = {};
    homePageObject.heroObjects = response.data.heroObjects;
    homePageObject.subCategorys = response.data.subCategorys;
    homePageObject.articles = response.data.articles;
    homePageObject.groups = response.data.groups;
    homePageObject.inProcess = response.data.inProcess;

    if(response.status !== 200)
        throw new Error(response.data)
    return homePageObject
}

