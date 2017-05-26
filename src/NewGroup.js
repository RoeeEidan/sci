import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SingleFile from './Singlefile';

import { Button, Textfield, Checkbox, Switch, RadioGroup, Radio } from 'react-mdl';




class NewGroup extends Component {
    constructor() {
        super()
        this.state = {
            titleValue: false,
            summeryValue: false,
        }
    }

    componentDidMount() {
        this.props.setLocation(true);
        if (this.props.path !== '/') {
            document.getElementById("homePageCheckbox").checked = true
        }
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
        let checkedSubCategorys = this.props.checkedSubCategorys || [];

        for (let i = 0; i < ourSubCategorys.length; i++) {
            let Div = (
                <div className="singleSubCategoryDiv flex-item">
                    <Checkbox
                        label={ourSubCategorys[i]}
                        id={ourSubCategorys[i]}
                        onChange={() => { this.props.groupAddSubCategory(i) }}
                    />
                </div>
            );
            for (let z = 0; z < checkedSubCategorys.length; z++) {
                if (ourSubCategorys[i] === checkedSubCategorys[z]) {
                    Div = (
                        <div className="singleSubCategoryDiv flex-item">
                            <Checkbox
                                label={ourSubCategorys[i]}
                                id={ourSubCategorys[i]}
                                onChange={() => { this.props.groupAddSubCategory(i) }}
                                defaultChecked
                            />
                        </div>
                    );
                }
            }
            if (i < (ourSubCategorys.length / 3)) {
                subCategorysRender1.push(Div);
            } else if (i >= (ourSubCategorys.length / 3) && i < ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender2.push(Div);
            } else if (i >= ((ourSubCategorys.length / 3) * 2)) {
                subCategorysRender3.push(Div);
            } else {
                alert("Check App.js")
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


        const articlesList = this.props.arrayToRender(this.props.articles || []);

        // list of hero's
        let heroList = this.props.newGroupleHeros;
        let filesList = []
        for (let i = 0; i < heroList.length; i++) {
            filesList.push(
                <SingleFile
                    singleFileTitle={heroList[i].title}
                    singleFileCredit={heroList[i].credit}
                    singleFileName={heroList[i].name}
                    onClick={() => {
                        this.props.removeSingleHero(i);
                    }}
                />
            )
        }

        return (
            <div>
                <Link to="/">
                    <input type="button" value="Back Home" className="backHome" />
                </Link>
                <h1> New Group </h1>
                <div className="newGroupArticlesList">
                    ARTICLES
                   {articlesList}
                </div>
                <div className="heroFilesWrapper flex-container">
                    <div className="uploadFiles2 flex-item">
                        <p>Upliad Files</p>
                        <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file uploader">
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
                            <p>
                                Title:
                                <Textfield
                                    label='Title..'
                                    rows={1}
                                    id='uploadFilesTitle'
                                    className="uploadFilesTitleInput flex-item"
                                    floatingLabel
                                    style={{ width: '70%' }}
                                />
                            </p>
                            <p>
                                Credit:
                                <Textfield
                                    rows={1}
                                    id='uploadFilesCredit'
                                    className="uploadFilesCreditInput flex-item"
                                    label='Credit..'
                                    floatingLabel
                                    style={{ width: '50%' }}
                                />
                            </p>
                            <p>
                                <Button
                                    raised colored ripple
                                    className="flex-item"
                                    onClick={this.props.onUploadFilesFormSubmit}
                                >Submit
                                </Button>
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
                    <Textfield
                        rows={1}
                        className="newArticleTitleInput flex-item"
                        id='titleInput'
                        floatingLabel
                        label='Title..'
                        onBlur={this.props.onTitleChange}
                        onChange={() => { let text = document.getElementById("titleInput").value; this.setState({ titleValue: text }) }}
                        value={this.state.titleValue || this.props.groupTitleValue}
                    />
                </div>
                <div className="summeryAndCategorysDiv flex-container">
                    <div className="summerybox flex-item flex-container">
                        <h2 className="flex-item">Summery</h2>
                        <Textfield
                            className="newArticleSummeryTextArea flex-item"
                            id='summeryInput'
                            floatingLabel
                            label='Credit..'
                            rows={10}
                            onBlur={this.props.onSummeryChange}
                            onChange={() => { let text = document.getElementById("summeryInput").value; this.setState({ summeryValue: text }) }}
                            value={this.state.summeryValue || this.props.groupSummeryValue}
                        />
                    </div>
                    <div className="allCategorysDiv flex-item flex-container">
                        {/*<div className="filler flex-item">
                        </div>*/}
                        <div className="homaPageAndCategory flex-item flex-container">
                            <div className="showAtHomePageBox flex-item">
                                <Switch
                                    id='homePageCheckbox'
                                    className="homePageCheckbox"
                                    onChange={this.props.onHomePageChange}
                                    defaultChecked
                                >
                                    show at home page
                                </Switch>
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
                    {this.props.editor}
                </div>
                <div className="publish">
                    <button onClick={this.props.onPublishClick}>
                        publish
                    </button>
                </div>
                <button onClick={this.props.saveGroupToInProcess}>
                    Save
                </button>
            </div >

        )
    }
}

export default NewGroup;

