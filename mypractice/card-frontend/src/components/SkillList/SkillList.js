import React from "react";
import Skill from './Skill/Skill';
import { makeStyles, } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import {Container, Box}from '@material-ui/core';
import {ConfirmationNumber} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: "row",
        justifyContent: "center",
    },
    main: {
        display: "inline-flex",
        flexDirection: "row",
        padding: 0,
    },
    box: {

    }
}));

export default function SkillList(props) {

    const [state, setState] = React.useState({
        title: 'SkillList'
    });

    const classes = useStyles();

    const skills = props.skills.map(skill => (
       <Box className={classes.box}>
        <Container className={classes.main}>
            <Skill
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
        </Container>
       </Box>

    ));

    if (window.localStorage.getItem('login') && JSON.parse(window.localStorage.getItem('view'))['subpage'] === 'SkillSelect') {
        return (
            // wraps skills in FormGroup which will be displayed on Selection
            <FormGroup className={classes.root}>
                {skills}
            </FormGroup>
        );
    }
}

