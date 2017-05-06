import React, { Component } from 'react';
import { Redirect , Link } from 'react-router-dom';

//COMPONENTS

import SingleFile from './Singlefile';



class App extends Component {

  componentDidMount() {
    if (this.props.path !== '/') {
      document.getElementById("homePageCheckbox").checked = true
    }
  }

  // componentWillUpdate(nextProps, nextState){
  //   console.log(this.props.showAtHomePage, nextProps.showAtHomePage)
  //   if(this.props.showAtHomePage !== nextProps.showAtHomePage ){
  //     return false
  //   }else{
  //     return true
  //   }
  // }

  render() {
    if (this.props.path === '/') {
      this.props.pathTo();
      return (<Redirect to='/' />)
    }
    
    let subCategorysRender1 = [];
    let subCategorysRender2= [];
    let subCategorysRender3 = [];
    let ourSubCategorys = this.props.subCategorys || [];
    for (let i = 0; i < ourSubCategorys.length; i++) {
      if( i < (ourSubCategorys.length/3)){
        subCategorysRender1.push(
          <div className="singleSubCategoryDiv flex-item">
            {ourSubCategorys[i]}
            <input type="checkbox" onChange={() => { this.props.addSubCategory(i) }} />
          </div>
      );
      }else if( i >= (ourSubCategorys.length/3) && i < ((ourSubCategorys.length/3)*2)){
        subCategorysRender2.push(
          <div className="singleSubCategoryDiv flex-item">
            {ourSubCategorys[i]}
            <input type="checkbox" onChange={() => { this.props.addSubCategory(i) }} />
          </div>
      );
      }else if( i >= ((ourSubCategorys.length/3)*2) ){
        subCategorysRender3.push(
          <div className="singleSubCategoryDiv flex-item">
            {ourSubCategorys[i]}
            <input type="checkbox" onChange={() => { this.props.addSubCategory(i) }} />
          </div>
      );
      }else{
        alert("Check App.js at line 52")
      }
    }
    if(ourSubCategorys.length % 3){
      let counter = ourSubCategorys.length;
       subCategorysRender3.push(
          <div className="singleSubCategoryDiv flex-item">
          </div>
      );
      counter --;
      if(counter){
        subCategorysRender2.push(
          <div className="singleSubCategoryDiv flex-item">
          </div>
      )
      }
    }



    let heroList = this.props.heroObjects;
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
      <div className="App" >
        <Link to="/">
        <input type="button" value="Back Home" className="backHome"/>
        </Link>
        <h1>New Article</h1>
        <div className="heroFilesWrapper flex-container">
            <div className="uploadFiles flex-item">
              <p>Upliad Files</p>
                <form id='uploadFilesForm' className="uploadFilesForm flex-container">
                  <input
                    className="flex-item uploadInput"
                    id='uploadFilesFile'
                    type="file"
                    accept="image/video"
                  />
                  <p>
                    Title: <textarea  rows="2" type='text' id='uploadFilesTitle' className="uploadFilesTitleInput flex-item" />
                  </p>
                  <p>
                    Credit: <textarea rows="2" type='text' id='uploadFilesCredit' className="uploadFilesCreditInput flex-item"/>
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
        <h2 className="newArticleTitle">Title</h2>
        <div className="titlebox flex-container">
          <input
            className="newArticleTitleInput flex-item"
            id='titleInput'
            type='text'
            value={this.props.titleValue}
            onChange={this.props.onTitleChange}
          />
        </div>
        <div className="summeryAndCategorysDiv flex-container">
          <div className="summerybox flex-item flex-container">
            <h2 className="flex-item">Summery</h2>
            <textarea
              className="newArticleSummeryTextArea flex-item"
              id='summeryInput'
              type='text'
              value={this.props.summeryValue}
              onChange={this.props.onSummeryChange}
            />
          </div>
          <div className="allCategorysDiv flex-item flex-container">
            <div className="filler flex-item">
            
            </div>
            <div className="homaPageAndCategory flex-item flex-container">
              <div className="showAtHomePageBox flex-item">
                <span>show at home page:</span>
                <input
                  id='homePageCheckbox'
                  type="checkbox"
                  className="homePageCheckbox"
                  onChange={this.props.onHomePageChange}
                />
              </div>
              <div className="categoryBox flex-item">
                <span>Category</span>
                <select id='categoryOptions' onChange={this.props.onCategoryChange}>
                  <option>Chose a Category</option>
                  <option value="Science">Science</option>
                  <option value="Health">Health</option>
                  <option value="Technology">Technology</option>
                </select>
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
      </div>
    );
  }
}

export default App;
