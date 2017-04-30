
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'; //
import { convertToRaw } from 'draft-js'; // 

//Components
import App from './App';
import HomeAdmin from './HomeAdmin';
import SingleHomeArticle from './SingleHomeArticle';
import NewGroup from './NewGroup';
import GroupHomeArticle from './GroupHomeArticle';
import EditArticle from './EditArticle';
import EditGroup from './EditGroup';


const NavBar = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/newarticle">New Article</Link></li>
            <li><Link to="/newgroup">New Group</Link></li>
            <li><Link to="/editArticle/0">Edit Article </Link></li>
            {/*<li><Link to="/DditGroup/0">Edit Group </Link></li>*/}
        </ul>

        <hr />
    </div>
)



export class AdminRouter extends React.Component {
    constructor() {
        super()
        this.state = {
            newSubCategory: false,
            subCategorys: ["Antripology", 'Sports'],
            heroObjects: [],// {type:'' , url: '' , title:'' , credit: '' name: ''}
            allArticles: [],
            scince: [],
            health: [],
            technology: [],
            groups: [], // {name:{ masterArticle: newArticle , relatedArticles: [] }}
            newArticle: {
                heroObjects: [],// {type:'' , url: '' , title:'' , credit ''}
                title: undefined,
                name: undefined,
                articleBody: undefined,
                articleGroups: [], // group name
                category: undefined,
                subCategorys: [],
                date: undefined,
                showAtHomePage: true,
                summery: undefined
            },
            newGroup: {
                heroObjects: [],// {type:'' , url: '' , title:'' , credit ''}
                relatedArticles: [],
                subCategorys: [],
                title: undefined,
                name: undefined,
                articleBody: undefined,
                date: undefined,
                showAtHomePage: true,
                summery: undefined,
                isInProccese: false
            },
        }


        this.defaultNewArticleState = {
            heroObjects: [],// {type:'' , url: '' , title:'' , credit ''}
            title: undefined,
            name: undefined,
            articleBody: undefined,
            articleGroups: [], // group name
            category: undefined,
            subCategorys: [],
            date: undefined,
            showAtHomePage: true,
            summery: undefined
        }


        this.defaultNewGroupState = {
            heroObjects: [],// {type:'' , url: '' , title:'' , credit ''}
            relatedArticles: [],
            title: undefined,
            name: undefined,
            articleBody: undefined,
            date: undefined,
            showAtHomePage: true,
            summery: undefined,
            subCategorys: [],
            isInProccese: false
        }

        // STUFF THAT I DIDNT WANT TO MAKE MY APP RERENDER

        this.newArticleSubCategorys = [];

        this.newGroupSubCategorys = [];

        this.newArticleBody = '';

        this.newGroupBody = '';

        this.myPath = undefined;

        //Home

        this.addCategory = this.addCategory.bind(this);
        this.newSubCategoryButton = this.newSubCategoryButton.bind(this);
        this.removeSubCategory = this.removeSubCategory.bind(this);
        this.postTo = this.postTo.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onHomeUploadFilesFormSubmit = this.onHomeUploadFilesFormSubmit.bind(this);
        this.removeHomeSingleHero = this.removeHomeSingleHero.bind(this);
        this.newGroupOnClick = this.newGroupOnClick.bind(this)
        this.deepRemoveGroup = this.deepRemoveGroup.bind(this);
        this.deepCatagoryGroupRemove = this.deepCatagoryGroupRemove.bind(this);
        this.arrayToRender = this.arrayToRender.bind(this);
        this.removeHomeSingleArticle = this.removeHomeSingleArticle.bind(this);
        this.editSingleArticle = this.editSingleArticle.bind(this);
        this.editGroup = this.editGroup.bind(this);


        //New Article
        this.addSubCategory = this.addSubCategory.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.editorContentToHtml = this.editorContentToHtml.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onPublishClick = this.onPublishClick.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onHomePageChange = this.onHomePageChange.bind(this);
        this.uploadNewArticleFile = this.uploadNewArticleFile.bind(this);
        this.onUploadFilesFormSubmit = this.onUploadFilesFormSubmit.bind(this);
        this.removeSingleHero = this.removeSingleHero.bind(this);
        this.onSummeryChange = this.onSummeryChange.bind(this);
        this.resetNewArticleState = this.resetNewArticleState.bind(this);
        this.removeSingleArticle = this.removeSingleArticle.bind(this);


        //New Group
        this.newGroupArrayToRender = this.newGroupArrayToRender.bind(this);
        this.groupSingleArticle = this.groupSingleArticle.bind(this);
        this.isGrouped = this.isGrouped.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.onUploadNewGroupForm = this.onUploadNewGroupForm.bind(this);
        this.removeSingleNewGroupHero = this.removeSingleNewGroupHero.bind(this);
        this.onNewGroupTitleChange = this.onNewGroupTitleChange.bind(this);
        this.onNewGroupSummeryChange = this.onNewGroupSummeryChange.bind(this);
        this.onNewGroupEditorStateChange = this.onNewGroupEditorStateChange.bind(this);
        this.onNewGroupPublishClick = this.onNewGroupPublishClick.bind(this);
        this.resetNewGroupState = this.resetNewGroupState.bind(this);
        this.onNewGroupHomePageChange = this.onNewGroupHomePageChange.bind(this);
        this.creatNewGroup = this.creatNewGroup.bind(this);
        this.groupAddSubCategory = this.groupAddSubCategory.bind(this);


        //Edit Article
        this.onEditPublishClick = this.onEditPublishClick.bind(this);



        this.myPathTo = this.myPathTo.bind(this);
        this.updateDbState = this.updateDbState.bind(this);
        this.deleteTo = this.deleteTo.bind(this);
        this.getArticleByID = this.getArticleByID.bind(this);
    }



