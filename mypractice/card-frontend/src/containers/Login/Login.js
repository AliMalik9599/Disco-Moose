import React, {Component} from "react";
import classes from './Login.module.css'

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    handleChange = event => {
        // when the user clicks submit, load Deck component
        // might have to send that info back to the Layout component but idk how
    }

    handleNameChange = event => {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmailChange = event => {
        const value = event.target.value;
        this.setState({email: value});
    }

    handlePasswordChange = event => {
        const value = event.target.value;
        this.setState({password: value});
    }

    render() {
        return (
            <main>
                <div className={classes.Login}>
                    <form onSubmit={this.props.changeLayoutState}>
                        <label htmlFor="name">Name:
                            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/>
                        </label>
                        <label htmlFor="email">E-mail:
                            <input type="email" name="email" value={this.state.value} onChange={this.handleEmailChange}/>
                        </label>
                        <label htmlFor="password">Password:
                            <input type="text" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>
                        </label>
                        <div className={classes.button}>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;