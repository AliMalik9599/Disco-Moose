import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Course(props) {
    const classes = useStyles();

    if (window.localStorage.getItem('login')) {
        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.description}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Number of skills in course: {props.num_skills}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Number of cards in course: {props.num_cards}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} variant="contained" color="secondary" size="small" onClick={(e) => props.clickHandler(e, props.id)}>Let's Learn</Button>
                </CardActions>
            </Card>
        );
    }
}