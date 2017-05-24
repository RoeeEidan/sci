import React, { Component } from 'react';
import { Button } from 'react-mdl';
// Radium lets you write react style
import Radium from 'radium';


class SingleHomeArticle extends Component {

    render() {
        let style = {}; //= {color: 'black' , ":hover":{color: "white"}}
        return (
            <ul className='SingleHomeArticle flex-item flex-container' style={this.props.style}>
                <li className="singleFileName flex-item">
                    {this.props.name}
                </li>
                {/*<li className="flex-item articleButtons">

                </li>*/}
                <li className="removeSingleHomeArticlee flex-item articleButtons">
                    <Button
                        primary
                        id="homeArticleEditButtonID"
                        style={style}
                        onClick={() => { this.props.editSingleArticle(this.props.index) }}
                    >
                        Edit
                    </Button>
                    <Button
                        accent

                        onClick={() => { this.props.removeSingleArticle(this.props.index); }}
                    >Remove</Button>
                </li>
            </ul>
        )
    }
}

export default Radium(SingleHomeArticle);