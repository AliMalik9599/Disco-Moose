import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
// import CardMedia from "@material-ui/core/CardMedia";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Theme from '../../theme';
import { Container, Grid } from '@material-ui/core';

/* Styling for individual cards */
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        backgroundColor: '#D2E4EE',
        //fontColor: 'red',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        image: require("./images/guitar.png"),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: Theme.palette.primary.main,
    },
    favorite: {
        textAlign: 'center',
    },
    body: {
        fontFamily: 'Montserrat',
        fontSize: '15pt',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: '20pt',
        textAlign: 'justified',
    },


    /*
    header:  {
        fontFamily: 'Montserrat',
        fontSize: '18pt',
        fontColor: 'red',
    },

     */
}));

/* Card component built using MaterialUI framework.
 * Card information is received through props.
 */
export default function CourseCard(props) {

    // set states for expansion and is_favorited
    const [state, setState] = React.useState({
            showMore: false,
            favorited: props.is_favorited !== 'False',
        });
    const classes = useStyles();

    const heartTheme = createMuiTheme({
        props: {
            // Name of the component
            MuiButtonBase: {
                // The properties to apply
                disableRipple: true // No more ripple, on the whole application!
            },
        },
    });

    const toggleTheme = createMuiTheme({
        overrides: {
            MuiIconButton: {
                label: {
                    pointerEvents: 'none',
                }
            }
        }
    });



    // expand card to show more content
    const handleExpandClick = (event) => {
        let update = false;
        if (!state.showMore) {
            update = true;
        }
        setState({ ...state, [event.target.name]: update });
    };

    // handle press on completed checkbox
    const handleCompleteClick = (event) => {
        props.pressComplete(event, props.id);

        if(props.is_complete === 'True') {
            {/* send time completed to database */}
            {/* update time completed */}
        }
    }

    // handle click on favorite icon
    const handleFavorite = (event) => {
        props.addToFavorites(event, props.id);
        state.favorited = !state.favorited;

    };

    // Display the date of last completion on card
    function dateToString(props) {
        if (props.last_completed != null) {
            d = (props.last_completed).toString();
        }
        else {
            d = "Never";
        }

        return d;
    }

    function renderImage() {
        if (props.image_path !== "") {
            var path_str = (props.image_path).toString();
            return (
                <CardMedia
                    className={classes.media}
                    style={{height: 0, paddingTop: '56.25%'}}
                    image={require("./images/" + path_str)}
                />
            )
        }
    }

    function renderLink() {
        if (props.link !== "") {
            return (
                <Typography className={classes.body} variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{
                    __html: props.link}}>
                </Typography>
            )
        }
    }

    // if the user is logged in, display the card
    if (window.localStorage.getItem('login')) {
        var d = dateToString(props);
       // var d = 2;
        return (

            <Container>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="card" className={classes.avatar} src={require("./images/guitar.png")}></Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={
                        <Typography className={classes.title}> {props.title} </Typography>
                    }
                />
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    image="/static/images/cards/paella.jpg"*/}
                {/*    title="Paella dish"*/}
                {/*/>*/}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>Course: </b> {props.course} <br/>
                        <b>Skill: </b> {props.skill}
                    </Typography>
                </CardContent>
                <CardContent>
                     <Typography className={classes.body} variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{
                         __html: props.content}}>
                     </Typography>
                </CardContent>
                <CardContent>
                    {renderImage()}
                </CardContent>
                <CardContent>
                    <Typography  variant="body2" color="textSecondary" component="p">
                        <b>Last Completed: </b> { d }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <MuiThemeProvider theme={heartTheme}>
                        <IconButton className={classes.favorite}>
                            <FavoriteIcon
                                    // className={classes.favorite}
                                    checked={props.is_favorited === 'True'}
                                    onClick={handleFavorite}
                                    name="favorited"
                                    color={state.favorited ? 'secondary' : 'disabled' }
                            />
                        </IconButton>
                    </MuiThemeProvider>
                    <FormControlLabel
                        control={<Checkbox checked={props.is_complete === 'True'} onChange={handleCompleteClick} name="completed" />}
                        label="Completed"
                    />
                    <MuiThemeProvider theme={toggleTheme}>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: state.showMore,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={state.showMore}
                            aria-label="show more"
                            name="showMore"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </MuiThemeProvider>
                </CardActions>
                <Collapse in={state.showMore} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph className={classes.body} variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{
                            __html: props.description}}>
                        </Typography>
                        {renderLink()}
                    </CardContent>
                </Collapse>
            </Card>
            </Container>
        );
    }
}