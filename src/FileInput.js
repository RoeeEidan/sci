import React from 'react';
import FileReaderInput from 'react-file-reader-input';
 
 
class FileInput extends React.Component {
  constructor(){
    super()

    this.handleChange =this.handleChange.bind(this);
  }
  handleChange(e, results){
    console.log("Runing")
    results.forEach(result => {
      console.log("for eachhhh")
      const [e, file] = result;
      // this.props.dispatch(uploadFile(e.target.result));
      // THIS IS WHERE ILL UPLOAD THE FILE
      console.log("e , result",e,  result)
      // console.log(`Successfully uploaded ${file.name}!`);
    });
  }
  render() {
    return (
      <form>
        <label htmlFor="uploadFilesFile">Upload a File:</label>
        <FileReaderInput as="binary" id="uploadFilesFile"
                         onChange={this.handleChange}>
          <button>Select a file!</button>
        </FileReaderInput>
      </form>
    );
  }
}

export default FileInput;