    getArticleByID(id) {
        axios.get(`http://localhost:8080/GetArticle/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteTo(path, object) {
        axios.delete(`http://localhost:8080/${path}`, object)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    updateDbState() { ///  Saves the new State to the Data base
        this.postTo('NewState', this.state);
    }


    myPathTo(path) {
        if (path) {
            this.myPath = path
        } else {
            this.myPath = undefined
        }
    }


    // EDIT ARTICLE FUNCTIONS


    onEditPublishClick(articleIndex, article) {
        this.postTo(`EditArticle/${article._id}`, { article: article, index: articleIndex })
        console.log(articleIndex, article);
        let allArticles = [...this.state.allArticles];
        allArticles[articleIndex] = { ...article };
        this.setState({
            allArticles: allArticles
        })
    }


    // NEW GROUP FUNCTIONS


    groupAddSubCategory(index) {
        let thisSubCategory = this.state.subCategorys[index];
        // let newGroup = {...this.state.newGroup};
        let newGroupSubCategorys = [...this.newGroupSubCategorys];
        let notFound = true;
        for (let i = 0; i < newGroupSubCategorys.length; i++) {
            if (newGroupSubCategorys[i] === thisSubCategory) {
                notFound = false;
                newGroupSubCategorys.splice(i, 1);
                this.newGroupSubCategorys = newGroupSubCategorys;
            }
        } if (notFound) {
            newGroupSubCategorys.push(thisSubCategory);
            this.newGroupSubCategorys = newGroupSubCategorys;
        }
    }


    creatNewGroup() {
        let newGroup = { ...this.state.newGroup };
        newGroup.isInProccese = true;
        this.setState({
            newGroup: newGroup
        })
    }


    newGroupArrayToRender(articles) {
        let listToRender = [];
        for (let i = 0; i < articles.length; i++) {
            listToRender.push(
                <GroupHomeArticle
                    name={articles[i].name}
                    isGrouped={this.isGrouped}
                    index={i}
                    category={articles[i].category}
                    groupSingleArticle={this.groupSingleArticle}
                />
            )
        }
        return (
            <div>
                {listToRender}
            </div>
        )
    }


    onNewGroupHomePageChange() {
        const val = document.getElementById("homePageCheckbox").checked;
        let newState = { ...this.state };
        switch (val) {
            case false:
                newState.newGroup.showAtHomePage = false;
                this.setState({
                    newGroup: newState.newGroup
                })
                break;
            case true:
                newState.newGroup.showAtHomePage = true;
                this.setState({
                    newGroup: newState.newGroup
                })
                break;
            default: alert("this shouldnt happen")
        }
    }


    resetNewGroupState() {
        document.getElementById("uploadFilesForm").reset();
        document.getElementById("titleInput").value = "";
        document.getElementById("summeryInput").value = "";
        let newState = { ...this.state }
        newState.newGroup = { ...this.defaultNewGroupState };
        newState.newGroup.heroObjects = [];
        newState.newGroup.relatedArticles = [];
        this.setState({
            newGroup: newState.newGroup
        }, () => { console.log(this.state) })
        this.newGroupBody = '';
        this.newGroupSubCategorys = [];
    }


    onNewGroupPublishClick() { // ON CLICK OF PUBLISH BUTTON
        console.log("old state ", this.state)
        let nowDate = new Date();
        let date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
        let newState = { ...this.state };
        newState.groups = [...this.state.groups];
        newState.newGroup.date = date;
        newState.newGroup.articleBody = this.newGroupBody;
        newState.newGroup.subCategorys = [...this.newGroupSubCategorys];
        newState.groups.push(newState.newGroup);
        console.log("new state", newState);
        this.postTo('NewGroup', newState.newGroup);
        this.setState({
            groups: newState.groups,
        }, () => { console.log(this.state) })
        this.myPath = '/';
        this.resetNewGroupState();
    }


    onNewGroupEditorStateChange(editorContent) { // ON EDITOR CHANGE 
        const articleBodyString = this.editorContentToHtml(editorContent);
        // const newState = { ...this.state };
        // newState.newGroup.articleBody = articleBodyString;
        this.newGroupBody = articleBodyString
        // this.setState({
        //     newGroup: newState.newGroup
        // })
    };


    onNewGroupSummeryChange() {
        const text = document.getElementById("summeryInput").value;
        let newState = { ...this.state };
        newState.newGroup.summery = `${text}`;
        this.setState({
            newGroup: newState.newGroup
        })
    }


    onNewGroupTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.newGroup.title = `<h1>${text}</h1>`;
        this.setState({
            newGroup: newState.newGroup
        })
    }


