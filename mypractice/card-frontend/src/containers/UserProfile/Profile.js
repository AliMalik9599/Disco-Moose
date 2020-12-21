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

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    root: {
        display: 'flex',
        '& > *': {
            marginLeft: theme.spacing(80),
            marginBottom: theme.spacing(5)
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
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
    //title: 'Disco Inferno',
    //description:
    //"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: Image,
    //imgText: 'main image description',
    //linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Courses You\'ve practiced',
    },
    {
        title: 'Cards You\'ve favorited',
    },
    {
        title: 'Guitar',
    },
    {
        title: 'Card 2',
    },
];

const posts = [post1];


const Profile = ({}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="User Profile"/>
                <main>
                    <div className={classes.root}>
                        <Avatar alt="Remy Sharp" src={require('./sickPick.jpeg')} className={classes.large} />
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

export default Profile;
