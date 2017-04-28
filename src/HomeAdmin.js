import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

//COMPONENTS

import SingleFile from './Singlefile';



class HomeAdmin extends Component {

    render() {

        if (this.props.path === '/newgroup') {
            this.props.pathTo();
            return (<Redirect to='/newgroup' />)
        }
        if (this.props.path === '/newarticle') {
            this.props.pathTo();
            return (<Redirect to='/newarticle' />)
        }


        let newSubCategoryButton = (<button className="newGroupButton" onClick={this.props.newSubCategoryButton}>New Sub Category</button>);
        if (this.props.newSubCategory) {
            newSubCategoryButton = (
                <form id="newSubCategoryForm">
                    Sub Category: <input type="text" id="newCategoryInput" className="newCategoryInput" />
                    <input type="button" value="Create" onClick={this.props.addCategory} />
                </form>
            )
        }


        let subCategorysRender = [];
        let subCategorys = this.props.subCategorys;
        for(let i = 0; i < subCategorys.length; i++){
            subCategorysRender.push(
                <li>{subCategorys[i]}<button onClick={()=>{this.props.removeSubCategory(i)}}>remove</button></li>
            )
        }


        let groupsArray = this.props.groupsArray;// creating the list of groups
        let groupList = [];
        for (let i = 0; i < groupsArray.length; i++) {
            groupList.push(
                <div>
                    {groupsArray[i].name}
                    <button onClick={() => { this.props.removeGroup(i) }} >remove</button>
                </div>
            )
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


        let heroList = this.props.heroObjects; // HOME HERO LIST
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

        let allArticlesList = this.props.arrayToRender(this.props.allArticlesList);


        return (
            <div className="App" >
                <h1>HOME PAGE</h1>
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
                    {filesList}
                </div>
                <div>
                    Sub Categorys
                    <ul>
                        {subCategorysRender}
                    </ul>
                    {newSubCategoryButton}
                </div>
                <div>
                    ARTICLES
                        {allArticlesList}
                </div>
                <div>
                    Groups
                         {groupList}
                </div>
                <div>
                    {groupVar}
                </div>
                <div>
                    <button onClick={this.props.updateDbState}>Update The Web</button>
                </div>

            </div>
        );
    }
}

export default HomeAdmin;
