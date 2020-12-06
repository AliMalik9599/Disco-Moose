import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    box: {
        border: 1,
        backgroundColor: '#D2E4EE',
        padding: '5% 25%',
        textAlign: 'center',
        margin: 5,
        borderRadius: '10px',
    }
}));

export default function Skill(props) {
    const [state, setState] = React.useState({
        ticked: false
    });

    // toggles check upon button press
    const handleChange = (event) => {
        if(!ticked) {
            setState({...state, ticked: true});
        } else {
            setState({...state, ticked: false});
        }
    };

    const { ticked } = state;

    const classes = useStyles();

    return (
        <FormControlLabel
            className={classes.box}
            control={<Checkbox checked={ticked} onClick={(e) => props.skillUpdate(e, props.id)} onChange={handleChange} name="checked"/>}
            label={props.name}
        />
        // fills form group on SkillList component
    );
}
