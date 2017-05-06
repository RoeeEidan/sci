import React, { Component } from 'react';


class SingleHomeArticle extends Component {

    render() {
        // takes care of the button color
        let style = { backgroundColor: 'red' }
        let isGrouped = this.props.isGrouped(this.props.index);
        let type = typeof (isGrouped);
        if (typeof (isGrouped) === 'object') {
            style = { backgroundColor: 'green' }
        }

        let button = (<button style={style} className="groupSingleHomeArticle" onClick={() => {
            this.props.groupSingleArticle(this.props.index, this.props.name)
        }
        }>
            group
                </button>);



        return (
            <ul className='SingleHomeArticle'>
                <li>
                    {button}
                </li>
                <li className="singleFileName">
                    {this.props.name}
                </li>

            </ul>
        )
    }
}

export default SingleHomeArticle;