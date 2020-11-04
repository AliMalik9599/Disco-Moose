import React, {Component} from "react";
import Skill from './Skill/Skill';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
//
// class SkillList extends Component {
//     state = {
//         title: 'SkillList'
//     }
//
//     handleSubmit() {
//         //TODO: send necessary information to backend
//     }
//
//     render() {
//         const skills = this.props.skills.map(skill => (
//             <Skill
//                 key={skill.id}
//                 id={skill.id}
//                 name={skill.name}
//                 description={skill.description}
//                 num_levels={skill.num_levels}
//                 num_cards={skill.num_cards}
//                 course={skill.course}
//                 skillUpdate={this.props.skillUpdate}
//                 token={this.props.token}
//             />
//         ));
//         return (
//             <div>
//                 {skills}
//             </div>
//         );
//     }
// }

