import React from "react";
import Skill from './Skill/Skill';
import { makeStyles, } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 345,
    },
    formControl: {
        margin: theme.spacing(4),
    },

    main: {
        //display: "inline-flex",
        //justifyContent: 'evenly-spaced',
        //alignItems: "center",
        //alignContent: 'center',
        //flexFlow: "row wrap",
        margin: "1%",
        width: "20%",
       // textAlign: "left",
       // width: "200%",
    },
    interior: {
        //fontSize: '100pt',
    }
}));

export default function SkillList(props) {

    const [state, setState] = React.useState({
        title: 'SkillList'
    });

    const classes = useStyles();

    const skills = props.skills.map(skill => (
        <Grid container className={classes.main}>
            <Skill
                className={classes.interior}
                key={skill.id}
                id={skill.id}
                name={skill.name}
                description={skill.description}
                num_levels={skill.num_levels}
                num_cards={skill.num_cards}
                course={skill.course}
                skillUpdate={props.skillUpdate}
                token={props.token}
            />
        </Grid>
    ));

    if (window.localStorage.getItem('login') && JSON.parse(window.localStorage.getItem('view'))['subpage'] === 'SkillSelect') {
        return (
            // wraps skills in FormGroup which will be displayed on Selection
            <FormGroup>
                {skills}
            </FormGroup>
        );
    }
}

