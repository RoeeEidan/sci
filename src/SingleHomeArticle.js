import React, { Component } from 'react';


class SingleHomeArticle extends Component {

    render() {
        return (
            <ul className='SingleHomeArticle flex-item flex-container'>
                <li className="flex-item articleButtons">
                    <img 
                    src="https://s3.amazonaws.com/roeetestbucket123/edit-flat.png"
                    height="25px"
                    width="25px"
                    onClick={() => { this.props.editSingleArticle(this.props.index) }}
                    />
                    
                    
                </li>
                <li className="singleFileName flex-item">
                    {this.props.name}
                </li>

                <li>
                    <img
                        height="25px"
                        width="25px"
                        src="https://s3.amazonaws.com/roeetestbucket123/redXbutton.jpg"
                        className="removeSingleHomeArticlee flex-item articleButtons"
                        onClick={() => { this.props.removeSingleArticle(this.props.index); }}
                    />

                </li>
            </ul>
        )
    }
}

export default SingleHomeArticle;