import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//COMPONENTS

import SingleFile from './Singlefile';

import { Button, Textfield, Checkbox, Switch, RadioGroup, Radio } from 'react-mdl';




class App extends Component {
  constructor() {
    super()
    this.state = {
      chosenCategory: '',
      summeryValue: false,
      titleValue: false,
    }
  }

  componentWillUnmount() {
    this.props.setLocation(false);
  }

  componentDidMount() {
    this.props.setLocation(true);
    if (this.props.path !== '/' && this.props.showAtHomePage) {
      // document.getElementById("homePageCheckbox").checked = true
    }
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
    for (let i = 0; i < ourSubCategorys.length; i++) {
      let Div = (
        <div className="singleSubCategoryDiv flex-item">
          <Checkbox
            id={ourSubCategorys[i]}
            onChange={() => { this.props.addSubCategory(i) }}
            label={ourSubCategorys[i]}
          />
        </div>
      )
      let checkedSubCategorys = this.props.ourSubCategorys || [];
      console.log('checkedSubCategorys', checkedSubCategorys)
      for (let z = 0; z < checkedSubCategorys.length; z++) {
        if (ourSubCategorys[i] === checkedSubCategorys[z]) {
          Div = (
            <div className="singleSubCategoryDiv flex-item">
              <Checkbox
                id={ourSubCategorys[i]}
                onChange={() => { this.props.addSubCategory(i) }}
                defaultChecked
              />
              {ourSubCategorys[i]}
            </div>
          )
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



    let heroList = this.props.heroObjects;
    let filesList = []
    for (let i = 0; i < heroList.length; i++) {
      let thisStyle = {}
      if(i % 2 === 0 ){
        thisStyle = {backgroundColor: 'rgba(239, 240 , 246 , 0.5)'}
      }
      filesList.push(
        <SingleFile
          style = {thisStyle}
          singleFileTitle={heroList[i].title}
          singleFileCredit={heroList[i].credit}
          singleFileName={heroList[i].url}
          onClick={() => {
            this.props.removeSingleHero(i);
          }}
        />
      )
    }

    return (
      <div className="App NewArticlePage" >
        <Link to="/">
          <Button primary className="backHome">Back Home</Button>
        </Link>
        <h1>New Article</h1>
        <div className="heroFilesWrapper flex-container">
          <div className="uploadFiles2 flex-item">
            <p>Upliad Files</p>
            <form id='uploadFilesForm' className="uploadFilesForm2 flex-container">
              <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
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
                  rows={1}
                  id='uploadFilesTitle'
                  className="uploadFilesTitleInput flex-item MDLTextfield"
                  label="Title..."
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
                  label="Credit..."
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
            <ul className='singleNewArticleFileBox flex-container'>
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
            label="Title.."
            rows={1}
            floatingLabel
            className="newArticleTitleInput flex-item"
            id='titleInput'
            onBlur={this.props.onTitleChange}
            onChange={() => { let text = document.getElementById("titleInput").value; this.setState({ titleValue: text }) }}
            value={this.state.titleValue || this.props.titleValue}
          />
        </div>
        <div className="summeryAndCategorysDiv flex-container">
          <div className="summerybox flex-item flex-container">
            <h2 className="flex-item">Summery</h2>
            <Textfield
              rows={10}
              className="newArticleSummeryTextArea flex-item"
              id='summeryInput'
              label="Summery.."
              floatingLabel
              onBlur={this.props.onSummeryChange}
              onChange={() => { let text = document.getElementById("summeryInput").value; this.setState({ summeryValue: text }) }}
              value={this.state.summeryValue || this.props.summeryValue}
            />
          </div>
          <div className="allCategorysDiv flex-item flex-container">
            {/*<div className="filler flex-item">

            </div>*/}
            <div className="homaPageAndCategory flex-item flex-container">
              <div className="showAtHomePageBox flex-item">
                <Switch
                  className="homePageCheckbox"
                  id='homePageCheckbox'
                  onChange={this.props.onHomePageChange}
                  checked={this.props.showAtHomePage}
                >
                  show at home page
                </Switch>
              </div>
              <div className="categoryBox flex-item">
                {/*<span>Category</span>*/}
                {/*<select id='categoryOptions' onChange={this.props.onCategoryChange}>
                  <option>Chose a Category</option>
                  <option value="Science">Science</option>
                  <option value="Health">Health</option>
                  <option value="Technology">Technology</option>
                </select>*/}
                <RadioGroup id='categoryOptions' onChange={this.props.onCategoryChange} container="ul" childContainer="li" name="demo2" value={this.props.category}>
                  <Radio value="Science">Science</Radio>
                  <Radio value="Health">Health</Radio>
                  <Radio value="Technology">Technology</Radio>
                </RadioGroup>

              </div>
            </div>
            {/*<h4 className="newArticleSubCategorysTitle">Sub Categorys</h4>*/}
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
          <Button className="publishButton" raised ripple ripple onClick={this.props.onPublishClick}>
            publish
          </Button>

          <Button className="saveButton" raised colored ripple className="saveToInProcess" onClick={this.props.saveToInProcess}>
            Save
        </Button>
        </div>

      </div>
    );
  }
}

export default App;
