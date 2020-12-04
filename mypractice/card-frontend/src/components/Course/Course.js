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
    pos: {
        marginBottom: 12,
    },
    button: {
        color: '#0e1428',
        backgroundColor: '#EE6C4D',
        margin: '5%',
        textAlign: 'center',
        width: '50%',
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: '12pt',
        "&:hover": {
            //color: '#EE6C4D',
            backgroundColor: '#345E83', //change this to color of nav bar
        },
    },
    actions: {
        //textAlign: 'center',
    },
});

export default function Course(props) {
    const classes = useStyles();

    if (window.localStorage.getItem('login')) {
        return (
            <Card raised="true" className={classes.root} variant="outlined">
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
                <div className={classes.actions}>

                    <Button className={classes.button} color="secondary" onClick={(e) => props.clickHandler(e, props.id)}>Let's Learn</Button>

                </div>
            </Card>

        );
    }
}