import React, { Component } from 'react';


class SingleHomeArticle extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         isGrouped: false
    //     }
    //     this.checkIfGrouped = this.checkIfGrouped.bind(this);
    // }

    // checkIfGrouped(index, category, groupButtonStyle) {
    //     let isGrouped = groupButtonStyle(index, category); // checks if grouped
    //     if (typeof isGrouped === 'number') {
    //         this.setState({
    //             isGrouped: true,
    //         })
    //     } else {
    //         this.setState({
    //             isGrouped: false,
    //         })
    //     }
    // }


    // componentWillMount(props) {
    //     if (this.props.groupSingleArticle) {
    //         let isGrouped = this.props.groupButtonStyle(this.props.index, this.props.category); // checks if grouped
    //         if (typeof isGrouped === 'number') {
    //             this.setState({
    //                 isGrouped: true,
    //             })
    //         } else {
    //             this.setState({
    //                 isGrouped: false,
    //             })
    //         }
    //     }
    // }
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