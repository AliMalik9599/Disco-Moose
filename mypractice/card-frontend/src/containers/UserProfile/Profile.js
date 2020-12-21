import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import Logo from './discoball.jpeg';
import Simone from './simone.png';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        display: 'flex',
        '& > *': {
            marginLeft: theme.spacing(61),
            marginBottom: theme.spacing(5)
        },
    },
    small: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
    },
    buttonSize: {
        width: theme.spacing(15),
        height: theme.spacing(5),
    },
    buttonRoot: {
        display: 'flex',
        '& > *': {
            marginBottom: theme.spacing(2)
        },
    },
    cardDetails: {
        flex: 1,
    },
    name: {
        display: 'flex',
        '& > *': {
            marginLeft: theme.spacing(66),
            marginBottom: theme.spacing(5),
        },
    },
}));

const mainFeaturedPost = {
    image: Image,
};

const featuredPosts = [
    {
        id: 1,
        title: 'Courses You\'ve Practiced',
    },
    {
        id: 2,
        title: 'Cards You\'ve Favorited',
    },
];

export default function Profile(props) {
    const classes = useStyles();
    let courses = [];
    for (let i = 0; i < props.courses.length; i++) {
        courses.push(props.courses[i]["name"]);
    }
    const cards = []; //ultimately will get card list from props

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Let's Disco"/>
                <main >
                    <div className={classes.root}>
                        <Avatar alt="Remy Sharp" src={require('./sickPick.jpeg')} className={classes.large} alignItems="center" justify="center"/>
                    </div>
                    <div className={classes.name} >
                        <Typography component="h2" variant="h5">
                            Devin Ramsden
                        </Typography>
                    </div>
                    <Grid container spacing={5} direction="column" alignItems="center" justify="center" className={classes.buttonRoot}>
                        {featuredPosts.map(post => (
                            <FeaturedPost id={post.id} title={post.title} courses={courses} cards={cards}/>
                        ))}
                    </Grid>
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}

