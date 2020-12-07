import React, {Component} from "react";
//import classes from './Login.module.css'
//import classes from './Login2.module.css'
//import './Login.css'
//import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box,withStyles, Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Input,Container} from "@material-ui/core";
import { useForm } from 'react-hook-form';
import CssBaseline from "@material-ui/core/CssBaseline";
import Logo from "../Landing/discoball.jpeg";

const styles = theme => ({

    main: {
        fontFamily: 'Montserrat',
    },

    center: {
        //color: '#293241',
        //borderRadius: '5px',
        //margin: '10px',
        //position: 'relative',
        //textAlign: 'center',
        //marginTop: '10%',
        textAlign: 'center',

    },

    input: {
        //textAlign: 'center',
        margin: '10px',
        color: '#0e1428',
        fontSize: '20px',
        padding: '5px',
        width: '90%',
    },

    formName: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '35pt',
        color: '#0e1428',
    },

    logo: {
        justify: 'center',
        width: '15%',
        height: '15%',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: '40pt',
        color: '#0e1428',
        //marginTop: '15%'
    },

    container: {
        borderColor: '#98C1D9',
        borderWidth: '3px',
        borderStyle: 'solid',
        minWidth: '100%',
        marginTop: '10%',
        borderRadius: '5px',
        //height: '',
    },

    button: {
        fontSize: '17pt',
        fontFamily: 'Montserrat',
        backgroundColor: '#EE6C4D',
        margin: '5%',
        textAlign: 'center',
        width: '90%',
        "&:hover": {
            //color: '#EE6C4D',
            backgroundColor: '#345E83', //change this to color of nav bar
        },
    },



});

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            confirm: '',
            token: ''
        };
        this.str_url = "";
    }
    //classes = useStyles();

    handleChange = event => {
        event.preventDefault();
        if (this.state.password.toString() !== this.state.confirm.toString()) {
            alert("Passwords do not match");
        } else {
            console.log("position 1");
            console.log(this.state.username);
            this.str_url = '/register/' + this.state.username;
            fetch(this.str_url, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name.toString(),
                    username: this.state.username.toString(),
                    password: this.state.password.toString()
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.status)
                .then(data => {
                    console.log(data)
                    if (data === 400) {
                        alert("Username already exists");
                    } else {
                        console.log("position 2")
                        this.props.formClick(this.state.token);
                        this.props.toLogin();
                    }
                });
        }
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

    handleConfirmPasswordChange = event => {
        const value = event.target.value;
        this.setState({confirm: value});
    }

    render() {
        const { classes } = this.props;
        return (
        <Box className={classes.main}>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Avatar src = {Logo} className={classes.large} />
                    <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={this.props.goLogout}>
                        Home
                    </Button>
                </Toolbar>
            </AppBar>
                <div className={classes.Login}>
                    <div className={classes.center}>
                        <img className={classes.logo} src={require("./bulb-logo.png")} alt="disco logo"/>
                    </div>
                    <Typography className={classes.title} align="center">Sign in to Disco</Typography>
                    <Grid container spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                    >
                        <Grid item xs={3}>
                            <Container className={classes.container}>
                                <form className={classes.form} onSubmit={this.handleChange}>

                                    <Input className={classes.input} placeholder="name" type="text" name="name" value={this.state.value} onChange={this.handleNameChange}/>

                                    <Input className={classes.input} placeholder="username or email" type="text" name="username" value={this.state.value} onChange={this.handleEmailChange}/>

                                    <Input className={classes.input} placeholder="password" id="password" type="password" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>

                                    <Input className={classes.input} placeholder="Confirm password" id="Confirm password" type="password" name="Confirm password" value={this.state.value} onChange={this.handleConfirmPasswordChange}/>

                                    <div className={classes.center}>
                                        <Button className={classes.button} type="submit" value="Submit">Sign Up</Button>
                                    </div>
                                </form>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        );

    }
}

export default withStyles(styles)(Registration);

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