import React, {useState, useEffect} from "react";
import SkillList from "../../components/SkillList/SkillList";
import { makeStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const options = ['Select Practice Time', '5 minutes', '15 minutes', '30 minutes', '45 minutes', '1 hour'];

const useStyles = makeStyles((theme) => ({
    wrap: {
        textAlign: "center",
        flexDirection: "row",
        margin: "1%",
    },
    skillList: {

    },
    skillContainer: {
        alignItems: "center",
        alignContent: "center",
        width: "60%",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonGroup: {
        height: "100%",
    },
    done: {
        fontSize: '17pt',
        fontFamily: 'Montserrat',
        backgroundColor: '#EE6C4D',
        textAlign: 'center',
        width: '20%',
        height: '100%',
        marginLeft: '2%',
        "&:hover": {
            backgroundColor: '#345E83',
        }
    },
    selection: {
        marginTop: "2%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function Selection(props) {
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const classes = useStyles();

    // Handles user input for selecting the amount of practice time
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
        console.log(index);
    };


    // toggles time selector
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // handles button press for time selection
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        fetch(`/skills/${props.course}`, {
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
        // main display for "skill selection" page
        return (
          
            <Grid container className={classes.wrap}>
          
                {/* skill selection buttons, filled dynamically by available skills */}
                <Grid container item className={classes.skillContainer}>
                    <SkillList
                        className={classes.skillList}
                        skills={skills}
                        skillUpdate={props.skillUpdate}
                        token={props.token}
                    />
                </Grid>
          
                {/* dropdown button for time select */}

                <Grid container item direction="row">
                    <Container className={classes.selection}>
                        <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" ref={anchorRef} aria-label="split button" >
                            <Button> {options[selectedIndex]} </Button>
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
                        <Button className={classes.done} onClick={props.doneClick} >
                            Start
                        </Button>
                    </Container>
                </Grid>
            </Grid>

        );
    }
}