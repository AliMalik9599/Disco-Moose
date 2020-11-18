import React, {Component} from "react";
import { Box, withStyles, Button, Grid, Typography, Input, Container} from "@material-ui/core";

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

    handleChange = event => {
        event.preventDefault();
        this.str_url = '/rest-auth/login/';
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

    handleRegister = event => {
        this.setState({token: '0'});
        event.preventDefault();
        this.props.formClick(this.state.token);
        this.props.toRegistration();
    }

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

                                <div className={classes.center}>
                                    <Button className={classes.button} type="submit" value="Submit">Sign in</Button>
                                    <Button className={classes.button} onClick={this.handleRegister}>Register Here!</Button>
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