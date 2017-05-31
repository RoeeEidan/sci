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


// UI 

import { Button, Textfield, Checkbox, Switch, RadioGroup, Radio } from 'react-mdl';

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
                showAtHomePage: undefined,
                summery: undefined,
                isHidden: undefined
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
    }


    onUploadHeroForm() {
        let file = document.getElementById("uploadFilesFile").files[0];
        let title = document.getElementById("uploadFilesTitle").value;
        let credit = document.getElementById("uploadFilesCredit").value;
        if (file && title && credit) {
            document.getElementById("uploadFilesForm").reset();
            document.getElementById('fileLabeID').innerHTML = "No File Chosen";
            let heroObject = {
                type: file.type,
                title: title,
                credit: credit,
                url: `https://s3.amazonaws.com/roeetestbucket123/${file.name}`,
                name: `${file.name}`
            };
            let article = this.state.article
            article.heroObjects.push(heroObject);
            this.setState({
                article: article
            }, () => { console.log(this.state) })
            // this.props.uploadFile(file)
        } else {
            alert('you forgot somthing')
        }
    }


    editorContentToHtml(editorContent) {  // TO HTML STRING
        const rawContentState = convertToRaw(editorContent.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        return markup;
    };


    onCategoryChange(event) {
        const category = event.currentTarget.value;
        let newArticle = { ...this.state.article };
        newArticle.category = category;
        this.setState({
            article: newArticle
        }, () => { console.log(this.state) })
    }


    onHomePageChange(event) {
        const val = event.currentTarget.checked;
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
        console.log("runing", i)
        let newArticle = { ...this.state.article };
        newArticle.heroObjects = [...this.state.article.heroObjects];
        newArticle.heroObjects.splice(i, 1);
        this.setState({
            article: newArticle
        }, console.log(this.state))
    }


    onTitleChange() {// LISTINING ON CHANGE OF TITLE INPUT
        const text = document.getElementById("titleInput").value;
        let newState = { ...this.state };
        newState.article.name = `${text}`;
        newState.article.title = `${text}`;
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
        let newArticle = { ...this.state.article };
        newArticle.articleBody = markup;
        this.setState({
            editorState: editorState,
            article: newArticle
        })
    }


    componentDidMount() {
        console.log("componentDidMount")
        let that = this;
        if (!this.state.article.name && !this.state.article.category) {
            axios.get(`http://localhost:8080/GetArticle/${this.props.id}`)
                .then(function (response) {
                    that.setState({
                        article: response.data
                    }, () => {
                        // document.getElementById("homePageCheckbox").checked = that.state.article.showAtHomePage;
                        document.getElementById("titleInput").value = that.state.article.name;
                        document.getElementById("summeryInput").value = that.state.article.summery;
                        // document.getElementById("categoryOptions").value = that.state.article.category;
                        // let ourSubCategorys = that.state.article.subCategorys;
                        // for (let i = 0; i < ourSubCategorys.length; i++) {
                        //     console.log('checkingggg')
                        //     if (document.getElementById(`${ourSubCategorys[i]}`)) {
                        // document.getElementById(`${ourSubCategorys[i]}`).checked = true
                        // }
                        // }
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
    }

    componentWillMount() {
        this.props.setLocation(true);
    }
    componentWillUnmount() {
        this.props.setLocation(false);
    }


    render() {

        if (this.props.path === '/') {
            this.props.pathTo();
            return (<Redirect to='/' />)
        }


        let subCategorysRender1 = [];
        let subCategorysRender2 = [];
        let subCategorysRender3 = [];
        let ourSubCategorys = this.props.subCategorys || [];

        for (let i = 0; i < ourSubCategorys.length; i++) { // Loops throu all the categorys
            let didFind = false;
            for (let z = 0; z < this.state.article.subCategorys.length; z++) { // Loops through the checked ctegorys
                if (ourSubCategorys[i] === this.state.article.subCategorys[z]) {// checks if each category is checked or not 
                    didFind = true;
                    break;
                }
            }
               let myCheckboxDiv = (
                    <div className="singleSubCategoryDiv flex-item " key={`${i}`}>
                        <Checkbox
                            id={ourSubCategorys[i]}
                            onChange={() => { this.addSubCategory(i) }}
                            label={`${ourSubCategorys[i]}`}
                            checked={didFind}
                        />
                    </div>
                )

            if (i < (ourSubCategorys.length / 3)) {
                subCategorysRender1.push(myCheckboxDiv);
            } else if (i >= (ourSubCategorys.length / 3) && i < ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender2.push(myCheckboxDiv);
            } else if (i >= ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender3.push(myCheckboxDiv);
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



        //<------ showAtHomePage logic Start ------->
        let showAtHomePage = (
                <Switch
                    onChange={this.onHomePageChange}
                    className="homePageCheckbox"
                    id='homePageCheckbox'
                    checked={this.state.article.showAtHomePage}
                >Show At Home Page</Switch>
            );
        //<------ showAtHomePage logic End ------->



        let heroList = this.state.article.heroObjects;
        let filesList = []
        for (let i = 0; i < heroList.length; i++) {
            filesList.push(
                <SingleFile
                    singleFileTitle={heroList[i].title}
                    singleFileCredit={heroList[i].credit}
                    singleFileName={heroList[i].url}
                    onClick={() => {
                        this.removeSingleHero(i);
                    }}
                />
            )
        }
        return (
            <div className="EditArticle NewArticlePage" >
                <Link to="/">
                    <Button primary className="backHome">Back Home</Button>
                </Link>
                <h1>{this.state.article.name}</h1>
                <div className="heroFilesWrapper flex-container">
                    <div className="uploadFiles2 flex-item">
                        <p>Upliad Files</p>
                        <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file alignCenter">
                                <i className="material-icons">attach_file</i>
                                <input
                                    className="flex-item uploadInput "
                                    id='uploadFilesFile'
                                    type="file"
                                    accept="image/video"
                                    onChange={() => {
                                        let text = document.getElementById('uploadFilesFile').files[0].name;
                                        document.getElementById('fileLabeID').innerHTML = text
                                    }}
                                />
                            </div>
                            <p id="fileLabeID">No File Chosen</p>
                            <div>
                                Title:
                                <Textfield
                                    rows={1}
                                    id='uploadFilesTitle'
                                    className="uploadFilesTitleInput flex-item MDLTextfield"
                                    label="Title..."
                                    floatingLabel
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div>
                                Credit:
                                <Textfield
                                    rows={1}
                                    id='uploadFilesCredit'
                                    className="uploadFilesCreditInput flex-item"
                                    label="Credit..."
                                    floatingLabel
                                    style={{ width: '50%' }}
                                />
                            </div>
                        </form>
                        <div>
                            <Button
                                raised colored ripple
                                className="flex-item"
                                onClick={this.onUploadHeroForm}
                            >Submit
                            </Button>
                        </div>
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
                <h2 className="newArticleTitle">title</h2>
                <div className="titlebox flex-container">
                    <Textfield
                        rows={1}
                        className="newArticleTitleInput flex-item"
                        id='titleInput'
                        type='text'
                        /*value={this.state.article.name}*/
                        onBlur={this.onTitleChange}
                    />
                </div>
                <div className="summeryAndCategorysDiv flex-container">
                    <div className="summerybox flex-item flex-container">
                        <h2 className="flex-item">Summery</h2>
                        <Textfield
                            rows={10}
                            className="newArticleSummeryTextArea flex-item"
                            id='summeryInput'
                            type='text'
                            /*value={this.props.summeryValue}*/
                            onBlur={this.onSummeryChange}
                        />
                    </div>
                    <div className="allCategorysDiv flex-item flex-container">
                        <div className="filler flex-item">

                        </div>
                        <div className="homaPageAndCategory flex-item flex-container">
                            <div className="showAtHomePageBox flex-item">
                                {showAtHomePage}
                            </div>
                            <div className="categoryBox flex-item">
                                <RadioGroup id='categoryOptions' onChange={this.onCategoryChange} container="ul" childContainer="li" name="demo2" value={this.state.article.category}>
                                    <Radio value="Science">Science</Radio>
                                    <Radio value="Health">Health</Radio>
                                    <Radio value="Technology">Technology</Radio>
                                </RadioGroup>
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
                <div className="articleBodyBox" >
                    <h2>Artical Body</h2>
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <div className="publish">
                    <Button
                        className="publishButton"
                        raised
                        ripple
                        onClick={() => { this.props.onPublishClick(this.props.id, this.state.article) }}
                    >
                        publish
                    </Button>
                    <Button
                        className="saveButton saveToInProcess"
                        raised
                        colored
                        ripple
                        onClick={() => {
                            let newState = { ...this.state }
                            newState.article.isHidden = true;
                            this.props.updateArticlesInProcess(newState.article, this.props.id)
                        }}>
                        Save
                </Button>
                </div>
            </div>
        );
    }
}

export default EditArticle;

