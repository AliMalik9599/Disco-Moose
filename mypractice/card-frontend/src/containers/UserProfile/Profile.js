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
            marginLeft: theme.spacing(10),
            marginBottom: theme.spacing(5)
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

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
    image: Image,
};

const featuredPosts = [
    {
        title: 'Courses You\'ve practiced',
    },
    {
        title: 'Cards You\'ve favorited',
    },
];

//
// function getCourses() {
//     let courses = fetch('/courses/', {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': 'Token ' + window.localStorage.getItem('login')
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // courses = data;
//             return data;
//         })
//     // console.log('GOT COURSES ' + courses);
//     return courses;
// }

export default function Profile(props) {
    const classes = useStyles();
    const courses = props.courses;
    console.log(courses);
    const post = [post1];

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Let's Disco"/>
                <main>
                    <div className={classes.root}>
                        <Avatar alt="Remy Sharp" src={require('./sickPick.jpeg')} className={classes.large} />
                        </div>
                    <div className={classes.name}>
                        <Typography component="h2" variant="h5">
                            Devin Ramsden
                        </Typography>
                    </div>
                        <Grid container spacing={4}>
                            {featuredPosts.map((post) => (
                                <FeaturedPost key={post.title} post={post} />
                            ))}
                        </Grid>
                </main>
            </Container>
            <Footer />
        </React.Fragment>
);
}