    removeSingleNewGroupHero(heroIndex) { // REmoving a hero object from new article by index
        let newState = { ...this.state };
        newState.newGroup.heroObjects = [...this.state.newGroup.heroObjects];
        newState.newGroup.heroObjects.splice(heroIndex, 1)
        this.setState({
            newGroup: newState.newGroup
        })
    }


    onUploadNewGroupForm() {
        let file = document.getElementById("uploadFilesFile").files[0];
        let title = document.getElementById("uploadFilesTitle").value;
        let credit = document.getElementById("uploadFilesCredit").value;
        if (file && title && credit) {
            document.getElementById("uploadFilesForm").reset();
            let heroObject = {
                type: file.type,
                title: title,
                credit: credit,
                url: `https://s3.amazonaws.com/roeetestbucket123/${file.name}`,
                name: `${file.name}`
            };
            let newState = { ...this.state };
            newState.newGroup.heroObjects.push(heroObject);
            this.setState({
                newGroup: newState.newGroup
            })
            // this.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }

    }


    removeGroup(index, name, groupIndex) {
        let newState = { ...this.state };
        let thisAllArticles = [...this.state.allArticles];
        for (let i = 0; i < newState.newGroup.relatedArticles.length; i++) {
            if (newState.newGroup.relatedArticles[i] === this.state.allArticles[index]) {
                newState.newGroup.relatedArticles.splice(i, 1) // removes the article from the group
            }
        }
        thisAllArticles[index].articleGroups = [...this.state.allArticles[index].articleGroups];
        thisAllArticles[index].articleGroups.splice(groupIndex, 1); // removing from the article itself
        this.setState({
            allArticles: thisAllArticles,
            newGroup: newState.newGroup
        })
    }


    isGrouped(index, NAME) {
        if (NAME) {
            let articlesArray = [...this.state.allArticles]
            if (articlesArray[index].articleGroups) {
                let thisGroups = articlesArray[index].articleGroups;
                for (let i = 0; i < thisGroups.length; i++) {
                    if (thisGroups[i] === NAME) {
                        return i;
                    }
                }
                return false;
            } else {
                alert("problem at AdminRouter at isGrouped Func")
            }
        } else {
            let name = this.state.newGroup.name;
            let articlesArray = [...this.state.allArticles]
            if (articlesArray[index].articleGroups) {
                let thisGroups = articlesArray[index].articleGroups;
                for (let i = 0; i < thisGroups.length; i++) {
                    if (thisGroups[i] === name) {
                        return i;
                    }
                }
                return false;
            } else {
                alert("problem at AdminRouter at isGrouped Func")
            }
        }
    }


    groupSingleArticle(index, articleName) {
        let newState = { ...this.state };
        newState.newGroup.relatedArticles = [...this.state.newGroup.relatedArticles];
        let isGrouped = this.isGrouped(index); //returns either false or the index of the group
        if (isGrouped || isGrouped === 0) {
            this.removeGroup(index, newState.newGroup.name, isGrouped); // removes the group from the article
            for (let i = 0; i < newState.newGroup.relatedArticles.length; i++) {//this is the way to the articles  
                if (newState.newGroup.relatedArticles[i].name === articleName) {// removers the article from the group
                    newState.newGroup.relatedArticles.splice(i, 1);
                }
            }
        } else {
            let thisArticle = newState.allArticles[index];
            thisArticle.articleGroups = [...newState.allArticles[index].articleGroups];
            newState.newGroup.relatedArticles = [...this.state.newGroup.relatedArticles];
            thisArticle.articleGroups.push(newState.newGroup.name) // pushs the group to the article
            newState.newGroup.relatedArticles.push(thisArticle); // pushs the article to the group related array
        }
        this.setState({
            newGroup: newState.newGroup,
            allArticles: newState.allArticles
        })
        console.log(this.state);
    }




    // HOME PAGE FUNCTIONS


    editGroup(index) {
        this.myPath = `editGroup/${index}`;
        this.forceUpdate();
        this.mypathTo();
    }


    editSingleArticle(index) {
        this.myPath = `editArticle/${index}`;
        this.forceUpdate();
        this.mypathTo();
    }


    addCategory() {
        let newCategory = document.getElementById("newCategoryInput").value;
        this.postTo('NewCategory', { category: newCategory });
        let newSubCategorys = [...this.state.subCategorys];
        newSubCategorys.push(newCategory);
        this.setState({
            subCategorys: newSubCategorys,
            newSubCategory: false,
        }, () => { console.log(this.state) })
    }


    newSubCategoryButton() {
        this.setState({
            newSubCategory: true,
        })
    }


    removeSubCategory(index) {
        this.postTo('RemoveCategory', { index: index });
        console.log('running', index);
        let newSubCategorys = [...this.state.subCategorys]
        newSubCategorys.splice(index, 1);
        this.setState({
            subCategorys: newSubCategorys,
        })
    }


    removeHomeSingleArticle(i) {
        console.log(this.state);
        let newState = { ...this.state };
        newState.allArticles = [...this.state.allArticles];
        // all this removes the article from groups that he is related to
        for (let z = 0; z < newState.allArticles[i].articleGroups.length; z++) {//loops through the article that is removed groups
            for (let w = 0; w < newState.groups.length; w++) { // loops through the groups array
                for (let t = 0; t < newState.groups[w].relatedArticles.length; t++) { // loops through the related articles of each group
                    if (newState.groups[w].relatedArticles[t] === newState.allArticles[i]) {
                        newState.groups[w].relatedArticles.splice(t, 1)
                    }
                }
            }
        }

        newState.allArticles.splice(i, 1);
        this.setState({
            allArticles: newState.allArticles,
            groups: newState.groups
        }, () => {
            console.log(this.state)
        })
    }


    arrayToRender(articles) {
        let listToRender = [];
        for (let i = 0; i < articles.length; i++) {
            listToRender.push(
                <SingleHomeArticle
                    editSingleArticle={this.editSingleArticle}
                    name={articles[i].name}
                    removeSingleArticle={() => {
                        this.removeHomeSingleArticle(i);
                        this.postTo(`DeleteArticle/${articles[i]._id}`)
                    }}
                    index={i}
                    category={articles[i].category}
                />
            )
        }
        return (
            <div>
                {listToRender}
            </div>
        )

    }


    deepCatagoryGroupRemove(name, newState) {
        let newArray = [...newState.allArticles];
        for (let i = 0; i < newArray.length; i++) {// loops through array of articales
            for (let z = 0; z < newArray[i].articleGroups.length; z++) { // loops throu each article realated groups
                if (newArray[i].articleGroups[z] === name) { // looks for match
                    newArray[i].articleGroups = [...this.state.allArticles[i].articleGroups]
                    newArray[i].articleGroups.splice(z, 1);
                }
            }
        }
        this.setState({
            groups: newState.groups,
            allArticles: newArray
        }, () => { console.log(this.state) })
    }


    deepRemoveGroup(i) {
        let groupName = this.state.groups[i].name;
        this.postTo(`DeleteGroup/${this.state.groups[i]._id}`, { name: groupName })
        let newState = { ...this.state };
        newState.groups = [...this.state.groups];
        newState.groups.splice(i, 1);
        this.deepCatagoryGroupRemove(groupName, newState);
    }


    newGroupOnClick() {
        let groupName = document.getElementById("groupNameInput").value;
        let newState = { ...this.state };
        newState.newGroup.name = groupName;
        this.setState({
            newGroup: newState.newGroup,
        }, () => { console.log(this.state) })
        this.myPath = '/newgroup'
    }


    removeHomeSingleHero(heroIndex) { // REmoving a hero object from new article by index
        this.postTo('RemoveHero', { index: heroIndex })
        let newState = { ...this.state };
        newState.heroObjects.splice(heroIndex, 1)
        this.setState({
            heroObjects: newState.heroObjects
        })
    }


    onHomeUploadFilesFormSubmit() {
        let file = document.getElementById("uploadFilesFile").files[0];
        let title = document.getElementById("uploadFilesTitle").value;
        let credit = document.getElementById("uploadFilesCredit").value;
        if (file && title && credit) {
            document.getElementById("uploadFilesForm").reset();
            let heroObject = {
                type: file.type,
                title: title,
                credit: credit,
                url: `https://s3.amazonaws.com/roeetestbucket123/${file.name}`,
                name: `${file.name}`
            };
            this.postTo('NewHero', heroObject);
            let newState = { ...this.state };
            newState.heroObjects.push(heroObject);
            console.log(newState)
            this.setState({
                heroObjects: newState.heroObjects
            })
            // this.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }

    }



    uploadFile(file) {
        let form = new FormData();
        form.append(`image`, file);
        this.postTo('uploads', form)
    }


    postTo(path, object) {// POST FUNC THAT TAKES PATH AND OBJECT 
        axios.post(`http://localhost:8080/${path}`, object)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // NEW ARTICLE FUNCTIONS


    addSubCategory(categoryIndex) {
        let thisSubCategory = this.state.subCategorys[categoryIndex];
        let newSubArray = [...this.newArticleSubCategorys];
        let notFound = true;
        for (let i = 0; i < newSubArray.length; i++) {
            if (newSubArray[i] === thisSubCategory) {
                notFound = false;
                newSubArray.splice(i, 1);
                this.newArticleSubCategorys = newSubArray;
                console.log(this.newArticleSubCategorys);
            }
        } if (notFound) {
            newSubArray.push(thisSubCategory);
            this.newArticleSubCategorys = newSubArray;
            console.log(this.newArticleSubCategorys);
        }
    }


    removeSingleArticle(i) {
        console.log('runinggggg');
        let newState = { ...this.state };
        // all this removes the article from groups that he is related to
        for (let z = 0; z < newState.allArticles[i].articleGroups.length; z++) {//loops through the article that is removed groups
            for (let w = 0; w < newState.groups.length; w++) { // loops through the groups array
                for (let t = 0; t < newState.groups[w].relatedArticles.length; t++) { // loops through the related articles of each group
                    if (newState.groups[w].relatedArticles[t] === newState.allArticles[i]) {
                        newState.groups[w].relatedArticles.splice(t, 1)
                    }
                }
            }
        }
    }


    resetNewArticleState() {
        document.getElementById("uploadFilesForm").reset();
        document.getElementById("titleInput").value = "";
        document.getElementById("summeryInput").value = "";
        document.getElementById("homePageCheckbox").checked = true;
        document.getElementById("categoryOptions").value = "Chose a Catagory";
        this.newArticleBody = '';
        this.newArticleSubCategorys = [];
        let newState = { ...this.state }
        newState.newArticle = { ...this.defaultNewArticleState };
        newState.newArticle.heroObjects = [];
        newState.newArticle.articleGroups = [];
        this.setState({
            newArticle: newState.newArticle
        }, () => { console.log(this.state) })
    }


    onSummeryChange() {
        const text = document.getElementById("summeryInput").value;
        let newState = { ...this.state };
        newState.newArticle.summery = `${text}`;
        this.setState({
            newArticle: newState.newArticle
        })
    }



    removeSingleHero(heroIndex) { // REmoving a hero object from new article by index
        let newState = { ...this.state };
        newState.newArticle.heroObjects = [...this.state.newArticle.heroObjects]
        newState.newArticle.heroObjects.splice(heroIndex, 1)
        this.setState({
            newArticle: newState.newArticle
        })
    }


    onUploadFilesFormSubmit() {
        let file = document.getElementById("uploadFilesFile").files[0];
        let title = document.getElementById("uploadFilesTitle").value;
        let credit = document.getElementById("uploadFilesCredit").value;
        if (file && title && credit) {
            document.getElementById("uploadFilesForm").reset();
            let heroObject = {
                type: file.type,
                title: title,
                credit: credit,
                url: `https://s3.amazonaws.com/roeetestbucket123/${file.name}`,
                name: `${file.name}`
            };
            let newState = { ...this.state };
            newState.newArticle.heroObjects = [...this.state.newArticle.heroObjects]
            newState.newArticle.heroObjects.push(heroObject);
            this.setState({
                newArticle: newState.newArticle
            })
            // this.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }
    }


    uploadNewArticleFile(file) {
        let form = new FormData();
        form.append(`image`, file);
        this.postTo('uploads', form)
    }


    onHomePageChange() {
        const val = document.getElementById("homePageCheckbox").checked;
        let newState = { ...this.state };
        switch (val) {
            case false:
                newState.newArticle.showAtHomePage = false;
                this.setState({
                    newArticle: newState.newArticle
                })
                break;
            case true:
                newState.newArticle.showAtHomePage = true;
                this.setState({
                    newArticle: newState.newArticle
                })
                break;
            default: alert("this shouldnt happen")
        }
    }


    onCategoryChange() {
        const category = document.getElementById("categoryOptions").value;
        let newState = { ...this.state };
        newState.newArticle.category = category;
        this.setState({
            newArticle: newState.newArticle
        })
    }


    onPublishClick() { // ON CLICK OF PUBLISH BUTTON
        console.log("old state ", this.state)
        let nowDate = new Date();
        let date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
        let newState = { ...this.state };
        newState.allArticles = [...this.state.allArticles]
        newState.newArticle.date = date;
        newState.newArticle.articleBody = this.newArticleBody;
        newState.newArticle.subCategorys = [...this.newArticleSubCategorys];
        newState.allArticles.push(newState.newArticle);
        console.log("new state", newState)
        this.postTo('NewArticle', newState.newArticle);
        this.myPath = '/';
        this.setState({
            allArticles: newState.allArticles,
        })
        this.resetNewArticleState();
    }


    onTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.newArticle.name = `${text}`;
        newState.newArticle.title = `<h1>${text}</h1>`;
        this.setState({
            newArticle: newState.newArticle
        }, () => { console.log(this.state) })
    }


    uploadImage(file) { // UPLOAD IMAGE TO WHYSIWHYS 
        var form = new FormData();
        form.append('image', file);
        axios.post('http://localhost:8080/uploads', form)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        return new Promise(
            (resolve, reject) => {
                resolve({ data: { link: `https://s3.amazonaws.com/roeetestbucket123/${file.name}` } });
            }
        )
    };


    editorContentToHtml(editorContent) {  // TO HTML STRING
        const rawContentState = convertToRaw(editorContent.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        return markup;
    };


    onEditorStateChange(editorContent) { // ON EDITOR CHANGE 
        console.log(editorContent)
        const articleBodyString = this.editorContentToHtml(editorContent);
        const newState = { ...this.state };
        newState.newArticle.articleBody = articleBodyString;
        this.newArticleBody = newState.newArticle.articleBody;
        console.log(this.newArticleBody)

    };


    componentWillMount() {
        if (this.state.allArticles.length === 0) {
            let that = this;
            axios.get('http://localhost:8080/GetState')
                .then(function (response) {
                    console.log(response);
                    that.setState({
                        allArticles: response.data.allArticles,
                        groups: response.data.groups,
                        health: response.data.health,
                        heroObjects: response.data.heroObjects,
                        scince: response.data.scince,
                        subCategorys: response.data.subCategorys,
                        technology: response.data.technology,
                        _id: response.data.id
                    }, () => { console.log(that.state) })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.titleValue !== nextState.newArticle.name ||
            this.props.summeryValue !== nextState.newArticle.summery ||
            this.props.groupTitleValue !== nextState.newGroup.title ||
            this.props.groupSummeryValue !== nextState.newGroup.summery
        ) {
            return false
        } else {
            return true
        }
    }

    render() {
        console.log({ Editor })
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route exact path="/" render={(props) => {
                        return (
                            <HomeAdmin
                                editGroup={this.editGroup}
                                updateDbState={this.updateDbState}
                                addCategory={this.addCategory}
                                newSubCategoryButton={this.newSubCategoryButton}
                                newSubCategory={this.state.newSubCategory}
                                removeSubCategory={this.removeSubCategory}
                                subCategorys={this.state.subCategorys}
                                articleBody={this.state.newArticle.articleBody}
                                pathTo={this.myPathTo}
                                path={this.myPath}
                                startNewGroup={this.newGroupOnClick}
                                isInProccese={this.state.newGroup.isInProccese}
                                creatNewGroup={this.creatNewGroup}
                                arrayToRender={this.arrayToRender}
                                onUploadFilesFormSubmit={this.onHomeUploadFilesFormSubmit}
                                heroObjects={this.state.heroObjects}
                                removeSingleHero={this.removeHomeSingleHero}
                                scienceList={this.state.scince}
                                healthList={this.state.health}
                                technologyList={this.state.technology}
                                removeSingleArticle={this.removeHomeSingleArticle}
                                groupsArray={this.state.groups}
                                removeGroup={this.deepRemoveGroup}
                                allArticlesList={this.state.allArticles}
                            />
                        )
                    }} />
                    <Route path="/newarticle" component={(props) => (
                        <App
                            addSubCategory={this.addSubCategory}
                            subCategorys={this.state.subCategorys}
                            pathTo={this.myPathTo}
                            path={this.myPath}
                            summeryValue={this.state.newArticle.summery}
                            titleValue={this.state.newArticle.name}
                            heroObjects={this.state.newArticle.heroObjects}
                            removeSingleHero={this.removeSingleHero}
                            onUploadFilesFormSubmit={this.onUploadFilesFormSubmit}
                            onCategoryChange={this.onCategoryChange}
                            onPublishClick={this.onPublishClick}
                            onTitleChange={this.onTitleChange}
                            editorContentToHtml={this.editorContentToHtml}
                            onEditorStateChange={this.onEditorStateChange}
                            newArticleHeros={this.state.newArticle.heroObjects}
                            onHomePageChange={this.onHomePageChange}
                            onSummeryChange={this.onSummeryChange}
                            editor={<Editor
                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{ image: { uploadCallback: this.uploadImage } }}
                            />}
                        />)} />

                    <Route path="/newgroup" component={() => (
                        <NewGroup
                            groupAddSubCategory={this.groupAddSubCategory}
                            subCategorys={this.state.subCategorys}
                            pathTo={this.myPathTo}
                            path={this.myPath}
                            arrayToRender={this.newGroupArrayToRender}
                            groupTitleValue={this.state.newGroup.title}
                            groupSummeryValue={this.state.newGroup.summery}
                            scienceList={this.state.scince}
                            healthList={this.state.health}
                            technologyList={this.state.technology}
                            groupSingleArticle={this.groupSingleArticle}
                            isGrouped={this.isGrouped}
                            newGroupleHeros={this.state.newGroup.heroObjects}
                            onTitleChange={this.onNewGroupTitleChange}
                            onSummeryChange={this.onNewGroupSummeryChange}
                            onUploadFilesFormSubmit={this.onUploadNewGroupForm}
                            allArticles={this.state.allArticles}
                            editor={<Editor
                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                onEditorStateChange={this.onNewGroupEditorStateChange}
                                toolbar={{ image: { uploadCallback: this.uploadImage } }}
                            />}
                            onPublishClick={this.onNewGroupPublishClick}
                            onHomePageChange={this.onNewGroupHomePageChange}
                            removeSingleHero={this.removeSingleNewGroupHero}
                        />
                    )} />
                    <Route path='/editArticle/:i' component={(path) => {
                        let id = path.match.params.i;
                        return (
                            <EditArticle
                                id={id}
                                subCategorys={this.state.subCategorys}
                                onPublishClick={this.onEditPublishClick}
                                uploadFile={this.uploadFile}
                            /*
                                                            getArticleByID={this.getArticleByID}
                                                            addSubCategory={this.addSubCategory}
                                                            subCategorys={this.state.subCategorys}
                                                            pathTo={this.myPathTo}
                                                            path={this.myPath}
                                                            summeryValue={this.state.newArticle.summery}
                                                            titleValue={this.state.newArticle.name}
                                                            heroObjects={this.state.newArticle.heroObjects}
                                                            removeSingleHero={this.removeSingleHero}
                                                            onUploadFilesFormSubmit={this.onUploadFilesFormSubmit}
                                                            onCategoryChange={this.onCategoryChange}
                                                            onTitleChange={this.onTitleChange}
                                                            editorContentToHtml={this.editorContentToHtml}
                                                            onEditorStateChange={this.onEditorStateChange}
                                                            newArticleHeros={this.state.newArticle.heroObjects}
                                                            onHomePageChange={this.onHomePageChange}
                                                            onSummeryChange={this.onSummeryChange}*/


                            /*editor={<Editor

                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{ image: { uploadCallback: this.uploadImage } }}
                            />}*/
                            />
                        )
                    }} />
                    <Route path='/EditGroup/:i' component={(path) => {
                        let id = path.match.params.i;
                        return (<EditGroup
                            isGrouped={this.isGrouped}
                            id={id}
                            subCategorys={this.state.subCategorys}
                            allArticles={this.state.allArticles}
                            onPublishClick={this.onEditPublishClick}
                            uploadFile={this.uploadFile}
                            postTo={this.postTo}
                        />)
                    }} />
                </div>
            </Router>
        )
    }
}

