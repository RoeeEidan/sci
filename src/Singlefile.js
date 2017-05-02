import React, { Component } from 'react';


class SingleFile extends Component {
    render(){
        return(
            <ul className='singleFileBox flex-container'>
                <li className="singleFileName flex-item">
                    {this.props.singleFileName}
                </li>
                <li className="singleFileTitle flex-item">
                    {this.props.singleFileTitle}
                </li>
                <li className="singleFileCredit flex-item">
                    {this.props.singleFileCredit}
                </li>
                <button className="removeSingleFile flex-item" onClick={this.props.onClick}>
                    remove
                </button>
            </ul>
        )
    }
}

export default SingleFile;