import React, { Component } from 'react';
import './App.css';


class SingleFile extends Component {
    render(){
        return(
            <ul className='singleFileBox'>
                <li className="singleFileName">
                    {this.props.singleFileName}
                </li>
                <li className="singleFileTitle">
                    {this.props.singleFileTitle}
                </li>
                <li className="singleFileCredit">
                    {this.props.singleFileCredit}
                </li>
                <button className="removeSingleFile" onClick={this.props.onClick}>
                    remove
                </button>
            </ul>
        )
    }
}

export default SingleFile;