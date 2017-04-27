import React, { Component } from 'react';
import SingleHomeArticle from './SingleHomeArticle';
import './App.css';

//COMPONENTS

import SingleFile from './Singlefile';



class HomeAdmin extends Component {

    render() {

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
        if(this.props.isInProccese){
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

                    <div>
                        ARTICLES
                        {allArticlesList}
                    </div>
                    <div>
                        Groups
                         {groupList}
                        {groupVar}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeAdmin;
