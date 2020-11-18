import React, {useState, useEffect} from "react";
import SkillList from "../../components/SkillList/SkillList";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const options = ['Select Practice Time', '5 minutes', '15 minutes', '30 minutes', '45 minutes', '1 hour'];

export default function Selection(props) {
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        switch (index) {
            case 0:
                // need to figure out how to make this not an option for submitting
                // ex: they can't press Done unless selected time is not index 0
                props.time(event, 0);
                break;
            case 1:
                props.time(event, 5);
                break;
            case 2:
                props.time(event, 15);
                break;
            case 3:
                props.time(event, 30);
                break;
            case 4:
                props.time(event, 45);
                break;
            case 5:
                props.time(event, 60);
                break;
            default:
                break;
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/skills/${props.course}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkills(() => data);
            });
    }, [props]);

    if (window.localStorage.getItem('login') === props.token) {
        return (
            <main className="d-flex flex-column align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <h1>Please select the skills you would like to practice</h1>
                    <SkillList
                        skills={skills}
                        skillUpdate={props.skillUpdate}
                        token={props.token}
                    />
                </div>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                            <Button /*onClick={handleClick}*/>{options[selectedIndex]}</Button>
                            <Button
                                color="primary"
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList id="split-button-menu">
                                                {options.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                </Grid>
                <button onClick={props.doneClick} style={{backgroundColor:"orange"}}>
                    Done
                </button>
            </main>
        );
    }
}

// class Selection extends Component {
//     state = {
//         skills: []
//     };
//
//     componentDidMount() {
//         fetch(`http://127.0.0.1:8000/skills/${this.props.course}`, {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'Authorization': 'Token ' + this.props.token
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({skills: data});
//             });
//     }
//
//     render() {
//         return (
//             <main className="d-flex flex-column align-items-center">
//                 <div className="d-flex flex-column align-items-center">
//                     <h1>Select which skills you would like to practice.</h1>
//                     <SkillList
//                         skills={this.state.skills}
//                         skillUpdate={this.props.skillUpdate}
//                         token={this.props.token}
//                     />
//                 </div>
//                 <button onClick={this.props.doneClick}>
//                     Done
//                 </button>
//             </main>
//         )
//     }
// }
//
// export default Selection;