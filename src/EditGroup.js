import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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


    }


    removeGroup(index, name) {
        let newState = { ...this.state };
        for (let i = 0; i < newState.group.relatedArticles.length; i++) {
            if (newState.group.relatedArticles[i] === this.props.allArticles[index]) {
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
        let isGrouped = this.props.isGrouped(index , this.state.group.name); //returns either false or the index of the group
        if (isGrouped || isGrouped === 0) {
            this.removeGroup(index, newState.group.name); // removes the group from the article
            for (let i = 0; i < newState.group.relatedArticles.length; i++) {//this is the way to the articles  
                if (newState.group.relatedArticles[i].name === articleName) {// removers the article from the group
                    newState.group.relatedArticles.splice(i, 1);
                }
            }
        } else {
            let thisArticle = this.props.allArticles[index];
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
        newGroup.heroObjects = [... this.state.group.heroObjects];
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
                    let title = that.state.group.title.slice(4, (that.state.group.title.length - 5));
                    document.getElementById("homePageCheckbox").checked = that.state.group.showAtHomePage;
                    document.getElementById("titleInput").value = title;
                    document.getElementById("summeryInput").value = that.state.group.summery;
                    // document.getElementById("categoryOptions").value = that.state.group.category;

                    let ourSubCategorys = that.state.group.subCategorys;
                    for (let i = 0; i < ourSubCategorys.length; i++) {
                        console.log('checkingggg')
                        document.getElementById(`${ourSubCategorys[i]}`).checked = true
                    }
                    that.setState({
                        editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(that.state.group.articleBody).contentBlocks))
                    }, () => {
                        console.log('editorState Changedd', that.state)
                    })
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        if (this.props.path === '/') {
            this.props.pathTo();
            return (<Redirect to='/' />)
        }


        let articlesButtonRender = [];
        for (let i = 0; i < this.props.allArticles.length; i++) {
            articlesButtonRender.push(
                <SingleGroupArticle
                    /*article = {this.props.allArticles[i]}*/
                    groupName={this.state.group.name}
                    relatedArticles={this.state.group.relatedArticles}
                    Index={i}
                    articleName={this.props.allArticles[i].name}
                    groupSingleArticle={this.groupSingleArticle}
                />
            )
        }


        let subCategorysRender = [];
        console.log(this.props.subCategorys);
        let ourSubCategorys = this.props.subCategorys
        for (let i = 0; i < ourSubCategorys.length; i++) {
            subCategorysRender.push(
                <div>
                    {ourSubCategorys[i]}
                    <input type="checkbox" id={`${ourSubCategorys[i]}`} onChange={() => { this.addSubCategory(i) }} />
                </div>
            );
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
                <h1>{this.state.group.name}</h1>
                <div>
                    <p className="  ">All Articles</p>
                    {articlesButtonRender}
                </div>
                <div className="uploadFiles">
                    <form id='uploadFilesForm'>
                        <input
                            id='uploadFilesFile'
                            type="file"
                            accept="image/video"
                        />
                        <p>
                            image / video title: <input type='text' id='uploadFilesTitle' />
                        </p>
                        <p>
                            credit: <input type='text' id='uploadFilesCredit' />
                        </p>
                        <p>
                            <input type="button" value="Submit" onClick={this.onUploadHeroForm} />
                        </p>
                    </form>
                </div>
                <div className="listOfHeros">
                    List of Files
          {filesList}
                </div>
                <div className="titlebox">
                    <h2>title</h2>
                    <input
                        id='titleInput'
                        type='text'
                        onChange={this.onTitleChange}
                    />
                </div>
                <div className="summerybox">
                    <h2>Summery</h2>
                    <input
                        id='summeryInput'
                        type='text'
                        onChange={this.onSummeryChange}
                    />
                </div>
                <div className="showAtHomePageBox">
                    <h4>show at home page:</h4>
                    <input
                        id='homePageCheckbox'
                        type="checkbox"
                        className="homePageCheckbox"
                        onChange={this.onHomePageChange}
                    />
                </div>
                {/*<div className="categoryBox">
                    <h3>Category</h3>
                    <select id='categoryOptions' onChange={this.onCategoryChange}>
                        <option>Chose a Category</option>
                        <option value="Science">Science</option>
                        <option value="Health">Health</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>*/}
                <div>
                    <h4>Sub Categorys</h4>
                    {subCategorysRender}
                </div>
                <div className="groupBodyBox" >
                    <h2>artical Body</h2>
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <div className="publish">
                    <button onClick={() => { console.log(this.state.group)/* this.props.onPublishClick(this.props.id, this.state.group) */ }}>
                        publish
                    </button>
                </div>
            </div>
        );
    }
}

export default EditGroup;

