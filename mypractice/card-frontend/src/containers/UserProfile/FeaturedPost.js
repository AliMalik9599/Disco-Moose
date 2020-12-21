import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Simone from './simone.png';
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    popoverRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        minWidth: 275,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
    },
    title: {
        fontSize: 25,
    },
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    const courses = props.courses;
    const cards = props.cards;

    const courseList = courses.map((item) => (
        <Card raised={true} className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {item + '\n'}
                </Typography>
            </CardContent>
        </Card>
    ));

    const cardList = []; //TBD what the favorited cards will look like

    let view = null;
    if (props.id === 1) {
       view = courseList
    } else if (props.id === 2) {
        view = cardList;
    }

    return (
        <Grid item xs={12} md={6}>
            <div className={classes.root}>
                {props.title}
            </div>
            <div>
                {view}
            </div>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};


// const { post } = props;

// const [anchorEl, setAnchorEl] = React.useState(null);
//
// const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
// };
//
// const handleClose = () => {
//     setAnchorEl(null);
// };
//
// const open = Boolean(anchorEl);
// const id = open ? 'simple-popover' : undefined;
//
// const empty = [
//     {
//         name: 'Empty',
//     },
// ];

{/*<Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>*/}
{/*    {props.title}*/}
{/*</Button>*/}
{/*<Popover*/}
{/*    id={id}*/}
{/*    open={open}*/}
{/*    anchorEl={anchorEl}*/}
{/*    onClose={handleClose}*/}
{/*    anchorOrigin={{*/}
{/*        vertical: 'bottom',*/}
{/*        horizontal: 'center',*/}
{/*    }}*/}
{/*    transformOrigin={{*/}
{/*        vertical: 'top',*/}
{/*        horizontal: 'center',*/}
{/*    }}*/}
{/*    anchorReference={"none"}*/}
{/*    classes={{*/}
{/*        root: classes.popoverRoot,*/}
{/*    }}*/}
{/*>*/}
{/*    <Typography className={classes.typography}>*/}
{/*        {courses.map((item) => (*/}
{/*            item + '\n'*/}
{/*        ))}*/}
{/*    </Typography>*/}
{/*</Popover>*/}