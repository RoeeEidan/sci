import React, { Component } from 'react';
import './App.css';

// Props
// GroupName is group name
// relatedArticles
// Index - its own index
// article


class SingleGroupArticle extends Component {

    render() {
        // takes care of the button color
        let style = { backgroundColor: 'red' };
        for (let i = 0; i < this.props.relatedArticles.length; i++) {
            if (this.props.relatedArticles[i].name === this.props.articleName) {
                style = { backgroundColor: 'green' }
            }
        }
        console.log(this);
        let that =this;

        return (
            <ul className='SingleHomeArticle'>
                <li>
                    <button style={style} className="groupSingleHomeArticle" onClick={() => {
                        that.props.groupSingleArticle(that.props.Index, that.props.articleName)
                    }
                    }>
                        group
                </button>
                </li>
                <li className="singleFileName">
                    {this.props.articleName}
                </li>

            </ul>
        )
    }
}

export default SingleGroupArticle;