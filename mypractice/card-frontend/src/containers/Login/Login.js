import React, {Component} from "react";
import classes from './Login.module.css'
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            token: ''
        };
        this.str_url = "";
    }

    handleChange = event => {
        event.preventDefault();
        this.str_url = 'http://127.0.0.1:8000/rest-auth/login/';
        fetch(this.str_url, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username.toString(),
                password: this.state.password.toString()
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json())
            .then(data => {
                if(!data.key) {
                    alert("Incorrect Username or Password");
                } else {
                    this.setState({token: data.key})
                    alert("Correct Username or Password");
                    this.props.formClick(this.state.token);
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
                    <h1>My Practice</h1>

                    <form onSubmit={this.handleChange}>
                        <h2>Login</h2>
                        <input className={classes.name} placeholder="name" type="text" name="name" value={this.state.value} onChange={this.handleNameChange}/>

                        <input className={classes.username} placeholder="username or email" type="text" name="username" value={this.state.value} onChange={this.handleEmailChange}/>

                        <input className={classes.username} placeholder="password" id="password" type="text" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>

                        <div className={classes.button}>
                            <input className={classes.submit} type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;