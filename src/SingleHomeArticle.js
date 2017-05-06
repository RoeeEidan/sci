import React, { Component } from 'react';


class SingleHomeArticle extends Component {

    render() {
        return (
            <ul className='SingleHomeArticle flex-item flex-container'>
                <li className="flex-item articleButtons">    
                    <button onClick={() => { this.props.editSingleArticle(this.props.index) }}>
                        Edit
                    </button>
                </li>
                 <li className="singleFileName flex-item">
                    {this.props.name}
                </li>
                 
                <li>
                    <button className="removeSingleHomeArticlee flex-item articleButtons" onClick={() => { this.props.removeSingleArticle(this.props.index); }}>
                        remove
                    </button>
                </li>
            </ul>
        )
    }
}

export default SingleHomeArticle;