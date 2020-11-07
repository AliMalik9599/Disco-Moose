import React, {Component} from "react";
//import classes from './Login.module.css'
import classes from './Login2.module.css'
//import './Login.css'
//import { makeStyles } from '@material-ui/core/styles';
import {Box,withStyles, Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Input,Container} from "@material-ui/core";
import { useForm } from 'react-hook-form';

const styles = theme => ({

    main: {
        fontFamily: 'Montserrat',
    },

    buttonDiv: {
        color: '#293241',

        borderRadius: '5px',
        margin: '10px',
        //maxWidth: '70px',
        position: 'relative',
        //left: '35%',
        textAlign: 'center',
        //fontSize: '20pt',

        marginTop: '10%',
        //width: '290px',
        //height: '50px',
        //bottom: '10%',
        //padding: '5px',
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

    form: {
        //sizeX: '500px',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: '50pt',
        color: '#0e1428',
    },

    container: {
        backgroundColor: '#98C1D9',
        //topmargin: '20%',
        marginTop: '10%',
        borderRadius: '5px',
        //height: '200%',
       //width: '140%',
        //align: 'center',
        //position: 'absolute',

    },

    button: {
        fontSize: '17pt',
        fontFamily: 'Montserrat',
        backgroundColor: '#EE6C4D',

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

            <Box className={classes.main}>
                <div className={classes.Login}>
                    <Typography className={classes.title} align="center">My Practice</Typography>
                    <Grid container spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                         >
                        <Grid item xs={3}>
                            <Container className={classes.container}>
                            <form className={classes.form} onSubmit={this.handleChange}>
                                <div className={classes.banner}>
                                <Typography className={classes.formName}>Login</Typography>
                                </div>
                                <Input className={classes.input} placeholder="name" type="text" name="name" value={this.state.value} onChange={this.handleNameChange}/>

                                <Input className={classes.input} placeholder="username or email" type="text" name="username" value={this.state.value} onChange={this.handleEmailChange}/>

                                <Input className={classes.input} placeholder="password" id="password" type="text" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>

                                <div className={classes.buttonDiv}>
                                    <Button className={classes.button} type="submit" value="Submit" disableUnderLine={true}>Submit</Button>
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