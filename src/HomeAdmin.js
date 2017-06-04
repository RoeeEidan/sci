import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';


//COMPONENTS

import SingleFile from './Singlefile';
import MyButton from './MyButton';
// import FileInput from './FileInput';
import SingleHomeArticle from './SingleHomeArticle';
import Card from './Card';


// Animation package 

import { Motion,/* TransitionMotion, */spring } from 'react-motion';
import { Button, /*Card, CardText,*/ Textfield } from 'react-mdl';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

// import { Button as Button2 } from 'react-bootstrap';

// Radium lets you write react style
import Radium from 'radium';


import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css';

class HomeAdmin extends Component {
    constructor() {
        super()
        this.state = {
            renderInt: 0,
            addHero: false,
            fileName: "No File Chosen",
        }

        this.addButtonSvg;

        this.isMobile;

        this.uniqueNumber = 0;

        this.addOutSideEventListener = this.addOutSideEventListener.bind(this);

        this.toShownAtHomeOrNot = this.toShownAtHomeOrNot.bind(this);

        this.arrayToRender = this.arrayToRender.bind(this);

        this.onKeyDown = this.onKeyDown.bind(this);

        this.unikeId = this.unikeId.bind(this);

    }


    unikeId() {

        let date = new Date().valueOf();

        if (date === this.uniqueNumber) {

            date = (this.uniqueNumber++)

        } else {

            this.uniqueNumber = date;

        }
        return date;
    }


    onKeyDown(e) {
        let thisRendetInt = this.state.renderInt
        switch (e.keyCode) {
            case 39:
                if (thisRendetInt >= 3) {
                    thisRendetInt = 0
                } else {
                    thisRendetInt++
                }
                break;
            case 37:
                if (thisRendetInt <= 0) {
                    thisRendetInt = 3
                } else {
                    thisRendetInt--
                }
                break;
            default:
                break;
        }
        this.setState({
            renderInt: thisRendetInt
        })
    }


