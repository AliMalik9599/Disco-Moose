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
import Image from './discoPeeps.jpeg';
import Logo from './discoball.jpeg';
import Simone from './simone.png';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
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
        title: 'What is Disco?',
        description:
            'Have you ever wanted to learn something new, but didn\'t know where to start? You\'re not alone! Disco provides you with a collection of tasks in the' +
            ' form of cards to improve your skills. All you need to do is login to disco and checkout your tasks for the day.',
    },
    {
        title: 'Meet Simone',
        description:
            'Simone is a college athlete that uses disco to plan her daily workout schedule. \"Rather than worrying about what I should do, disco provides me with a ' +
            ' list of skills to improve on, so I only need to worry about mastering each one!\"',
        image: Simone
    },
];

const posts = [post1];


const Landing = ({toLogin, toRegistration}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Welcome to Disco!" toLogin={toLogin.bind(this)} toRegistration={toRegistration.bind(this)}/>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
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

export default Landing;
