import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';



import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

//COMPONENTS

import SingleFile from './Singlefile';
import SingleGroupArticle from './EditGroupHomeArticle'



class EditGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            group: {
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
            },
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.addSubCategory = this.addSubCategory.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.removeSingleHero = this.removeSingleHero.bind(this);
        this.onSummeryChange = this.onSummeryChange.bind(this);
        this.onHomePageChange = this.onHomePageChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.editorContentToHtml = this.editorContentToHtml.bind(this);
        this.onUploadHeroForm = this.onUploadHeroForm.bind(this);
        this.groupSingleArticle = this.groupSingleArticle.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.isGrouped = this.isGrouped.bind(this);


    }


    isGrouped(index) { //NAME is group name and index is 
        let relatedArticles = this.state.group.relatedArticles;
        for (let i = 0; i < relatedArticles.length; i++) {
            if (relatedArticles[i].name === this.props.articles[index].name) {
                return ({
                    relatedArticlesIndex: i,
                    articleIndex: index
                })
            }
        }
        return false
    }


    removeGroup(index, name) {
        let newState = { ...this.state };
        for (let i = 0; i < newState.group.relatedArticles.length; i++) {
            if (newState.group.relatedArticles[i] === this.props.articles[index]) {
                newState.group.relatedArticles.splice(i, 1) // removes the article from the group
            }
        }
        this.props.postTo('RemoveGroupFromArticle', { groupIndex: this.props.id, articleIndex: index })
        this.setState({
            group: newState.group
        })
    }


    groupSingleArticle(index, articleName) {
        let newState = { ...this.state };
        newState.group.relatedArticles = [...this.state.group.relatedArticles];
        let isGrouped = this.isGrouped(index, this.state.group.name); //returns either false or the index of the group
        if (isGrouped) {
            this.removeGroup(index, newState.group.name); // removes the group from the article
            for (let i = 0; i < newState.group.relatedArticles.length; i++) {//this is the way to the articles  
                if (newState.group.relatedArticles[i].name === articleName) {// removers the article from the group
                    newState.group.relatedArticles.splice(i, 1);
                }
            }
        } else {
            let thisArticle = this.props.articles[index];
            this.props.postTo('AddGroupToArticle', { groupIndex: this.props.id, articleIndex: index })
            newState.group.relatedArticles.push(thisArticle); // pushs the article to the group related array
        }
        this.setState({
            group: newState.group,
        })
        console.log(this.state);
    }


    onUploadHeroForm() {
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
            let group = { ...this.state.group };
            group.heroObjects.push(heroObject);
            this.setState({
                group: group
            })
            this.props.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }

    }


    editorContentToHtml(editorContent) {  // TO HTML STRING
        const rawContentState = convertToRaw(editorContent.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        return markup;
    };


    onCategoryChange() {
        const category = document.getElementById("categoryOptions").value;
        let newGroup = { ...this.state.group };
        newGroup.category = category;
        this.setState({
            group: newGroup
        }, () => { console.log(this.state) })
    }


    onHomePageChange() {
        const val = document.getElementById("homePageCheckbox").checked;
        let newGroup = { ...this.state.group };
        switch (val) {
            case false:
                newGroup.showAtHomePage = false;
                this.setState({
                    group: newGroup
                }, () => { console.log(this.state) })
                break;
            case true:
                newGroup.showAtHomePage = true;
                this.setState({
                    group: newGroup
                }, () => { console.log(this.state) })
                break;
            default: alert("this shouldnt happen")
        }
    }


    onSummeryChange() {
        const text = document.getElementById("summeryInput").value;
        let newGroup = { ...this.state.group };
        newGroup.summery = `${text}`;
        this.setState({
            group: newGroup
        }, () => { console.log(this.state) })
    }


    removeSingleHero(i) {
        let newGroup = { ...this.state.group };
        newGroup.heroObjects = [...this.state.group.heroObjects];
        newGroup.heroObjects.splice(i, 1);
        this.setState({
            group: newGroup
        }, console.log(this.state))
    }


    onTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.group.name = `${text}`;
        newState.group.title = `<h1>${text}</h1>`;
        this.setState({
            group: newState.group
        }, () => { console.log(this.state) })
    }


    addSubCategory(categoryIndex) {
        let newGroup = { ...this.state.group }
        newGroup.subCategorys = [...this.state.group.subCategorys];
        let thisSubCategory = this.props.subCategorys[categoryIndex];
        let notFound = true;
        for (let i = 0; i < newGroup.subCategorys.length; i++) {
            if (newGroup.subCategorys[i] === thisSubCategory) {
                notFound = false;
                newGroup.subCategorys.splice(i, 1);
            }
        } if (notFound) {
            newGroup.subCategorys.push(thisSubCategory);
        } this.setState({
            group: newGroup
        }, () => { console.log(this.state) })
    }


    onEditorStateChange = (editorState) => {
        let markup = this.editorContentToHtml(editorState);
        let newGroup = { ...this.state.group };
        newGroup.articleBody = markup;
        this.setState({
            editorState: editorState,
            group: newGroup
        })
    }


    componentWillMount() {
        let that = this;
        axios.get(`http://localhost:8080/GetGroup/${this.props.id}`)
            .then(function (response) {
                that.setState({
                    group: response.data
                }, () => {
                    let title = '';
                    if (that.state.group.title) {
                        title = that.state.group.title.slice(4, (that.state.group.title.length - 5));
                    }
                    document.getElementById("homePageCheckbox").checked = that.state.group.showAtHomePage;
                    document.getElementById("titleInput").value = title;
                    document.getElementById("summeryInput").value = that.state.group.summery;
                    // document.getElementById("categoryOptions").value = that.state.group.category;

                    let ourSubCategorys = that.state.group.subCategorys;
                    for (let i = 0; i < ourSubCategorys.length; i++) {
                        if (document.getElementById(`${ourSubCategorys[i]}`)) {
                            console.log('checkingggg')
                            document.getElementById(`${ourSubCategorys[i]}`).checked = true
                        }
                    }
                    if (that.state.group.articleBody) {
                        that.setState({
                            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(that.state.group.articleBody).contentBlocks))
                        }, () => {
                            console.log('editorState Changedd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', that.state)
                        })
                    }
                })

            })
            .catch(function (error) {
                console.log(error); // slice type
            });
    }


    render() {
        if (this.props.path === '/') {
            this.props.pathTo();
            return (<Redirect to='/' />)
        }


        let articlesButtonRender = [];
        let articles = this.props.articles || [];
        for (let i = 0; i < articles.length; i++) {
            articlesButtonRender.push(
                <SingleGroupArticle  // loops through the related articles and checks for the articleName
                    /*article = {this.props.allArticles[i]}*/
                    groupName={this.state.group.name}
                    relatedArticles={this.state.group.relatedArticles}
                    Index={i}
                    articleName={this.props.articles[i].name}
                    groupSingleArticle={this.groupSingleArticle}
                />
            )
        }



        let subCategorysRender1 = [];
        let subCategorysRender2 = [];
        let subCategorysRender3 = [];
        let ourSubCategorys = this.props.subCategorys || [];
        for (let i = 0; i < ourSubCategorys.length; i++) {
            if (i < (ourSubCategorys.length / 3)) {
                subCategorysRender1.push(
                    <div className="singleSubCategoryDiv flex-item">
                        {ourSubCategorys[i]}
                        <input id={`${ourSubCategorys[i]}`} type="checkbox" onChange={() => { this.addSubCategory(i) }} />
                    </div>
                );
            } else if (i >= (ourSubCategorys.length / 3) && i < ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender2.push(
                    <div className="singleSubCategoryDiv flex-item">
                        {ourSubCategorys[i]}
                        <input id={`${ourSubCategorys[i]}`} type="checkbox" onChange={() => { this.addSubCategory(i) }} />
                    </div>
                );
            } else if (i >= ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender3.push(
                    <div className="singleSubCategoryDiv flex-item">
                        {ourSubCategorys[i]}
                        <input id={`${ourSubCategorys[i]}`} type="checkbox" onChange={() => { this.addSubCategory(i) }} />
                    </div>
                );
            } else {
                alert("Check App.js at line 52")
            }
        }
        if (ourSubCategorys.length % 3) {
            let counter = ourSubCategorys.length;
            subCategorysRender3.push(
                <div className="singleSubCategoryDiv flex-item">
                </div>
            );
            counter--;
            if (counter) {
                subCategorysRender2.push(
                    <div className="singleSubCategoryDiv flex-item">
                    </div>
                )
            }
        }



        let heroList = this.state.group.heroObjects;
        let filesList = []
        for (let i = 0; i < heroList.length; i++) {
            filesList.push(
                <SingleFile
                    singleFileTitle={heroList[i].title}
                    singleFileCredit={heroList[i].credit}
                    singleFileName={heroList[i].name}
                    onClick={() => {
                        this.removeSingleHero(i);
                    }}
                />
            )
        }
        return (
            <div className="EditGroup" >
                <Link to="/">
                    <input type="button" value="Back Home" className="backHome" />
                </Link>
                <h1>{this.state.group.name}</h1>
                <div>
                    <p className="  ">All Articles</p>
                    {articlesButtonRender}
                </div>


                <div className="heroFilesWrapper flex-container">
                    <div className="uploadFiles flex-item">
                        <p>Upliad Files</p>
                        <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                            <input
                                className="flex-item uploadInput"
                                id='uploadFilesFile'
                                type="file"
                                accept="image/video"
                            />
                            <p>
                                Title: <textarea rows="2" type='text' id='uploadFilesTitle' className="uploadFilesTitleInput flex-item" />
                            </p>
                            <p>
                                Credit: <textarea rows="2" type='text' id='uploadFilesCredit' className="uploadFilesCreditInput flex-item" />
                            </p>
                            <p>
                                <input type="button" value="Submit" className="flex-item" onClick={this.onUploadHeroForm} />
                            </p>
                        </form>
                    </div>
                    <div className="listOfHeros">
                        <ul className='singleFileBox flex-container'>
                            <li className="singleFileName flex-item">
                                Name
              </li>
                            <li className="singleFileTitle flex-item">
                                Title
              </li>
                            <li className="singleFileCredit flex-item">
                                Credit
              </li>
                            <div className="removeSingleFile flex-item">
                            </div>
                        </ul>
                        {filesList}
                    </div>
                </div>
                <h2 className="newArticleTitle">Title</h2>
                <div className="titlebox flex-container">
                    <input
                        className="newArticleTitleInput flex-item"
                        id='titleInput'
                        type='text'
                        onChange={this.onTitleChange}
                    />
                </div>



                <div className="summeryAndCategorysDiv flex-container">
                    <div className="summerybox flex-item flex-container">
                        <h2 className="flex-item">Summery</h2>
                        <textarea
                            className="newArticleSummeryTextArea flex-item"
                            id='summeryInput'
                            type='text'
                            onChange={this.onSummeryChange}
                        />
                    </div>
                    <div className="allCategorysDiv flex-item flex-container">
                        <div className="filler flex-item">

                        </div>
                        <div className="homaPageAndCategory flex-item flex-container">
                            <div className="showAtHomePageBox flex-item">
                                <span>show at home page:</span>
                                <input
                                    id='homePageCheckbox'
                                    type="checkbox"
                                    className="homePageCheckbox"
                                    onChange={this.onHomePageChange}
                                />
                            </div>
                        </div>
                        <h4 className="newArticleSubCategorysTitle">Sub Categorys</h4>
                        <div className="newArticleSubCategorysDiv flex-item flex-container">
                            <div className="subCategorysToRender flex-item flex-container">
                                {subCategorysRender1}
                            </div>
                            <div className="subCategorysToRender flex-item flex-container">
                                {subCategorysRender2}
                            </div>
                            <div className="subCategorysToRender flex-item flex-container">
                                {subCategorysRender3}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="groupBodyBox" >
                    <h2>artical Body</h2>
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <div className="publish">
                    <button onClick={() => { this.props.onPublishClick(this.props.id, this.state.group) }}>
                        publish
                    </button>
                </div>
                <button onClick={() => {
                    let newState = { ...this.state }
                    newState.group.isHidden = true;
                    this.props.saveHiddenGroup(newState.group, this.props.id)
                }}>
                    Save
                </button>
            </div>
        );
    }
}

export default EditGroup;

