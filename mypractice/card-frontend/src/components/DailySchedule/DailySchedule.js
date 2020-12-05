//import React from "react";
//import {makeStyles} from "@material-ui/core/styles";
//import Theme from '../../theme'
//import Button from '@material-ui/core/Button';
//
//const useStyles = makeStyles((theme) => ({
//    root: {
//        border: '1px solid Theme.palette.primary.main',
//        backgroundColor: Theme.palette.secondary.light,
//    },
//    button: {
//        color: '#0e1428',
//        backgroundColor: '#EE6C4D',
//        margin: '5%',
//        textAlign: 'center',
//        width: '50%',
//        fontFamily: 'Montserrat',
//        fontWeight: '700',
//        fontSize: '12pt',
//        "&:hover": {
//            //color: '#EE6C4D',
//            backgroundColor: '#345E83', //change this to color of nav bar
//        },
//    },
//}));

/*
 * TODO: need to collect the String name associated with each cardID
 * It might be convenient here to gather all the card data and then map it to another
 * array or something  because we will need access to all the card data if the user
 * selects this specific schedule to repeat.
 */
const getCardNames =  () => {
    const cardNames = null;
    return cardNames;
}

/*
 * TODO: need to get the String name associated with the courseID
 */
const getCourseName = () => {
    const courseName = null;
    return courseName;
}

const getMonth = (month_num) => {
    switch (month_num) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return null;
    }
}

const transformDate = (date) => {
    //format YYYY-MM-DD
    const year = date.split('-')[0];
    const month_num = date.split('-')[1];
    const month = getMonth(month_num);
    const day = date.split('-')[2];

    return month + ' ' + day + ', ' + year;
}

/* DailySchedule to display content from specific day */
export default function DailySchedule(props) {
    const classes = useStyles();
    const date = transformDate(props.date);
    const course = getCourseName(props.course_id);
    const cards = getCardNames(props.card_ids);
    // TODO: create a list of the card names (called card_names)

    if (window.localStorage.getItem('login')) {
        return (
            <div className={classes.root}>
                <h3>{date}</h3>
                <p>{course}</p>
                <p>{card_names}</p>
                <Button className={classes.button} color="secondary" onClick={(e) => props.clickHandler(e, props.deck_id, cards)}>Go</Button>
            </div>
        );
    }
}