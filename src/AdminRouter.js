
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
import LogIn from './LogIn';

//Functions

import { getHomePageState } from './frontEndFunctions';







export class AdminRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logInStatus: {
                incorrectCounter: 0,
                message: "Welcome Lee 👋 "
            },
            isLogedIn: false,
            homePageState: {},
            newSubCategory: false,
            subCategorys: [],
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
                category: "Chose a Category",
                subCategorys: [],
                date: undefined,
                showAtHomePage: true,
                summery: undefined,
                isHidden: true,
                editorState: undefined,
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
                isInProccese: false,
                isHidden: true,
                editorState: undefined,
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
            summery: undefined,
            isHidden: true,
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
            isInProccese: false,
            isHidden: true,
        }

        // STUFF THAT I DIDNT WANT TO MAKE MY APP RERENDER

        this.newArticleSubCategorys = [];

        this.oldNewArticleChosenCategory = "Chose a Category";

        this.oldNewArticleShowAtHomePage = true;

        this.oldNewArticleSummery = '';




        this.newGroupSubCategorys = [];

        this.newArticleBody = '';
        this.oldNewArticleBody = '';

        this.newGroupBody = '';
        this.oldNewGroupBody = '';

        this.myPath = undefined;

        this.isLocationAtNewArticle = false; // used for shouldComponentUpdat
        this.newArticleHeroObjectTracker = {
            oldLength: 0,
            currntLength: 0
        };

        this.isLocationAtNewGroup = false; // used for shouldComponentUpdat\
        this.newGroupHeroObjectTracker = {
            oldLength: 0,
            currntLength: 0
        };

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
        // this.deepCatagoryGroupRemove = this.deepCatagoryGroupRemove.bind(this); // might be removed 
        this.arrayToRender = this.arrayToRender.bind(this);
        this.removeHomeSingleArticle = this.removeHomeSingleArticle.bind(this);
        this.editSingleArticle = this.editSingleArticle.bind(this);
        this.editGroup = this.editGroup.bind(this);
        this.stopGroupProccese = this.stopGroupProccese.bind(this);
        this.stopNewCategory = this.stopNewCategory.bind(this)


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
        this.saveToInProcess = this.saveToInProcess.bind(this);


        //New Group
        this.newGroupArrayToRender = this.newGroupArrayToRender.bind(this);
        this.groupSingleArticle = this.groupSingleArticle.bind(this);
        this.isGrouped = this.isGrouped.bind(this);
        // this.removeGroup = this.removeGroup.bind(this);  
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
        this.saveGroupToInProcess = this.saveGroupToInProcess.bind(this);


        //Edit Article
        this.onEditPublishClick = this.onEditPublishClick.bind(this);
        this.updateArticlesInProcess = this.updateArticlesInProcess.bind(this);


        // Edit Group
        this.onEditGroupPublishClick = this.onEditGroupPublishClick.bind(this);
        this.saveHiddenGroup = this.saveHiddenGroup.bind(this);


        // Log In 
        this.onLogInClick = this.onLogInClick.bind(this);


        this.myPathTo = this.myPathTo.bind(this);
        this.updateDbState = this.updateDbState.bind(this);
        this.deleteTo = this.deleteTo.bind(this);
        this.getArticleByID = this.getArticleByID.bind(this);
        this.setNewArticleLocation = this.setNewArticleLocation.bind(this);
        this.setNewGrouopLocation = this.setNewGrouopLocation.bind(this);

        // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }


    setNewGrouopLocation(bool) {
        this.isLocationAtNewGroup = bool;
    }


    setNewArticleLocation(bool) {
        this.isLocationAtNewArticle = bool
    }

    saveHiddenGroup(article, articleIndex) {
        if ((article && articleIndex) || (article && (articleIndex === 0))) {
            article.isHidden = true;
            let homePageState = { ...this.state.homePageState };
            homePageState.groups[articleIndex].name = article.name;
            homePageState.groups[articleIndex].isHidden = true;
            this.postTo(`EditGroup/${article._id}`, { article: article, index: articleIndex })
            this.myPath = '/';
            this.setState({
                homePageState: homePageState
            })
        }
    }


    updateArticlesInProcess(article, index) {
        if ((article && index) || (article && index === 0)) {
            let newHomePageState = { ...this.state.homePageState };
            article.isHidden = true;
            newHomePageState.articles[index].name = article.name
            newHomePageState.articles[index].isHidden = true;
            this.postTo(`EditArticle/${index}`, { article: article, index: index });
            this.myPath = '/';
            this.setState({
                homePageState: newHomePageState,
            })
        }
    }



    saveGroupToInProcess(articleObject) {
        let newState = { ...this.state }
        let newHomePageState = { ...newState.homePageState }
        let _id;

        if (articleObject.heroObjects) {
            articleObject.isHidden = true;
            _id = this.postTo("NewGroup", articleObject);
        } else {
            let newGroup = { ...this.state.newGroup }
            newGroup.subCategorys = [...this.newGroupSubCategorys];
            newGroup.articleBody = this.newGroupBody;
            newGroup.isHidden = true;
            console.log(newGroup);
            _id = this.postTo("NewGroup", newGroup);
        }
        newHomePageState.groups.push(
            {
                name: newState.newGroup.name,
                index: newState.homePageState.groups.length,
                isHidden: true,
                _id: _id
            }
        )
        this.setState({
            homePageState: newHomePageState,
            groups: newState.groups,
        }, () => { console.log(this.state) })

        this.myPath = '/';
        this.resetNewGroupState();
        this.forceUpdate();
    }



    saveToInProcess(articleObject) {
        let newHomePageState = { ...this.state.homePageState }
        if (articleObject.heroObjects) {
            this.postTo("NewArticle", articleObject);
            newHomePageState.articles.push(
                articleObject
            )
        } else {
            let newArticle = { ...this.state.newArticle }
            console.log(newArticle)
            this.postTo("NewArticle", newArticle);
            newHomePageState.articles.push(
                newArticle
            )
        }
        this.setState({
            homePageState: newHomePageState,
        })
        this.myPath = '/';
        this.resetNewArticleState()
        this.forceUpdate();
    }


    stopNewCategory() {
        if (!document.getElementById('newCategoryInput').value) {
            this.setState({
                newSubCategory: false
            })
        }
    }


    stopGroupProccese() {
        if (!document.getElementById('groupNameInput').value) {
            let newGroup = { ...this.state.newGroup };
            newGroup.isInProccese = false;
            this.setState({
                newGroup: newGroup
            })
        }
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


    // Log In 


    async onLogInClick() {
        let pass = document.getElementById('logInPasswordInput').value;
        let res = await axios.post(`http://localhost:8080/login`, { username: 'RoeeEidan', password: `${pass}` });
        if (res.data) {
            this.setState({
                isLogedIn: true,
            })
        } else {
            let massageStatus = { ...this.state.logInStatus };
            if (massageStatus.incorrectCounter) {
                console.log(massageStatus.incorrectCounter)
                massageStatus.message += "!"
            } else {
                massageStatus.message = "Incorrect Password 😬 ";
            }
            massageStatus.incorrectCounter++;
            this.setState({
                logInStatus: massageStatus
            })
        }
    }


    // EDIT ARTICLE FUNCTIONS


    onEditPublishClick(articleIndex, article) {
        article.isHidden = false;
        this.postTo(`EditArticle/${article._id}`, { article: article, index: articleIndex })
        console.log(articleIndex, article);
        let homePageState = { ...this.state.homePageState };
        homePageState.articles[articleIndex].name = article.name;
        homePageState.articles[articleIndex].isHidden = false;
        this.myPath = '/';
        this.setState({
            homePageState: homePageState
        })
    }

    // EDIT GROUP FUNCTIONs

    onEditGroupPublishClick(articleIndex, article) { // article = group object
        article.isHidden = false;
        this.postTo(`EditGroup/${article._id}`, { article: article, index: articleIndex })
        console.log(articleIndex, article);
        let homePageState = { ...this.state.homePageState };
        homePageState.groups[articleIndex].name = article.name;
        homePageState.groups[articleIndex].isHidden = false;
        this.myPath = '/';
        this.setState({
            homePageState: homePageState
        })
    }


    // NEW GROUP FUNCTIONS


    groupAddSubCategory(index) {
        
        let thisSubCategory = this.state.homePageState.subCategorys[index];
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
        console.log('NewGroupToRender', articles)
        let listToRender = [];
        for (let i = 0; i < articles.length; i++) {
            let isChecked = false;
            for (let z = 0; z < articles[i].articleGroups.length; z++) {
                if ( articles[i].articleGroups[z] === this.state.newGroup.name) {
                    isChecked = true;
                }
            }
            listToRender.push(
                <GroupHomeArticle
                    isChecked={isChecked}
                    name={articles[i].name}
                    isGrouped={this.isGrouped}
                    index={i}
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
        console.log('running');
        const val = document.getElementById("homePageCheckbox").checked;
        let newState = { ...this.state };
        switch (val) {
            case false:
                newState.newGroup.showAtHomePage = false;
                this.setState({
                    newGroup: newState.newGroup
                }, () => { console.log(this.state.newGroup) })
                break;
            case true:
                newState.newGroup.showAtHomePage = true;
                this.setState({
                    newGroup: newState.newGroup
                }, () => { console.log(this.state.newGroup) })
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
        this.oldNewGroupBody = '';
        this.newGroupSubCategorys = [];
    }


    onNewGroupPublishClick() { // ON CLICK OF PUBLISH BUTTON
        console.log("old state ", this.state)
        let nowDate = new Date();
        let date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
        let newState = { ...this.state };

        newState.newGroup.isHidden = false;
        newState.newGroup.date = date;
        newState.newGroup.articleBody = this.newGroupBody;
        newState.newGroup.subCategorys = [...this.newGroupSubCategorys];


        // might be moved 
        newState.groups.push(newState.newGroup);
        newState.groups = [...this.state.groups];
        console.log("new state", newState);

        let _id = this.postTo('NewGroup', newState.newGroup); // Donst really work 

        newState.homePageState.groups.push(
            {
                name: newState.newGroup.name,
                index: newState.homePageState.groups.length,
                isHidden: false,
                _id: _id
            }
        )

        this.setState({
            homePageState: newState.homePageState,
            groups: newState.groups,
        }, () => { console.log(this.state) })
        this.myPath = '/';
        this.resetNewGroupState();
        this.forceUpdate();
    }


    onNewGroupEditorStateChange(editorContent) { // ON EDITOR CHANGE
        const articleBodyString = this.editorContentToHtml(editorContent);
        console.log('articleBodyString', articleBodyString)
        this.oldNewGroupBody = this.newGroupBody;
        this.newGroupBody = articleBodyString;
        let newGroup = { ...this.state.newGroup };
        newGroup.editorState = editorContent;
        this.setState({
            newGroup: newGroup
        })
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
        newState.newGroup.title = `${text}`;
        this.setState({
            newGroup: newState.newGroup
        })
    }


    removeSingleNewGroupHero(heroIndex) { // REmoving a hero object from new article by index
        let newState = { ...this.state };
        newState.newGroup.heroObjects = [...this.state.newGroup.heroObjects];
        newState.newGroup.heroObjects.splice(heroIndex, 1)
        this.newGroupHeroObjectTracker.currntLength--
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
            this.newGroupHeroObjectTracker.currntLength++
            this.setState({
                newGroup: newState.newGroup
            }, () => { console.log("STATTEEEE", this.state) })
            // this.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }

    }


    // removeGroup(index, name, groupIndex) {
    //     let newState = { ...this.state };
    //     let thisAllArticles = [...this.state.allArticles];
    //     for (let i = 0; i < newState.newGroup.relatedArticles.length; i++) {
    //         if (newState.newGroup.relatedArticles[i] === this.state.allArticles[index]) {
    //             newState.newGroup.relatedArticles.splice(i, 1) // removes the article from the group
    //         }
    //     }
    //     thisAllArticles[index].articleGroups = [...this.state.allArticles[index].articleGroups];
    //     thisAllArticles[index].articleGroups.splice(groupIndex, 1); // removing from the article itself
    //     this.setState({
    //         allArticles: thisAllArticles,
    //         newGroup: newState.newGroup
    //     })
    // }


    isGrouped(index) { //NAME is group name and index is 
        let relatedArticles = this.state.newGroup.relatedArticles;
        for (let i = 0; i < relatedArticles.length; i++) {
            if (relatedArticles[i].name === this.state.homePageState.articles[index].name) {
                return ({
                    relatedArticlesIndex: i,
                    articleIndex: index
                })
            }
        }
        return false
    }

    groupSingleArticle(articleIndex) {
        let isFound = false;
        let newState = { ...this.state };
        let newHomePageState = { ...this.state.homePageState };
        let articleName = this.state.homePageState.articles[articleIndex].name
        let groupName = this.state.newGroup.name;
        for (let i = 0; i < newState.newGroup.relatedArticles.length; i++) {//this is the way to the articles  
            if (newState.newGroup.relatedArticles[i].name === articleName) {// removers the article from the group and the homePageState
                let isFound = true;
                // ungroup evrything
                for(let z = 0; z < newState.homePageState.articles[articleIndex].articleGroups.length; z++){
                    if(newState.homePageState.articles[articleIndex].articleGroups[z] === groupName){
                        newState.homePageState.articles[articleIndex].articleGroups.splice(z, 1);
                    }
                }
                 // ungroup fromHomePageState 
                newState.newGroup.relatedArticles.splice(i, 1); // moves the article from the group ( no need to do is in the back end )
                this.setState({
                    newGroup: newState.newGroup,
                    homePageState: newState.homePageState
                })

                return 'article removed'
            }
        }
        if (!isFound) {
            // Group it all!!
            let newHomePageState = { ...this.state.homePageState };
            newHomePageState.articles[articleIndex].articleGroups.push(groupName); // pushs the group in to the article (only at the front end)
            newState.newGroup.relatedArticles.push(newHomePageState.articles[articleIndex]) // pushs the article to the group (will be sent to the backend when the group is published)
            this.setState({
                newGroup: newState.newGroup,
                homePageState: newState.homePageState
            })
            return " Article added"
        }
    }


    // HOME PAGE FUNCTIONS


    editGroup(index) {
        this.myPath = `editGroup/${index}`;
        this.forceUpdate();
        // this.myPath = '/'
    }


    editSingleArticle(index) {
        this.myPath = `editArticle/${index}`;
        this.forceUpdate();
        // this.myPathTo();
    }


    addCategory() {
        let newCategory = document.getElementById("newCategoryInput").value;
        this.postTo('NewCategory', { category: newCategory });
        let newHomePageState = { ...this.state.homePageState };
        newHomePageState.subCategorys.push(newCategory);
        this.setState({
            homePageState: newHomePageState,
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
        let newHomePageState = { ...this.state.homePageState }
        newHomePageState.subCategorys.splice(index, 1);
        this.setState({
            homePageState: newHomePageState,
        })
    }


    removeHomeSingleArticle(i) {
        console.log(this.state);
        let newHomePageState = { ...this.state.homePageState };
        newHomePageState.articles.splice(i, 1);
        this.setState({
            homePageState: newHomePageState
        }, () => {
            console.log(this.state)
        })
    }





    arrayToRender(articles) {
        let listToRender = [];
        // 
        let hiddenListToRender = [];
        for (let i = 0; i < articles.length; i++) {
            let _id = articles[i]._id;
            if (articles[i].isHidden) {
                hiddenListToRender.push(
                    <SingleHomeArticle
                        editSingleArticle={this.editSingleArticle}
                        name={articles[i].name}
                        removeSingleArticle={() => {
                            if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                this.removeHomeSingleArticle(i);
                                this.postTo(`DeleteArticle/${_id}`)
                            }
                        }}
                        index={i}
                    />
                )
            }
            else {
                listToRender.push(
                    <SingleHomeArticle
                        editSingleArticle={this.editSingleArticle}
                        name={articles[i].name}
                        removeSingleArticle={() => {
                            if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                this.removeHomeSingleArticle(i);
                                this.postTo(`DeleteArticle/${_id}`)
                            }
                        }}
                        index={i}
                    />
                )
            }
        }
        return ({
            showenList: <div className="articleListBoxToRender articleListToRender flex-container flex-item">
                {listToRender}
            </div>,
            hiddenList: <div className="articleListBoxToRender flex-container">
                <div className="articleListToRender flex-item flex-container">
                    {hiddenListToRender}
                </div>
            </div>

        })

    }


    // might be removed


    deepRemoveGroup(i) {
        let groupName = this.state.homePageState.groups[i].name;
        console.log("Group OBJECT ", this.state.homePageState.groups[i])
        this.postTo(`DeleteGroup/${this.state.homePageState.groups[i]._id}`, { name: groupName })
        let newHomePageState = { ...this.state.homePageState };
        newHomePageState.groups.splice(i, 1);
        this.setState({
            homePageState: newHomePageState,
        })
        // this.deepCatagoryGroupRemove(groupName, newHomePageState);
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
        let newHomePageState = { ...this.state.homePageState };
        newHomePageState.heroObjects.splice(heroIndex, 1)
        this.setState({
            homePageState: newHomePageState
        })
    }


    async  onHomeUploadFilesFormSubmit() {
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
            await this.uploadFile(file);
            this.postTo('NewHero', heroObject);
            let newHomePageState = { ...this.state.homePageState };
            newHomePageState.heroObjects.push(heroObject);
            this.setState({
                homePageState: newHomePageState
            })
            document.getElementById('root').click();
        } else {
            alert('you forgot somthing')
        }

    }



    async uploadFile(file) {
        let form = new FormData();
        form.append(`image`, file);
        let res = await axios.post('http://localhost:8080/uploads', form);
        return res.data
    }


    postTo(path, object) {// POST FUNC THAT TAKES PATH AND OBJECT 
        axios.post(`http://localhost:8080/${path}`, object)
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // NEW ARTICLE FUNCTIONS


    addSubCategory(categoryIndex) {
        let thisSubCategory = this.state.homePageState.subCategorys[categoryIndex];
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
        // document.getElementById("uploadFilesForm").reset();
        // document.getElementById("titleInput").value = "";
        // document.getElementById("summeryInput").value = "";
        // document.getElementById("homePageCheckbox").checked = true;
        // document.getElementById("categoryOptions").value = "Chose a Catagory";
        this.newArticleBody = '';
        this.oldNewArticleBody = '';
        this.newArticleSubCategorys = [];
        let newState = { ...this.state }
        newState.newArticle = { ...this.defaultNewArticleState };
        newState.newArticle.heroObjects = [];
        newState.newArticle.articleGroups = [];
        this.myPath = '/';
        this.setState({
            newArticle: newState.newArticle
        })

    }


    onSummeryChange(e) {
        console.log(e)
        const text = document.getElementById("summeryInput").value;
        console.log(text);
        let newState = { ...this.state };
        this.oldNewArticleSummery = newState.newArticle.summery;
        newState.newArticle.summery = `${text}`;
        this.setState({
            newArticle: newState.newArticle
        })
    }



    removeSingleHero(heroIndex) { // REmoving a hero object from new article by index
        let newState = { ...this.state };
        newState.newArticle.heroObjects = [...this.state.newArticle.heroObjects]
        newState.newArticle.heroObjects.splice(heroIndex, 1)
        this.newArticleHeroObjectTracker.currntLength--
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
            this.newArticleHeroObjectTracker.currntLength++;
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


    onHomePageChange(event) {
        const val = event.currentTarget.checked;
        console.log(val);
        let newState = { ...this.state };
        this.oldNewArticleShowAtHomePage = this.state.newArticle.showAtHomePage;
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


    onCategoryChange(event) {

        const category = event.currentTarget.value;
        console.log(category)
        let newState = { ...this.state };
        this.oldNewArticleChosenCategory = newState.newArticle.category;
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

        newState.newArticle.date = date;
        newState.newArticle.isHidden = false;
        newState.newArticle.articleBody = this.newArticleBody;
        newState.newArticle.subCategorys = [...this.newArticleSubCategorys];

        // // might be moved
        // newState.allArticles.push(newState.newArticle);
        // newState.allArticles = [...this.state.allArticles]


        console.log("newState.homePageState.articles", newState.homePageState.articles)
        this.postTo('NewArticle', newState.newArticle);
        newState.homePageState.articles.push(
            {
                category: newState.newArticle.category,
                name: newState.newArticle.name,
                isHidden: newState.newArticle.isHidden,
                showAtHomePage: newState.newArticle.showAtHomePage,
                articleGroups: newState.newArticle.articleGroups,
                index: newState.homePageState.articles.length // needs to be removed
            }
        )
        console.log('Router', { Router })
        this.setState({
            homePageState: newState.homePageState,
            // allArticles: newState.allArticles,
        }, () => { this.resetNewArticleState() })
        this.myPath = "/";
        this.forceUpdate();

    }


    onTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.newArticle.name = `${text}`;
        newState.newArticle.title = `${text}`;
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
        const articleBodyString = this.editorContentToHtml(editorContent);
        let newState = { ...this.state };
        this.oldNewArticleBody = this.newArticleBody;
        this.newArticleBody = articleBodyString;
        newState.newArticle.editorState = editorContent;
        this.setState({
            newArticle: newState.newArticle,
        })

    };


    async componentDidMount() {
        if (!this.state.homePageState.articles) {
            const homePageState = await getHomePageState();
            this.setState({
                homePageState: homePageState,
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.isLocationAtNewArticle) {
            if (this.newArticleHeroObjectTracker.currntLength !== this.newArticleHeroObjectTracker.oldLength ||
                this.newArticleBody !== this.oldNewArticleBody ||
                this.oldNewArticleChosenCategory !== this.state.newArticle.category ||
                this.oldNewArticleShowAtHomePage !== this.state.newArticle.showAtHomePage
            ) {
                return true
            } else {
                return false
            }

        } else if (this.isLocationAtNewGroup) {
            if (this.newGroupHeroObjectTracker.currntLength !== this.newGroupHeroObjectTracker.oldLength ||
                this.newGroupBody.length !== this.oldNewGroupBody.length
            ) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    componentDidUpdate() {
        if (this.isLocationAtNewArticle) {
            if (this.newArticleHeroObjectTracker.currntLength !== this.newArticleHeroObjectTracker.oldLength) {
                this.newArticleHeroObjectTracker.oldLength = this.newArticleHeroObjectTracker.currntLength;
            }
            // document.getElementById("titleInput").value = this.state.newArticle.title;
            // document.getElementById("summeryInput").value = this.state.newArticle.summery;
            // document.getElementById("homePageCheckbox").value = this.state.newArticle.showAtHomePage;
            // document.getElementById("categoryOptions").value = this.state.newArticle.category;
            // for (let i = 0; i < this.newArticleSubCategorys.length; i++) {
            //     let ID = this.newArticleSubCategorys[i];
            //     console.log(document.getElementById(ID).checked)
            //     document.getElementById(ID).checked = true;
            // }
        }
        if (this.isLocationAtNewGroup && (this.newGroupHeroObjectTracker.currntLength !== this.newGroupHeroObjectTracker.oldLength)) {
            this.newGroupHeroObjectTracker.oldLength = this.newGroupHeroObjectTracker.currntLength;
            // document.getElementById("titleInput").value = this.state.newGroup.title;
            // document.getElementById("summeryInput").value = this.state.newGroup.summery;
            // document.getElementById("homePageCheckbox").checked = this.state.newGroup.showAtHomePage;
            // for (let i = 0; i < this.newGroupSubCategorys.length; i++) {
            //     let ID = this.newGroupSubCategorys[i];
            //     document.getElementById(ID).checked = true;
            // }
        }
    }

    render() {
        /*if (!this.state.isLogedIn) {
            return (
                <LogIn
                    onLogInClick={this.onLogInClick}
                    logInMassage={this.state.logInStatus.message}
                    counter={this.state.logInStatus.incorrectCounter}
                />
            )
        }*/

        return (
            <Router>
                <div>
                    {/*<NavBar />*/}

                    <Route exact path="/" render={(props) => {
                        return (
                            <HomeAdmin
                                editSingleArticle={this.editSingleArticle}
                                removeHomeSingleArticle={this.removeHomeSingleArticle}
                                postTo={this.postTo}
                                match={props.match}
                                stopNewCategory={this.stopNewCategory}
                                stopGroupProccese={this.stopGroupProccese}
                                homePageState={this.state.homePageState}
                                editGroup={this.editGroup}
                                /*updateDbState={this.updateDbState}   probobly gonna be removed // this updates the entire state i think*/
                                addCategory={this.addCategory}
                                newSubCategoryButton={this.newSubCategoryButton}
                                newSubCategory={this.state.newSubCategory}
                                removeSubCategory={this.removeSubCategory}
                                pathTo={this.myPathTo}
                                path={this.myPath}
                                startNewGroup={this.newGroupOnClick}
                                isInProccese={this.state.newGroup.isInProccese}
                                creatNewGroup={this.creatNewGroup}
                                arrayToRender={this.arrayToRender}
                                onUploadFilesFormSubmit={this.onHomeUploadFilesFormSubmit}
                                removeSingleHero={this.removeHomeSingleHero}
                                removeSingleArticle={this.removeHomeSingleArticle}
                                removeGroup={this.deepRemoveGroup}
                            />
                        )
                    }} >
                    </Route>
                    <Route path="/newarticle" component={(props) => (
                        <App
                            /*showAtHomePage={this.state.newArticle.showAtHomePage} // might be removed??? */
                            /*titleValue = {this.state.newArticle.name} // this is here for the shouldComponentUpdate*/
                            category={this.state.newArticle.category}
                            /*subCategorys={this.state.newArticle.subCategorys}*/
                            ourSubCategorys={this.newArticleSubCategorys}
                            showAtHomePage={this.state.newArticle.showAtHomePage}
                            setLocation={this.setNewArticleLocation}
                            saveToInProcess={this.saveToInProcess}
                            addSubCategory={this.addSubCategory}
                            subCategorys={this.state.homePageState.subCategorys}
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
                            onHomePageChange={this.onHomePageChange}
                            onSummeryChange={this.onSummeryChange}
                            editor={<Editor
                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                editorState={this.state.newArticle.editorState}
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{ image: { uploadCallback: this.uploadImage } }}
                            />}
                        />)} />

                    <Route path="/newgroup" component={() => (
                        <NewGroup
                            checkedSubCategorys={this.newGroupSubCategorys}
                            setLocation={this.setNewGrouopLocation}
                            saveGroupToInProcess={this.saveGroupToInProcess}
                            showAtHomePage={this.state.newGroup.showAtHomePage}
                            groupAddSubCategory={this.groupAddSubCategory}
                            subCategorys={this.state.homePageState.subCategorys}
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
                            articles={this.state.homePageState.articles}
                            editor={<Editor
                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                editorState={this.state.newGroup.editorState}
                                onBlur={(e) => { console.log(e) }}
                                onEditorStateChange={this.onNewGroupEditorStateChange}
                                toolbar={{ image: { uploadCallback: this.uploadImage } }}
                            />}
                            onPublishClick={this.onNewGroupPublishClick}
                            onHomePageChange={this.onNewGroupHomePageChange}
                            removeSingleHero={this.removeSingleNewGroupHero}
                        />
                    )} />
                    <Route path='/editArticle/:i' component={(path) => {
                        if (this.myPath === '/') {
                            this.myPathTo();
                            return (<Redirect to='/' />)
                        }
                        let id = path.match.params.i;
                        return (
                            <EditArticle
                                updateArticlesInProcess={this.updateArticlesInProcess}
                                id={id}
                                subCategorys={this.state.homePageState.subCategorys}
                                onPublishClick={this.onEditPublishClick}
                                uploadFile={this.uploadFile}
                            />
                        )
                    }} />
                    <Route path='/EditGroup/:i' component={(path) => {
                        if (this.myPath === '/') {
                            this.myPathTo();
                            return (<Redirect to='/' />)
                        }
                        let id = path.match.params.i;
                        return (<EditGroup
                            articles={this.state.homePageState.articles}
                            isGrouped={this.isGrouped}
                            id={id}
                            subCategorys={this.state.homePageState.subCategorys}
                            /*allArticles={this.state.allArticles}*/
                            onPublishClick={this.onEditGroupPublishClick}
                            uploadFile={this.uploadFile}
                            postTo={this.postTo}
                            saveHiddenGroup={this.saveHiddenGroup}
                        />)
                    }} />
                </div>
            </Router>
        )
    }
}

