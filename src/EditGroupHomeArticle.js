import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';


class SingleGroupArticle extends Component {
    render() {
        let didFind = false;
        for (let i = 0; i < this.props.relatedArticles.length; i++) {
            if (this.props.relatedArticles[i].name === this.props.articleName) {
                didFind = true;
                break;
            }
        }
        if (!didFind) {
            return (
                <div className='SingleHomeArticle' key={`${this.props.articleName}`}>
                    <Checkbox
                        onClick={() => {
                            this.props.groupSingleArticle(this.props.Index, this.props.articleName)
                        }}
                        label={`${this.props.articleName}`}
                        
                    />
                </div>
            )
        } else {
            return (
                <div className='SingleHomeArticle' key={`${this.props.articleName}`}>
                    <Checkbox
                        onClick={() => {
                            this.props.groupSingleArticle(this.props.Index, this.props.articleName)
                        }}
                        label={`${this.props.articleName}`}
                        checked={true}
                    />
                </div>
            )
        }    
    }
}

export default SingleGroupArticle;