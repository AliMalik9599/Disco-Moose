import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
}));

export default function Skill(props) {
    const [state, setState] = React.useState({
        ticked: false
    });

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
        <FormControl className="skill task-wrapper">
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={ticked} onClick={(e) => props.skillUpdate(e, props.id)} onChange={handleChange} name="checked"/>}
                    label={props.name}
                />
            </FormGroup>
        </FormControl>
    );
}



//
// class Skill extends Component {
//     render() {
//         return(
//             <div className="skill task-wrapper" onClick={(e) => this.props.skillUpdate(e, this.props.id)}>
//                 <div className="skill-header d-flex justify-content-between">
//                     <span>
//                         <strong>Name:</strong>{this.props.name} <br/>
//                         <strong>Description: </strong>{this.props.description}<br/>
//                         <strong>Number of Levels: </strong>{this.props.num_levels}<br/>
//                         <strong>Number of Cards: </strong>{this.props.num_cards}<br/>
//                         <strong>Course: </strong>{this.props.course}<br/>
//                     </span>
//                 </div>
//                 <div className="skill-body">
//                     {this.props.description}
//                 </div>
//             </div>
//         );
//     }
//
// }