import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';

import './App.css';


import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html'; 
import { convertToRaw } from 'draft-js'; 

//COMPONENTS

import SingleFile from './Singlefile';



class EditArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            article: {
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
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.addSubCategory = this.addSubCategory.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.removeSingleHero = this.removeSingleHero.bind(this);
        this.onSummeryChange = this.onSummeryChange.bind(this);
        this.onHomePageChange = this.onHomePageChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.editorContentToHtml = this.editorContentToHtml.bind(this);
    }


    editorContentToHtml(editorContent) {  // TO HTML STRING
        const rawContentState = convertToRaw(editorContent.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        return markup;
    };


    onCategoryChange() {
        const category = document.getElementById("categoryOptions").value;
        let newArticle = { ...this.state.article };
        newArticle.category = category;
        this.setState({
            article: newArticle
        }, () => { console.log(this.state) })
    }


    onHomePageChange() {
        const val = document.getElementById("homePageCheckbox").checked;
        let newArticle = { ...this.state.article };
        switch (val) {
            case false:
                newArticle.showAtHomePage = false;
                this.setState({
                    article: newArticle
                }, () => { console.log(this.state) })
                break;
            case true:
                newArticle.showAtHomePage = true;
                this.setState({
                    article: newArticle
                }, () => { console.log(this.state) })
                break;
            default: alert("this shouldnt happen")
        }
    }


    onSummeryChange() {
        const text = document.getElementById("summeryInput").value;
        let newArticle = { ...this.state.article };
        newArticle.summery = `${text}`;
        this.setState({
            article: newArticle
        }, () => { console.log(this.state) })
    }


    removeSingleHero(i) {
        let newArticle = { ...this.state.article };
        newArticle.heroObjects = [... this.state.article.heroObjects];
        newArticle.heroObjects.splice(i, 1);
        this.setState({
            article: newArticle
        }, console.log(this.state))
    }


    onTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.article.name = `${text}`;
        newState.article.title = `<h1>${text}</h1>`;
        this.setState({
            article: newState.article
        }, () => { console.log(this.state) })
    }


    addSubCategory(categoryIndex) {
        let newArticle = { ...this.state.article }
        newArticle.subCategorys = [...this.state.article.subCategorys];
        let thisSubCategory = this.props.subCategorys[categoryIndex];
        let notFound = true;
        for (let i = 0; i < newArticle.subCategorys.length; i++) {
            if (newArticle.subCategorys[i] === thisSubCategory) {
                notFound = false;
                newArticle.subCategorys.splice(i, 1);
            }
        } if (notFound) {
            newArticle.subCategorys.push(thisSubCategory);
        } this.setState({
            article: newArticle
        }, () => { console.log(this.state) })
    }


    onEditorStateChange = (editorState) => {
        let markup = this.editorContentToHtml(editorState);
        let newArticle = {...this.state.article};
        newArticle.articleBody = markup;
        this.setState({
            editorState: editorState,
            article: newArticle
        })
    }


    componentWillMount() {
        let that = this;
        axios.get(`http://localhost:8080/GetArticle/${this.props.id}`)
            .then(function (response) {
                that.setState({
                    article: response.data
                }, () => {
                    document.getElementById("homePageCheckbox").checked = that.state.article.showAtHomePage;
                    document.getElementById("titleInput").value = that.state.article.name;
                    document.getElementById("summeryInput").value = that.state.article.summery;
                    document.getElementById("categoryOptions").value = that.state.article.category;

                    let ourSubCategorys = that.state.article.subCategorys;
                    for (let i = 0; i < ourSubCategorys.length; i++) {
                        console.log('checkingggg')
                        document.getElementById(`${ourSubCategorys[i]}`).checked = true
                    }
                    that.setState({
                        editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(that.state.article.articleBody).contentBlocks))
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


        let heroList = this.state.article.heroObjects;
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
            <div className="EditArticle" >

                <h1>{this.state.article.name}</h1>
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
                            <input type="button" value="Submit" onClick={this.props.onUploadFilesFormSubmit} />
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
                        value={this.state.article.name}
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
                <div className="categoryBox">
                    <h3>Category</h3>
                    <select id='categoryOptions' onChange={this.onCategoryChange}>
                        <option>Chose a Category</option>
                        <option value="Science">Science</option>
                        <option value="Health">Health</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>
                <div>
                    <h4>Sub Categorys</h4>
                    {subCategorysRender}
                </div>
                <div className="articleBodyBox" >
                    <h2>artical Body</h2>
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <div className="publish">
                    <button onClick={() => { this.props.onPublishClick(this.props.id, this.state.article) }}>
                        publish
                    </button>
                </div>
            </div>
        );
    }
}

export default EditArticle;

