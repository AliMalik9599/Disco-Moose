import React, {Component} from "react";
import classes from './Login.module.css'

class Login extends Component {
    state = {
        name: '',
        username: '',
        password: '',
    };
    str_url;

    handleChange = event => {
        event.preventDefault();
        this.str_url = 'http://127.0.0.1:8000/user/' + this.state.name.toString() + '/' + this.state.username.toString() + '/' + this.state.password.toString() + '/';
        fetch(this.str_url)
            .then(response => response.json())
            .then(data => {
                // TODO(Issue #16): Write to screen if login was successful.
                if (this.state.name === data.name && this.state.username === data.username && this.state.password === data.password) {
                    console.log('Password/username is correct');
                    // TODO(Issue #17): Change page / render new component (should be the categories page).
                } else {
                    console.log('Password/username is incorrect');
                }
            });
    }

    handleNameChange = event => {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmailChange = event => {
        const value = event.target.value;
        this.setState({username: value});
    }

    handlePasswordChange = event => {
        const value = event.target.value;
        this.setState({password: value});
    }

    render() {
        return (
            <main>
                <div className={classes.Login}>
                    <form onSubmit={this.handleChange}>
                        <label htmlFor="name">Name:
                            <input type="text" name="name" value={this.state.value} onChange={this.handleNameChange}/>
                        </label>
                        <label htmlFor="username">E-mail:
                            <input type="text" name="username" value={this.state.value} onChange={this.handleEmailChange}/>
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