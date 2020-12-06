import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Theme from '../../theme'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   root: {
       border: '1px solid Theme.palette.primary.main',
       backgroundColor: Theme.palette.primary.light
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
}));

/*
 * TODO: need to collect the String name associated with each cardID
 * It might be convenient here to gather all the card data and then map it to another
 * array or something  because we will need access to all the card data if the user
 * selects this specific schedule to repeat.
 */
const getCardNames =  (cards) => {
    const cardNames = [];
    let shorten = cards.replace('[{', '');
    shorten = shorten.replace(']}', '');
    const first_split = shorten.split('},{');
    for (let i = 0; i < first_split.length; i++) {
        const second_split = first_split[i].split(',');
        const title = second_split[1].split('":"')[1].replace('"', '');
        cardNames.push(title);
    }
    return cardNames;
}

/*
 * TODO: need to get the String name associated with the courseID
 */
const getCourseName = () => {
    const courseName = null;
    return courseName;
}

/*
 * TODO: need to get the String name associated with the courseID
 */
const getSkillNames = () => {
    const skillNames = null;
    return skillNames;
}

const getMonth = (month_num) => {
    switch (month_num) {
        case '1':
            return 'January';
        case '2':
            return 'February';
        case '3':
            return 'March';
        case '4':
            return 'April';
        case '5':
            return 'May';
        case '6':
            return 'June';
        case '7':
            return 'July';
        case '8':
            return 'August';
        case '9':
            return 'September';
        case '10':
            return 'October';
        case '11':
            return 'November';
        case '12':
            return 'December';
        default:
            return null;
    }
}

const transformDate = (date) => {
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
    const course = props.course;
    const skills = props.skills;
    const cards = props.cards;
    const card_names = getCardNames(cards);

    if (window.localStorage.getItem('login')) {
        return (
            <div className={classes.root}>
                <h3>{date}</h3>
                <h5>{"Course: " + course}</h5>
                <p>{"Skills: " + skills}</p>
                <p>{"Cards Practiced: " + card_names.toString()}</p>
                <Button className={classes.button} color="secondary" onClick={(e) => props.clickHandler(e, props.id, cards)}>Go</Button>
            </div>
        );
    }
}