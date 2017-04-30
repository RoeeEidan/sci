import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SingleFile from './Singlefile';

import './App.css';


class NewGroup extends Component {

    componentDidMount() {
        if (this.props.path !== '/') {
            document.getElementById("homePageCheckbox").checked = true
        }
    }

    render() {

        if (this.props.path === '/') {
            this.props.pathTo();
            return (<Redirect to='/' />)
        }


        let subCategorysRender = [];
        let ourSubCategorys = this.props.subCategorys
        for (let i = 0; i < ourSubCategorys.length; i++) {
            subCategorysRender.push(
                <div>
                    {ourSubCategorys[i]}
                    <input type="checkbox" onChange={() => { this.props.groupAddSubCategory(i) }} />
                </div>
            );
        }


        const articlesList = this.props.arrayToRender(this.props.allArticles);

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
                <h1> New Group </h1>
                <div>
                    ARTICLES
                   {articlesList}
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
                            <input type="button" value="Submit" onClick={this.props.onUploadFilesFormSubmit} />
                        </p>
                    </form>
                </div>
                <div>
                    List of Files
                        {filesList}
                </div>
                <div className="titlebox">
                    <h2>title</h2>
                    <input
                        id='titleInput'
                        type='text'
                        onChange={this.props.onTitleChange}
                    />
                </div>
                <div className="summerybox">
                    <h2>Summery</h2>
                    <input
                        id='summeryInput'
                        type='text'
                        onChange={this.props.onSummeryChange}
                    />
                </div>
                <div className="showAtHomePageBox">
                    <h4>show at home page:</h4>
                    <input
                        id='homePageCheckbox'
                        type="checkbox"
                        className="homePageCheckbox"
                        onChange={this.props.onHomePageChange}
                    />
                </div>
                <div>
                    <p>Sub Categorys</p>
                    {subCategorysRender}
                </div>
                <div className="articleBodyBox" >
                    <h2>artical Body</h2>
                    {this.props.editor}
                </div>
                <div className="publish">
                    <button onClick={this.props.onPublishClick}>
                        publish
                    </button>
                </div>
            </div >

        )
    }
}

export default NewGroup;

