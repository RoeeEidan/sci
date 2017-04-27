import React, { Component } from 'react';
import './App.css';

//COMPONENTS

import SingleFile from './Singlefile';



class App extends Component {

  
  componentDidMount() {
    document.getElementById("homePageCheckbox").checked = true
  }
  componentWillMount() {
    console.log(this.props)
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.titleValue !== nextProps.titleValue){
  //     return false
  //   }
  // }

  render() {
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
            {/*let newState = {...this.state};
            newState.newArticle.heroObjects.splice(i,1);
            this.setState({
              newArticle: newState.newArticle
            })*/}
           }}
        />
      )
    }
    return (
      <div className="App" >
        <h1>NEW ARTICAL</h1>
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
          List of Files
          {filesList}
        </div>
        <div className="titlebox">
          <h2>title</h2>
          <input
            id='titleInput'
            type='text'
            value={this.props.titleValue}
            onChange={this.props.onTitleChange}
          />
        </div>
        <div className="summerybox">
          <h2>Summery</h2>
          <input
            id='summeryInput'
            type='text'
            value={this.props.summeryValue}
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
        <div className="categoryBox">
          <h3>Category</h3>
          <select id='categoryOptions' onChange={this.props.onCategoryChange}>
            <option>Chose a Category</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <div className="articleBodyBox" >
          <h2>artical Body</h2>
          {this.props.editor}
        </div>
        <div className="publish">
          <button onClick={()=>{
            this.props.onPublishClick();
            let newState = {...this.state};
            newState.newArticle.heroObjects = [];
            this.setState({
              newArticle: newState.newArticle,
            })
            }}>
            publish
          </button>
        </div>
      </div>
    );
  }
}

export default App;
