import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import CardMedia from "@material-ui/core/CardMedia";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        backgroundColor: '#D2E4EE',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    }
}));

export default function CourseCard(props) {
    const [state, setState] = React.useState({
            showMore: false,
            favorited: props.is_favorited !== 'False',
        });
    const classes = useStyles();

    const handleExpandClick = (event) => {
        console.log(state.showMore);
        let update = false;
        if (!state.showMore) {
            update = true;
        }
        setState({ ...state, [event.target.name]: update });
        console.log(update);
    };
    
    const handleCompleteClick = (event) => {
        props.pressComplete(event, props.id);
    }

    const handleFavorite = (event) => {
        props.addToFavorites(event, props.id);
        state.favorited = !state.favorited;
    };

    if (window.localStorage.getItem('login')) {
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="card" className={classes.avatar}>
                            C
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={props.title}
                />
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    image="/static/images/cards/paella.jpg"*/}
                {/*    title="Paella dish"*/}
                {/*/>*/}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Course: {props.course} <br/>
                        Level: {props.level}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton className={classes.favorite}>
                        <FormControlLabel
                            control={<FavoriteIcon
                                // className={classes.favorite}
                                checked={props.is_favorited === 'True'}
                                onClick={handleFavorite}
                                name="favorited"
                                color={state.favorited ? 'secondary' : 'disabled' } />}
                        />
                    </IconButton>
                    <FormControlLabel
                        control={<Checkbox checked={props.is_complete === 'True'} onChange={handleCompleteClick} name="completed" />}
                        label="Completed"
                    />
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: state.showMore,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={state.showMore}
                        aria-label="show more"
                        name="showMore"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={state.showMore} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Nothing here for now but eventually we will want to add this.props.description or something
                            like that if it exists (will require a more robust dataset)
                        </Typography>
                        <Typography paragraph>
                            We can add another paragraph here if we want! Even more instructions
                        </Typography>
                        <Typography paragraph>
                            Room for yet ANOTHER paragraph! Material UI is really doing the most.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}