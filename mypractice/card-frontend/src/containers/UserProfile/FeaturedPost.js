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
});

export default function FeaturedPost(props) {
    const classes = useStyles();
    const { post } = props;



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const empty = [
        {
            name: 'Empty',
        },
    ];

    const courses = post.courses === undefined || post.courses.length === 0 ? empty : post.courses;

    return (
        <Grid item xs={12} md={6} onClick={post.button}>
                <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                    {post.title}
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    anchorReference={"none"}
                    classes={{
                        root: classes.popoverRoot,
                    }}
                >
                    <Typography className={classes.typography}>
                        {courses.map((item) => (
                            item["name"]
                        ))}
                    </Typography>
                </Popover>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};