    arrayToRender(articles) {

        let hiddenListToRender = [];
        let atHomePageScience = [];
        let atHomePageHealth = [];
        let atHomePageTechnology = [];
        let notAtHomePageScience = [];
        let notAtHomePageHealth = [];
        let notAtHomePageTechnology = [];

        for (let i = 0; i < articles.length; i++) {
            // Loops through all the articles


            let style = { backgroundColor: '#FEBC64', ':hover': { backgroundColor: 'rgba(254, 188, 100, 0.6)' } }

            let _id = articles[i]._id;

            if (articles[i].isHidden) { // checks if its hidden and if it is it pushs it
                if (hiddenListToRender.length % 2 === 0) {
                    style = {
                        backgroundColor: '#FFD180',
                        ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                    }
                }
                hiddenListToRender.push(
                    <SingleHomeArticle
                        style={style}
                        editSingleArticle={this.props.editSingleArticle}
                        name={articles[i].name}
                        removeSingleArticle={() => {
                            if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                this.props.removeHomeSingleArticle(i);
                                this.props.postTo(`DeleteArticle/${_id}`)
                            }
                        }}
                        index={i}
                    />
                )
            } else {
                // Sepered in to categories
                if (articles[i].showAtHomePage) {
                    switch (articles[i].category) {
                        case 'Science':
                            if (atHomePageScience.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            atHomePageScience.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        case 'Health':
                            if (atHomePageHealth.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            atHomePageHealth.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        case 'Technology':
                            if (atHomePageTechnology.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            atHomePageTechnology.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        default: console.log("Shouldnt happen")
                            break;
                    }
                } else {
                    switch (articles[i].category) {
                        case 'Science':
                            if (notAtHomePageScience.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            notAtHomePageScience.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        case 'Health':
                            if (notAtHomePageHealth.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            notAtHomePageHealth.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        case 'Technology':
                            if (notAtHomePageTechnology.length % 2 === 0) {
                                style = {
                                    backgroundColor: '#FFD180',
                                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                                }
                            }
                            notAtHomePageTechnology.push(
                                <SingleHomeArticle
                                    style={style}
                                    editSingleArticle={this.props.editSingleArticle}
                                    name={articles[i].name}
                                    removeSingleArticle={() => {
                                        if (confirm(`Are you sure you want to remove ${articles[i].name}???`) === true) {
                                            this.props.removeHomeSingleArticle(i);
                                            this.props.postTo(`DeleteArticle/${_id}`)
                                        }
                                    }}
                                    index={i}
                                />
                            );
                            break;
                        default: console.log("Shouldnt happen")
                            break;
                    }
                }
            }
        }
        if (hiddenListToRender.length === 0) {
            let style = { backgroundColor: '#ffd180' }
            hiddenListToRender.push(<div style={style} >There Are No Articles In Prossec</div>)
        }
        return ({
            hiddenList: <div className="articleListBoxToRender flex-container">
                <div className="articleListToRender flex-item flex-container">
                    {hiddenListToRender}
                </div>
            </div>,
            showenList: <div className="articleListBoxToRender articleListToRender flex-container flex-item">
                <div className="atHomePage"><div className="homePageArticlessSpaners">AT HOME PAGE</div></div>
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">SCIENCE</div></div>
                {atHomePageScience}
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">HEALTH</div></div>
                {atHomePageHealth}
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">TECHNOLOGY</div></div>
                {atHomePageTechnology}
                <div className="atHomePage"><div className="homePageArticlessSpaners">NOT AT HOME PAGE</div></div>
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">SCIENCE</div></div>
                {notAtHomePageScience}
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">HEALTH</div></div>
                {notAtHomePageHealth}
                <div className="atHomePageCategory"><div className="homePageArticlessSpaners">TECHNOLOGY</div></div>
                {notAtHomePageTechnology}
            </div>

        })
    }




    toShownAtHomeOrNot(allArticlesList) {

    }



    addOutSideEventListener(event) {
        console.log("RUNING!!")
        var specifiedElement = document.getElementById('uploadFilesForm');
        var isClickInside = specifiedElement.contains(event.target);
        if (!isClickInside) {
            if (this.state.addHero) {
                console.log("removing event listner")
                document.removeEventListener('click', this.addOutSideEventListener);
                console.log("Setting to false")
                this.setState({
                    addHero: false,
                })
            }
        }
    }

    componentWillMount() {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.isMobile = isMobile;
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown, true);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown, true);
        if (this.isMobile && document.getElementById('homePageWindow')) {
            document.getElementById('homePageWindow').style.maxHeight = '515px';
            if (document.getElementById('homePageAddButton')) {
                document.getElementById('homePageAddButton').style.padding = '0 0 13px 0';
            }
        }
    }


    componentDidUpdate() {
        // let that = this;
        if (document.getElementById("groupNameInput")) {
            document.getElementById("groupNameInput").focus()
        }
        if (document.getElementById("newCategoryInput")) {
            document.getElementById("newCategoryInput").focus()
        }
        if (document.getElementById("uploadFilesForm")) {
            console.log("adding event listner")
            document.addEventListener('click', this.addOutSideEventListener);
        }
    }

    render() {



        if (this.props.path) {
            this.props.pathTo();
            return (<Redirect to={this.props.path} />)
        }

        // Styles 
        let arrowStyle = {};
        let windowStyle = { width: '100%' }

        if (this.isMobile) {
            windowStyle = { width: '100%', padding: '7px' }
            arrowStyle = { display: 'none' }
        }

        // End Styles

        let newSubCategoryButton = (<div className="newCategoryButtonDiv"> <Button raised ripple className="newGroupButton" onClick={this.props.newSubCategoryButton}>Add</Button></div>);
        if (this.props.newSubCategory) {
            newSubCategoryButton = (
                <div className="newCategoryButtonDiv">
                    <form id="newSubCategoryForm">
                        Sub Category: <input type="text" id="newCategoryInput" className="newCategoryInput" onBlur={this.props.stopNewCategory} />
                        <Button raised ripple onClick={this.props.addCategory}> Creat! </Button>
                    </form>
                </div>
            )
        }


        let subCategorysRender = [];
        let subCategorys = this.props.homePageState.subCategorys || [];
        for (let i = 0; i < subCategorys.length; i++) {
            let thisSubCategoryStyle = { backgroundColor: '#FEBC64', ':hover': { backgroundColor: 'rgba(254, 188, 100, 0.6)' } }
            if (subCategorysRender.length % 2 === 0) {
                thisSubCategoryStyle = {
                    backgroundColor: '#FFD180',
                    ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' }
                }
            }
            subCategorysRender.push(
                <li className="flex-item" style={thisSubCategoryStyle} key={`${subCategorys[i]}`} key={`${i}`}>
                    <div className="subCategorysText">
                        {subCategorys[i]}
                    </div>
                    <Button
                        accent
                        onClick={() => {
                            if (confirm(`Are you sure you want to remove ${subCategorys[i]}`) === true) {
                                this.props.removeSubCategory(i)
                            } else {
                                console.log('ok')
                            }
                        }} >
                        <i className="material-icons">clear</i>
                    </Button>
                </li>
            )
        }


        let groupsArray = this.props.homePageState.groups || [];// creating the list of groups
        let groupList1 = [];
        let hiddenGroupList = [];
        for (let i = 0; i < groupsArray.length; i++) {
            // var _id = this.unikeId();
            let thisGrouoStyle = { backgroundColor: '#FEBC64', ':hover': { backgroundColor: 'rgba(254, 188, 100, 0.6)' } }
            if (groupsArray[i].isHidden) {
                if (hiddenGroupList.length % 2 === 0) {
                    thisGrouoStyle = { backgroundColor: '#FFD180', ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' } };
                }
                hiddenGroupList.push(
                    <div className="singleGroupList flex-item flex-container" style={thisGrouoStyle} key={`${i}`}>
                        <div className="singleGroupName">
                            <div className='groupArticleTextWrapper'>
                                {groupsArray[i].name}
                            </div>
                        </div>
                        <div className="singleGroupButtons">
                            <Button
                                primary
                                onClick={() => { this.props.editGroup(i) }}
                            >
                                <i className="material-icons">edit</i>
                            </Button>
                            <Button
                                accent
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }} >
                                <i className="material-icons">clear</i>
                            </Button>
                        </div>
                    </div>
                )
            }
            else {
                if (groupList1.length % 2 === 0) {
                    thisGrouoStyle = { backgroundColor: '#FFD180', ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' } };
                }
                var _id = this.unikeId();
                groupList1.push(
                    <div className="singleGroupList flex-item flex-container" style={thisGrouoStyle} key={`${i}`}>
                        <div className="singleGroupName">
                            <div className='groupArticleTextWrapper'>
                                {groupsArray[i].name}
                            </div>
                        </div>
                        <div className="singleGroupButtons">
                            <Button
                                primary
                                onClick={() => { this.props.editGroup(i) }}
                            >
                                <i className="material-icons">edit</i>
                            </Button>
                            <Button
                                accent
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${groupsArray[i].name}??`)) {
                                        this.props.removeGroup(i)
                                    }
                                }}>
                                <i className="material-icons">clear</i>
                            </Button>
                        </div>
                    </div>
                )
            }
        }
        if (hiddenGroupList.length === 0) {
            let style = { backgroundColor: '#ffd180', textAlign: 'center' }
            hiddenGroupList.push(<div style={style}>There Are No Groups In Prossec</div>)
        }


        let groupVar = (<Button raised ripple className="newGroupButton" onClick={this.props.creatNewGroup}>Add</Button>);// diplaying the new group form
        if (this.props.isInProccese) {
            groupVar = (
                <form id="newGroupForm">
                    Group Name: <input type="text" id="groupNameInput" className="groupNameInput" onBlur={this.props.stopGroupProccese} />
                    <Button raised ripple onClick={this.props.startNewGroup} >Craet !</Button>
                </form>
            )
        }


        let heroList = this.props.homePageState.heroObjects || []; // HOME HERO LIST
        let filesList = [];
        for (let i = 0; i < heroList.length; i++) {
            let style = {};
            let cardStyle = { backgroundColor: "#ffe8c0", width: '90%', margin: 'auto' , textAlign: 'center' };
            let titleStyle = { color: '#fff', height: '300px', background: `url("${heroList[i].url}") center / cover` }
            if (i % 2 === 0) {
                style = { backgroundColor: "#febc64", padding: '10px 0 ' /*':hover': { backgroundColor: 'rgba(254, 188, 100, 0.6)' }*/ }
            } else {
                style = { backgroundColor: "#FFD180", padding: '10px 0 '/* ':hover': { backgroundColor: 'rgba(255, 209, 128, 0.6)' } */ }
            }
            if (this.isMobile) {
                titleStyle.height = '150px'
            }

            filesList.push(
                <div style={style} key={i}>
                    <Card
                        titleStyle={titleStyle}
                        cardStyle={cardStyle}
                        title={heroList[i].title}
                        credit={heroList[i].credit}
                        url={heroList[i].url}
                        onDeleteClick={() => {
                            console.log(heroList[i].url);
                            if (confirm(`Are you sure you want to delete ${heroList[i].name} ?`) === true) {
                                this.props.removeSingleHero(i)
                            } else {
                                console.log('ok')
                            }
                        }}
                    />
                </div>
                /*<SingleFile
                    style={style}
                    singleFileTitle={heroList[i].title}
                    singleFileCredit={heroList[i].credit}
                    singleFileName={heroList[i].url}
                    onClick={() => {
                        if (confirm(`Are you sure you want to delete ${heroList[i].name} ?`) === true) {
                            this.props.removeSingleHero(i)
                        } else {
                            console.log('ok')
                        }
                    }}
                />*/
            )
        }

        let allArticlesList = this.arrayToRender(this.props.homePageState.articles || []);

        //  1. Need to seperaid to shown at home and not

        //  2. Need to seperaid in to categorys arrays


        let addHeroButton = (
            <div
                /*style = {transition}*/
                /*onMouseOver={this.onAddMouseOver}
                onMouseOut={this.onAddMouseOut}*/
                className="uploadFilesPlus flex-item ✢"

            >
                <Button raised ripple
                    onClick={() => {
                        this.setState({
                            addHero: true,
                        }, () => { console.log(this.state); this.forceUpdate() })
                    }}
                >Add
                </Button>
            </div>
        )
        if (this.state.addHero && (this.state.renderInt === 0)) {
            addHeroButton = (
                <div className="uploadFiles flex-item">
                    <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                        <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file uploader">
                            <i className="material-icons uploadInputHome">attach_file</i>
                            <input
                                className="flex-item uploadInput"
                                id='uploadFilesFile'
                                type="file"
                                accept="image/video"
                                onChange={() => {
                                    let file = document.getElementById("uploadFilesFile").files[0]
                                    this.setState({
                                        fileName: file.name
                                    })
                                }}
                            />
                        </div>
                        {this.state.fileName}
                        <p>
                            Title: {/* <textarea rows="2" type='text' id='uploadFilesTitle' className="uploadFilesTitleInput flex-item" />*/}
                            <Textfield
                                id='uploadFilesTitle'
                                className="uploadFilesTitleInput flex-item"
                                label="  Title..."
                                rows={1}
                                style={{ borderBottomColor: 'black' }}
                            />
                        </p>
                        <p>
                            Credit:
                             <Textfield
                                id='uploadFilesCredit'
                                className="uploadFilesCreditInput flex-item"
                                label="  Credit..."
                                rows={1}
                                style={{ borderBottomColor: 'black' }}
                            />
                        </p>
                        <p className="flex-item">
                            <MyButton
                                miliSeconds='2000'
                                onClick={() => { this.props.onUploadFilesFormSubmit(); this.setState({ fileName: "No File Chosen" }) }}
                            />
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
            color: "#172e7c",
            transition: "0.3s ease-in-out",
        }
        let mobileFoucsStyle = {
            borderBottom: '2px solid #fc852e',
            fontSize: '20px',
            color: "#172e7c",
            transition: "0.3s ease-in-out",
        }


        let myWindow;
        let homaPageAddButtonVar;
        switch (this.state.renderInt) {
            case 0:
                if (this.isMobile) {
                    heroImageStyle = mobileFoucsStyle;
                } else {
                    heroImageStyle = foucsStyle;
                }
                homaPageAddButtonVar = addHeroButton;
                myWindow = (
                    <div className="heroFilesWrapper flex-container" key="heroBox">
                        <div className="listOfHeros">
                            <ReactCSSTransitionReplace transitionName="roll-up"
                                transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                                <div key="filesListDiv">
                                    {filesList}
                                </div>
                            </ReactCSSTransitionReplace>
                        </div>
                    </div>)
                break;
            case 1:
                if (this.isMobile) {
                    articleStyle = mobileFoucsStyle;
                } else {
                    articleStyle = foucsStyle;
                }

                homaPageAddButtonVar = (<div className="newArticleButton" >
                    <Link to="newarticle"><Button raised ripple>Add</Button></Link>
                </div>);
                myWindow = (
                    <div key="articleBox" className="homeArticlesDiv">
                        <div className="articlesTitle">
                            <div >
                                <span className="homePageArticlessSpaners">
                                    IN PROSSEC
                                </span>
                            </div>
                        </div>
                        <ReactCSSTransitionReplace transitionName="roll-up"
                            transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                            <div key="articalsListKsy">
                                {allArticlesList.hiddenList}
                            </div>
                        </ReactCSSTransitionReplace>
                        {/*<p className="articlesTitle">
                            ARTICLES
                            </p>*/}
                        <ReactCSSTransitionReplace transitionName="cross-fade"
                            transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                            <div key="articalsListKey">
                                {allArticlesList.showenList}
                            </div>
                        </ReactCSSTransitionReplace>
                    </div>
                )
                break;
            case 2:
                if (this.isMobile) {
                    groupStyle = mobileFoucsStyle;
                } else {
                    groupStyle = foucsStyle;
                }
                homaPageAddButtonVar = (<div className="newGroupButton">
                    {groupVar}
                </div>)
                myWindow = (
                    <div key="groupBox">
                        <div className="groupsTitle ">
                            <div className="homePageGroupsSpaners">
                                GROUPS IN PROSSEC
                            </div>
                        </div>
                        <div className="groupListDiv flex-container">
                            <div className="groupList flex-item ">
                                {hiddenGroupList}
                            </div>
                        </div>
                        <div className="groupsTitle ">
                            <div className="homePageGroupsSpaners">
                                GROUPS
                            </div>
                        </div>
                        <div className="groupListDiv flex-container">
                            <div className="groupList flex-item flex-container">
                                {groupList1}
                            </div>
                        </div>
                    </div>
                )
                break;
            case 3:
                if (this.isMobile) {
                    subCategoryStyle = mobileFoucsStyle;
                } else {
                    subCategoryStyle = foucsStyle;
                }
                homaPageAddButtonVar = newSubCategoryButton;
                myWindow = (
                    <div key="categoryBox">
                        <div className="subCategorysTitle">
                            <div className="homePageGroupsSpaners">
                                SUB CATEGORIES
                            </div>
                        </div>
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
        let navBarStyle = {};
        if (this.isMobile) {
            navBarStyle.fontSize = '14px'
        }


        return (
            <div className="App" >

                <h1>Sci-Fare.com</h1>
                <div>
                    <ul className="homePageNavBarUL flex-container" style={navBarStyle} key="forthKey">
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

                    <div className="flex-container homePageWindow" id='homePageWindow'>
                        <div className="flex-container homePageWindowWrapper" style={windowStyle}>
                            <div
                                style={arrowStyle}
                                className="flex-item homePageArrow"
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

                                <i className="material-icons orangeArrows">keyboard_arrow_left</i>
                            </div>
                            <div className="flex-item windowBox ">
                                <ReactCSSTransitionReplace transitionName="carousel-swap"
                                    transitionEnterTimeout={300} transitionLeaveTimeout={300} style={{ width: '100%' }} >
                                    {myWindow}
                                </ReactCSSTransitionReplace>
                            </div>
                            {/*</TransitionMotion>*/}
                            <div
                                style={arrowStyle}
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
                                <i className="material-icons orangeArrows">keyboard_arrow_right</i>
                            </div>
                        </div>
                        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
                            {() => {
                                return <div className="flex-item homePageAddButton flex-container" id="homePageAddButton">
                                    {homaPageAddButtonVar}
                                </div>
                            }}
                        </Motion>
                    </div>
                </div>
            </div>
        )
    }
}
// HomeAdmin = Radium(HomeAdmin);
export default Radium(HomeAdmin);
