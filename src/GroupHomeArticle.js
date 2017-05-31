import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';


class SingleHomeArticle extends Component {

    render() {
        // takes care of the button color
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