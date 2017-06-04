import React, { Component } from 'react';
import { Button } from 'react-mdl';
// Radium lets you write react style
import Radium from 'radium';


class SingleHomeArticle extends Component {

    render() {
        return (
            <ul className='SingleHomeArticle flex-item flex-container' style={this.props.style}>
                <li className="singleFileName flex-item">
                    {this.props.name}
                </li>
                <li className="removeSingleHomeArticlee flex-item articleButtons">
                    <Button
                        primary
                        id="homeArticleEditButtonID"
                        onClick={() => { this.props.editSingleArticle(this.props.index) }}
                    >
                        <i className="material-icons">edit</i>
                    </Button>
                    <Button
                        accent
                        onClick={() => { this.props.removeSingleArticle(this.props.index); }}
                    ><i className="material-icons">clear</i></Button>
                </li>
            </ul>
        )
    }
}

export default Radium(SingleHomeArticle);