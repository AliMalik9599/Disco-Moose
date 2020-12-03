import React, {Component} from "react";
import {Avatar, Box,withStyles, Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Input,Container} from "@material-ui/core";
//import { useForm } from 'react-hook-form';

/* Styling to match Login page */
const styles = theme => ({

    main: {
        fontFamily: 'Montserrat',
    },

    center: {
        textAlign: 'center',

    },

    input: {
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
    },

    container: {
        borderColor: '#98C1D9',
        borderWidth: '3px',
        borderStyle: 'solid',
        minWidth: '100%',
        marginTop: '10%',
        borderRadius: '5px',
    },

    button: {
        fontSize: '17pt',
        fontFamily: 'Montserrat',
        backgroundColor: '#EE6C4D',
        margin: '5%',
        textAlign: 'center',
        width: '90%',
        "&:hover": {
            backgroundColor: '#345E83', //change this to color of nav bar
        },
    },



});

/** This class is directed from the login page
 *  to handle a new user sign up and authentication
 *  and redirects back to the login page once created.
 */
class Registration extends Component {

    // Information needed for user registration
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

    // Handles submission to register user
    handleChange = event => {
        event.preventDefault();

        // Authenticate both passwords match
        if (this.state.password.toString() !== this.state.confirm.toString()) {
            alert("Passwords do not match");
        } else {
            // Send information of new user to server
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
                    // Read response from server and act accordingly
                    if (data === 400) {
                        alert("Username already exists");
                    } else {
                        this.props.formClick(this.state.token);
                        // Redirect user to login page if success
                        this.props.toLogin();
                    }
                });
        }
    }

    // Save value inputted by user for name
    handleNameChange = event => {
        const value = event.target.value;
        this.setState({name: value});
    }

    // Save value inputted by user for username
    handleEmailChange = event => {
        const value = event.target.value;
        this.setState({username: value});
    }

    // Save value inputted by user for password
    handlePasswordChange = event => {
        const value = event.target.value;
        this.setState({password: value});
    }

    // Save value inputted by user for password confirmation
    handleConfirmPasswordChange = event => {
        const value = event.target.value;
        this.setState({confirm: value});
    }

    // Render form for user to complete
    render() {
        const { classes } = this.props;
        return (

            <Box className={classes.main}>
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

                                    <Input className={classes.input} placeholder="password" id="password" type="text" name="password" value={this.state.value} onChange={this.handlePasswordChange}/>

                                    <Input className={classes.input} placeholder="Confirm password" id="Confirm password" type="text" name="Confirm password" value={this.state.value} onChange={this.handleConfirmPasswordChange}/>

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

