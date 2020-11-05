import React, {Component} from "react";
//import classes from './Login.module.css'
import classes from './Login2.module.css'
//import './Login.css'
//import { makeStyles } from '@material-ui/core/styles';
import {Box,withStyles, Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Input,Container} from "@material-ui/core";
import { useForm } from 'react-hook-form';

const styles = theme => ({
    Main:  {

    },
    container: {
        //background: '#B4BED0'
    },
    Form: {
        color: '#98C1D9',
        //margin
    },

    name: {
        color: 'red',
    },

    username: {

    },

    password: {

    },

    button: {

    },

    submit: {
        color: '#293241',
        backgroundColor: '#EE6C4D',
        borderRadius: '5px',
        positionX: '100px',
    },


});

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
    //classes = useStyles();

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
        const { classes } = this.props;
        return (

            <Box className={classes.Main}>
                <div className={classes.Login}>
                    <Typography align="center">My Practice</Typography>
                    <Grid container spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                         >
                        <Grid item xs={3}>
                            <form className={classes.Form} onSubmit={this.handleChange}>
                                <Typography>Login</Typography>
                                <Input className={classes.name} placeholder="name" type="text" name="name" value={this.state.value} onChange={this.handleNameChange}/>

                                <Input className={classes.username} placeholder="username or email" type="text" name="username" value={this.state.value} onChange={this.handleEmailChange}/>

                                <Input className={classes.username} placeholder="password" id="password" type="text" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>

                                <div className={classes.button}>
                                    <Input className={classes.submit} type="submit" value="Submit" disableUnderLine={true}/>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        );



    }
}

export default withStyles(styles)(Login);

/*
export default function Login(props) {

    const [state, setState] = React.useState({
        name: '',
        username: '',
        password: '',
        token: ''
    });

    const [url, setUrl] = React.useState({
        str_url: "",
    });

    const classes = useStyles();
    /*
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

    //classes = useStyles();

    const handleChange = event => {
        event.preventDefault();
        url.str_url = 'http://127.0.0.1:8000/rest-auth/login/';
        fetch(url.str_url, {
            method: 'POST',
            body: JSON.stringify({
                username: state.username.toString(),
                password: state.password.toString()
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json())
            .then(data => {
                if(!data.key) {
                    alert("Incorrect Username or Password");
                } else {
                    setState({token: data.key})
                    alert("Correct Username or Password");
                    props.formClick(state.token);
                }
            });
    }

    const handleNameChange = event => {
        const value = event.target.value;
        setState({name: value});
    }

    const handleEmailChange = event => {
        const value = event.target.value;
        setState({username: value});
    }

    const handlePasswordChange = event => {
        const value = event.target.value;
        setState({password: value});
    }

        return (
            <main>
                <div className={classes.Login}>
                    <h1>My Practice</h1>

                    <form onSubmit={handleChange}>
                        <h2>Login</h2>
                        <Input className={classes.name} placeholder="name" type="text" name="name" value={state.name} onChange={handleNameChange}/>

                        <Input className={classes.username} placeholder="username or email" type="text" name="username" value={state.username}onChange={handleEmailChange}/>

                        <Input className={classes.password} placeholder="password" id="password" type="text" name="password" value={state.password} onChange={handlePasswordChange}/>

                        <div className={classes.button}>
                            <button className={classes.submit} type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </main>
        );

}
*/