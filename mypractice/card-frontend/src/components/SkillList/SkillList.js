import React, {Component} from "react";
import Skill from './Skill/Skill';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function SkillList(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
    }));

    const [state, setState] = React.useState({
        title: 'SkillList'
    });

    const classes = useStyles();
    const skills = props.skills.map(skill => (
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
    ));

    return (
        <FormGroup>
            {skills}
        </FormGroup>
    );
}

