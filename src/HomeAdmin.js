import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

//COMPONENTS

import SingleFile from './Singlefile';


class HomeAdmin extends Component {
    render() {
        console.log("Home page statttte!!!! ", this.props)

        if (this.props.path) {
            this.props.pathTo();
            return (<Redirect to={this.props.path} />)
        }

        let newSubCategoryButton = (<div className="newCategoryButtonDiv"> <button className="newGroupButton" onClick={this.props.newSubCategoryButton}>New Sub Category</button></div>);
        if (this.props.newSubCategory) {
            newSubCategoryButton = (
                <div className="newCategoryButtonDiv">
                    <form id="newSubCategoryForm">
                        Sub Category: <input type="text" id="newCategoryInput" className="newCategoryInput" />
                        <input type="button" value="Create" onClick={this.props.addCategory} />
                    </form>
                </div>
            )
        }


        let subCategorysRender = [];
        let subCategorys = this.props.homePageState.subCategorys || [];
        for (let i = 0; i < subCategorys.length; i++) {
            subCategorysRender.push(
                <li className="flex-item">
                    <span className="subCategorysText">
                        {subCategorys[i]}
                    </span>
                    <button onClick={() => { this.props.removeSubCategory(i) }}>
                        remove
                    </button>
                </li>
            )
        }


        let groupsArray = this.props.homePageState.groups || [];// creating the list of groups
        let groupList1 = [];
        let groupList2 = [];
        let groupList3 = [];
        for (let i = 0; i < groupsArray.length; i++) {
            if (i < (groupsArray.length / 3)) {
                groupList1.push(
                    <div className="singleGroupList flex-item flex-container">
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.editGroup(i) }} >Edit</button>
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.removeGroup(i) }} >remove</button>
                        </div>
                    </div>
                )
            } else if ((groupsArray.length / 3) <= i && i < ((groupsArray.length / 3) * 2)) {
                groupList2.push(
                    <div className="singleGroupList flex-item flex-container singleGroupList2">
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.editGroup(i) }} >Edit</button>
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.removeGroup(i) }} >remove</button>
                        </div>
                    </div>
                )
            } else if (((groupsArray.length / 3) * 2) <= i) {
                groupList3.push(
                    <div className="singleGroupList flex-item flex-container">
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.editGroup(i) }} >Edit</button>
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <button onClick={() => { this.props.removeGroup(i) }} >remove</button>
                        </div>
                    </div>
                )
            } else {
                alert("check HomeAdmin at line 60")
            }
        }


        let groupVar = (<button className="newGroupButton" onClick={this.props.creatNewGroup}>New Group</button>);// diplaying the new group form
        if (this.props.isInProccese) {
            groupVar = (
                <form id="newGroupForm">
                    Group Name: <input type="text" id="groupNameInput" className="groupNameInput" />
                    <input type="button" value="Create" onClick={this.props.startNewGroup} />
                </form>
            )
        }


        let heroList = this.props.homePageState.heroObjects || []; // HOME HERO LIST
        let filesList = [];
        for (let i = 0; i < heroList.length; i++) {
            filesList.push(
                <SingleFile
                    singleFileTitle={heroList[i].title}
                    singleFileCredit={heroList[i].credit}
                    singleFileName={heroList[i].name}
                    onClick={() => { this.props.removeSingleHero(i) }}
                />
            )
        }

        let allArticlesList = this.props.arrayToRender(this.props.homePageState.articles || []);


        return (
            <div className="App" >
                <h1>HOME PAGE</h1>
                <div className="heroFilesWrapper flex-container">
                    <div className="uploadFiles flex-item">
                        <p>Upliad Files</p>
                        <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                            <input
                                className="flex-item"
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
                                <input type="button" value="Submit" className="flex-item" onClick={this.props.onUploadFilesFormSubmit} />
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
                <div>
                    <p className="subCategorysTitle">
                        Sub Categories
                    </p>
                    <ul className="flex-contaiter subCategorysUl">
                        {subCategorysRender}
                    </ul>
                    {newSubCategoryButton}
                </div>
                <div className="homeArticlesDiv">
                    <p className="articlesTitle">
                        ARTICLES
                    </p>
                    {allArticlesList}
                    <div className="newArticleButton">
                        <Link to="newarticle"><button>New Article</button></Link>
                    </div>
                </div>
                <p className="groupsTitle">
                    GROUPS
                </p>
                <div className="groupListDiv flex-container">
                    <div className="groupList flex-item flex-container">
                        {groupList1}
                    </div>
                    <div className="groupList flex-item flex-container">
                        {groupList2}
                    </div>
                    <div className="groupList flex-item flex-container">
                        {groupList3}
                    </div>
                </div>
                <div className="newGroupButton">
                    {groupVar}
                </div>
                {/*<div>
                    <button onClick={this.props.updateDbState}>Update The Web</button>      // CHECK ON REMOVING THE ON CLICK FUNC
                </div>*/}
            </div>
        );
    }
}

export default HomeAdmin;
