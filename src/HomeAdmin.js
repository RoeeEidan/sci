import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Link, Route } from 'react-router-dom';


//COMPONENTS

import SingleFile from './Singlefile';



const Topics = (that) => (
    <div>
        <ul>
            <li
                onClick={(that) => {
                    that.setState({
                        renderInt: 0
                    })
                }}
            >Hero Image's
            </li>
            <li
                onClick={(that) => {
                    that.setState({
                        renderInt: 1
                    }, () => { console.log(that.state) })
                }}
            >
                Article's
            </li>
            <li
                onClick={() => {
                    that.setState({
                        renderInt: 2
                    })
                }}
            >
                Group's
            </li>
            <li
                onClick={() => {
                    that.setState({
                        renderInt: 3
                    })
                }}
            >
                Sub Categories
            </li>
        </ul>
        <hr />

    </div>
)


class HomeAdmin extends Component {
    constructor() {
        super()
        this.state = {
            renderInt: 0,
            addHero: false,
        }
        this.myFunc = this.myFunc.bind(this);
    }

    myFunc(event) {
        console.log("RUNING!!")
        var specifiedElement = document.getElementById('uploadFilesForm');
        var isClickInside = specifiedElement.contains(event.target);
        if (!isClickInside) {
            if (this.state.addHero) {
                console.log("removing event listner")
                document.removeEventListener('click', this.myFunc);
                console.log("Setting to false")
                this.setState({
                    addHero: false,
                })
            }
        }
    }

    componentDidUpdate() {
        let that = this;
        if (document.getElementById("groupNameInput")) {
            document.getElementById("groupNameInput").focus()
        }
        if (document.getElementById("newCategoryInput")) {
            document.getElementById("newCategoryInput").focus()
        }
        if (document.getElementById("uploadFilesForm")) {
            console.log("adding event listner")
            document.addEventListener('click', this.myFunc);
        }
    }

