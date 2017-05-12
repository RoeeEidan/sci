import React, { Component } from 'react';


class SingleFile extends Component {
    render() {
        return (
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
                <li className="removeSingleFile flex-item">
                    <img
                        src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                        height="25px"
                        width="25px"
                        onClick={this.props.onClick}
                    />
                </li>
            </ul>
        )
    }
}

export default SingleFile;