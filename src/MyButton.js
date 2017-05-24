import React, { Component } from 'react';

import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';
import 'ladda/dist/ladda.min.css';

class MyButton extends Component {
  constructor() {
    super()
    this.state = { loading: false };

    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      loading: !this.state.loading,
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: !this.state.loading,
        });
      }, this.props.miliSeconds)
    })
  }

  render() {
    
    return (
      <LaddaButton
        loading={this.state.loading}
        onClick={()=>{
          this.toggle();
          if(this.props.onClick){
            this.props.onClick();
          }
          }}
        data-color="#222"
        data-size={XL}
        data-style={SLIDE_UP}
        data-spinner-size={30}
        data-spinner-color="#000"
        data-spinner-lines={12}
      >
        Add
      </LaddaButton>
    );
  }
};

export default MyButton;
