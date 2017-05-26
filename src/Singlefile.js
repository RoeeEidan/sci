import React, { Component } from 'react';
import { Button } from 'react-mdl';

// Radium lets you write react style
import Radium from 'radium';


class SingleFile extends Component {
    constructor() {
        super()
        this.isMobile;
    }


    componentWillMount() {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.isMobile = isMobile;
    }

    render() {
        let containerVsRow = 'flex-container';
        let itemVsCol2 = 'flex-item';
        let itemVsCol3 = 'flex-item';
        let itemVsCol4 = 'flex-item';
        if (this.isMobile) {
            containerVsRow = ''//'row';
            itemVsCol2 = ''//'col-md-2 col-sm-2';
            itemVsCol3 = ''//'col-md-3 col-sm-3';
            itemVsCol4 = ''//col-md-4 col-sm-4';
        }
        return (
            <div className="singleFileWrapper">
                <ul key={`${this.props.singleFileNam}`} className={`singleFileBox ${containerVsRow}`} style={this.props.style || {}}>
                    <li className={`singleFileName ${itemVsCol2}`}>
                        <figure>
                            <img
                                src={this.props.singleFileName}
                                className='homePageSingleImage' />
                        </figure>
                    </li>
                    <li className={`singleFileTitle ${itemVsCol4}`}>
                        {this.props.singleFileTitle}
                    </li>
                    <li className={`singleFileCredit ${itemVsCol3}`}>
                        {this.props.singleFileCredit}
                    </li>
                    <li className={`removeSingleFile  ${itemVsCol2}`} onClick={this.props.onClick}>
                        <Button
                            accent>
                            <i className="material-icons">clear</i>
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Radium(SingleFile);