import React, { Component } from 'react';
import './App.css';


class SingleHomeArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGrouped: false
        }
        this.checkIfGrouped = this.checkIfGrouped.bind(this);
    }

    checkIfGrouped(index, category, groupButtonStyle) {
        let isGrouped = groupButtonStyle(index, category); // checks if grouped
        if (typeof isGrouped === 'number') {
            this.setState({
                isGrouped: true,
            })
        } else {
            this.setState({
                isGrouped: false,
            })
        }
    }


    componentWillMount(props) {
        if (this.props.groupSingleArticle) {
            let isGrouped = this.props.groupButtonStyle(this.props.index, this.props.category); // checks if grouped
            if (typeof isGrouped === 'number') {
                this.setState({
                    isGrouped: true,
                })
            } else {
                this.setState({
                    isGrouped: false,
                })
            }
        }
    }
    render() {
        let button = (<button className="removeSingleHomeArticlee" onClick={() => { this.props.removeSingleArticle(this.props.index) }}>
            remove
                </button>);

        return (
            <ul className='SingleHomeArticle'>
                <li>
                    {button}
                </li>
                <li>    
                    <button onClick={() => { this.props.editSingleArticle(this.props.index) }}>
                        Edit
                    </button>
                </li>
                <li className="singleFileName">
                    {this.props.name}
                </li>

            </ul>
        )
    }
}

export default SingleHomeArticle;