    render() {
        if (this.props.path) {
            this.props.pathTo();
            return (<Redirect to={this.props.path} />)
        }



        let newSubCategoryButton = (<div className="newCategoryButtonDiv"> <button className="newGroupButton" onClick={this.props.newSubCategoryButton}>New Sub Category</button></div>);
        if (this.props.newSubCategory) {
            newSubCategoryButton = (
                <div className="newCategoryButtonDiv">
                    <form id="newSubCategoryForm">
                        Sub Category: <input type="text" id="newCategoryInput" className="newCategoryInput" onBlur={this.props.stopNewCategory} />
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
                    <img
                        height="30%"
                        src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                        onClick={() => {
                            if (confirm(`Are you sure you want to remove ${subCategorys[i]}`) == true) {
                                this.props.removeSubCategory(i)
                            } else {
                                console.log('ok')
                            }
                        }} />
                </li>
            )
        }


        let groupsArray = this.props.homePageState.groups || [];// creating the list of groups
        let groupList1 = [];
        let groupList2 = [];
        let groupList3 = [];
        let hiddenGroupList = [];
        for (let i = 0; i < groupsArray.length; i++) {
            if (groupsArray[i].isHidden) {
                hiddenGroupList.push(
                    <div className="singleGroupList flex-item flex-container">
                        <div className="singleGroupButtons">
                            <img
                                height="25px"
                                width="25px"
                                src="https://s3.amazonaws.com/roeetestbucket123/edit-flat.png"
                                onClick={() => { this.props.editGroup(i) }}
                            />
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <img
                                height="30%"
                                src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }} />
                        </div>
                    </div>
                )
            }
            else if (i < (groupsArray.length / 3)) {
                groupList1.push(
                    <div className="singleGroupList flex-item flex-container">
                        <div className="singleGroupButtons">
                            <img
                                height="25px"
                                width="25px"
                                src="https://s3.amazonaws.com/roeetestbucket123/edit-flat.png"
                                onClick={() => { this.props.editGroup(i) }}
                            />
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <img
                                height="30%"
                                src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }} />
                        </div>
                    </div>
                )
            } else if ((groupsArray.length / 3) <= i && i < ((groupsArray.length / 3) * 2)) {
                groupList2.push(
                    <div className="singleGroupList flex-item flex-container singleGroupList2">
                        <div className="singleGroupButtons">
                            <img
                                height="25px"
                                width="25px"
                                src="https://s3.amazonaws.com/roeetestbucket123/edit-flat.png"
                                onClick={() => { this.props.editGroup(i) }}
                            />
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <img
                                height="30%"
                                src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }} />
                        </div>
                    </div>
                )
            } else if (((groupsArray.length / 3) * 2) <= i) {
                groupList3.push(
                    <div className="singleGroupList flex-item flex-container">
                        <div className="singleGroupButtons">
                            <img
                                height="25px"
                                width="25px"
                                src="https://s3.amazonaws.com/roeetestbucket123/edit-flat.png"
                                onClick={() => { this.props.editGroup(i) }}
                            />
                        </div>
                        <div className="singleGroupName">
                            {groupsArray[i].name}
                        </div>
                        <div className="singleGroupButtons">
                            <img
                                height="30%"
                                src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }} />
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
                    Group Name: <input type="text" id="groupNameInput" className="groupNameInput" onBlur={this.props.stopGroupProccese} />
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
                    singleFileName={heroList[i].url}
                    onClick={() => {
                        if (confirm(`Are you sure you want to delete ${heroList[i].name} ?`) == true) {
                            this.props.removeSingleHero(i)
                        } else {
                            console.log('ok')
                        }
                    }}
                />
            )
        }

        let allArticlesList = this.props.arrayToRender(this.props.homePageState.articles || []);


        // let plusStyle = {
        //     fontSize: 60,
        //     transition: 0,
        //     '&:hover': {
        //         fontSize: 90,
        //     }
        // };

        let addHeroButton = (
            <div
                /*style = {plusStyle}*/
                className="uploadFilesPlus flex-item ✢"
                onClick={() => {
                    this.setState({
                        addHero: true,
                    }, () => { console.log(this.state); this.forceUpdate() })
                }}
            >
                ✢
            </div>
        )
        console.log("befor the if")
        if (this.state.addHero) {
            console.log("after the if")
            addHeroButton = (
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
            )
        }


        let heroImageStyle = {};
        let articleStyle = {};
        let groupStyle = {};
        let subCategoryStyle = {};

        let foucsStyle = {
            borderBottom: '2px solid #fc852e',
            fontSize: 'x-large',
            color: "#172e7c"
        }


        let myWindow;
        let homaPageAddButtonVar;
        switch (this.state.renderInt) {
            case 0:
                heroImageStyle = foucsStyle;
                homaPageAddButtonVar = addHeroButton;
                myWindow = (
                    <div className="heroFilesWrapper flex-container">
                        <div className="listOfHeros">
                            {filesList}
                        </div>
                    </div>)
                break;
            case 1:
                articleStyle = foucsStyle;
                homaPageAddButtonVar = (<div className="newArticleButton">
                    <Link to="newarticle"><button>New Article</button></Link>
                </div>);
                myWindow = (
                    <div>
                        {/*<div className="homeArticlesDiv">

                        </div>*/}
                        <div className="homeArticlesDiv">
                            <p className="articlesTitle">
                                ARTICLES
                            </p>
                            {allArticlesList.showenList}
                            <p className="articlesTitle">
                                ARTICLES IN PROSSEC
                            </p>
                            {allArticlesList.hiddenList}
                        </div>
                    </div>
                )
                break;
            case 2:
                groupStyle = foucsStyle;
                homaPageAddButtonVar = (<div className="newGroupButton">
                    {groupVar}
                </div>)
                myWindow = (
                    <div>
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
                        <p className="groupsTitle">
                            GROUPS IN PROSSEC
                        </p>
                        <div className="groupListDiv flex-container">
                            <div className="groupList flex-item ">
                                {hiddenGroupList}
                            </div>
                        </div>
                    </div>
                )
                break;
            case 3:
                subCategoryStyle = foucsStyle;
                homaPageAddButtonVar = newSubCategoryButton;
                myWindow = (
                    <div>
                        <p className="subCategorysTitle">
                            Sub Categories
                        </p>
                        <ul className="flex-contaiter subCategorysUl">
                            {subCategorysRender}
                        </ul>
                    </div>
                )
                break;
            default:
                console.log(this.state.path)
                this.setState({
                    renderInt: 0
                })
        }



        return (
            <div className="App" >
                <h1>Sci-Fare.com</h1>
                <div>
                    <ul className="homePageNavBarUL flex-container">
                        <li
                            style={heroImageStyle}
                            className="flex-item"
                            onClick={() => {
                                this.setState({
                                    renderInt: 0
                                })
                            }}
                        >Hero Images
                        </li>
                        <li
                            style={articleStyle}
                            className="flex-item"
                            onClick={() => {
                                this.setState({
                                    renderInt: 1
                                })
                            }}
                        >
                            Articles
                        </li>
                        <li
                            style={groupStyle}
                            className="flex-item"
                            onClick={() => {
                                this.setState({
                                    renderInt: 2
                                })
                            }}
                        >
                            Groups
                        </li>
                        <li
                            style={subCategoryStyle}
                            className="flex-item"
                            onClick={() => {
                                this.setState({
                                    renderInt: 3
                                })
                            }}
                        >
                            Sub Categories
                    </li>
                    </ul>

                    <div className="flex-container homePageWindow">
                        <div className="flex-container homePageWindowWrapper">
                            <div
                                className="flex-item homePageArrow "
                                onClick={() => {
                                    let renderInt = this.state.renderInt;
                                    if (renderInt <= 0) {
                                        renderInt = 3
                                    } else {
                                        renderInt--
                                    }
                                    this.setState({
                                        renderInt: renderInt,
                                    })
                                }}
                            >
                                <svg width="100" height="280" xmlns="http://www.w3.org/2000/svg" className="svg">
                                    <g>
                                        <title>Layer 1</title>
                                        <g stroke="null" id="svg_3">
                                            <rect stroke="null" id="svg_2" height="279.71037" width="100.663093" y="0.059024" x="0.000014" stroke-opacity="null" stroke-width="1.5" fill="none" />
                                            <path stroke="null" id="svg_1" d="m45.389625,139.476985l31.653553,-132.080087l-52.499917,132.080087l52.499917,132.079983l-31.653553,-132.079983z" stroke-width="1.5" fill="#fc852e" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex-item windowBox ">
                                {myWindow}
                            </div>
                            <div
                                className="flex-item homePageArrow "
                                onClick={() => {
                                    let renderInt = this.state.renderInt;
                                    if (renderInt >= 3) {
                                        renderInt = 0
                                    } else {
                                        renderInt++
                                    }
                                    this.setState({
                                        renderInt: renderInt,
                                    })
                                }}
                            >
                                <svg width="100" height="280" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <title>Layer 1</title>
                                        <g id="svg_3">
                                            <rect stroke="null" id="svg_2" height="279.71037" width="100.312502" y="0.059024" x="-0.312502" stroke-opacity="null" stroke-width="1.5" fill="none" />
                                            <path stroke="null" id="svg_1" d="m54.768473,139.476985l-31.54331,-132.080087l52.31707,132.080087l-52.31707,132.079983l31.54331,-132.079983z" stroke-width="1.5" fill="#fc852e" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-item homePageAddButton flex-container">
                            {homaPageAddButtonVar}
                        </div>
                    </div>

                </div>







                {/*<div>
                    <button onClick={this.props.updateDbState}>Update The Web</button>      // CHECK ON REMOVING THE ON CLICK FUNC
                </div>*/}
            </div>
        )
    }
}

export default HomeAdmin;
