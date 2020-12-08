import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    box: {
        border: 1,
        backgroundColor: '#D2E4EE',
        padding: '5% 25%',
        borderRadius: '10px',
        width: "150%",
    },
    font: {
        fontSize: '20pt',
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
        // fills form group on SkillList component

            <FormControlLabel
                className={classes.box}
                control={<Checkbox checked={ticked} onClick={(e) => props.skillUpdate(e, props.id)} onChange={handleChange} name="checked"/>}
                label={
                    <Typography className={classes.font}>
                        {props.name}
                    </Typography>
                }
            />


    );
}
