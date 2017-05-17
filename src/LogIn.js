import React, { Component } from 'react';




class LogIn extends Component {
    render() {
        //counter
        console.log(this.props.counter)
        let loginVarButton = "🤗";
        if (this.props.counter > 0) {
            loginVarButton = "🙂"
        }
        if (this.props.counter > 1) {
           loginVarButton = "😶"
        }
        if (this.props.counter > 2) {
            loginVarButton = "😐"
        }
        if (this.props.counter > 3) {
            loginVarButton = "😠"
        }
        if (this.props.counter > 4) {
            loginVarButton = "😡"
        }


        return (
            <div className="logInBody">
                {this.props.logInMassage}
                <div>
                    <input
                        type="password"
                        id="logInPasswordInput"
                    />
                </div>
                <div
                    className="loginButton"
                    onClick={this.props.onLogInClick}
                >
                    {loginVarButton}
                </div>

            </div>
        )
    }
}

export default LogIn;