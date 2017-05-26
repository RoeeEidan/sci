import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';


class SingleHomeArticle extends Component {

    render() {
        // takes care of the button color
        let style = { backgroundColor: 'red' }
        let isGrouped = this.props.isGrouped(this.props.index);
        if (typeof (isGrouped) === 'object') {
            style = { backgroundColor: 'green' }
        }

        let button = (
            <Checkbox
                className="groupSingleHomeArticle"
                onChange={() => {
                    console.log(this.props.groupSingleArticle(this.props.index))
                }}
                label={this.props.name}
            />
        );
        if (this.props.isChecked) {
            button = (
                <Checkbox
                    defaultChecked
                    className="groupSingleHomeArticle"
                    onChange={() => {
                        console.log(this.props.groupSingleArticle(this.props.index))
                    }}
                    label={this.props.name}
                />
            );
        }



        return (
            <div className='SingleHomeArticle'>
                {button}
            </div>
        )
    }
}

export default SingleHomeArticle;