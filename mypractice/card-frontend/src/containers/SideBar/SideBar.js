import React, {Component} from "react";
import {Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    CssBaseline
} from '@material-ui/core';

import CardList from "../../components/CardList/CardList";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SportsHandball from '@material-ui/icons/SportsHandball';
import Today from '@material-ui/icons/Today';
import Settings from '@material-ui/icons/Settings';
import Input from '@material-ui/icons/Input';
import Palette from '@material-ui/icons/Palette';
import HomeIcon from '@material-ui/icons/Home';



const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));



//export default function SideBar = ({parentSkill, parentCardsinDeck, parentCalender, parentHomePage, parentSettings, parentHome}) => {
const SideBar = ({parentCourse, parentCalendar, parentSettings, parentHome, parentView, parentCourseView, parentSkill, parentLanding}) => {


    const viewEnum = {
        ANIMATION: '0',
        LOGIN: '1',
        COURSE: '2',
        SELECTION: '3',
        REGISTRATION: '4',
        CALENDAR: '5',
        LANDING: '6',
        WELCOME: '7',
        PROFILE: '8'
    }


    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    var drawerAction;

    //OnCourseList
    const OnCourseList = [

        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Home", //text for the icon slot
            icon: <HomeIcon/>, //icon from material ui to be used in slot
            onClick: () => parentHome() //where the slot takes you on click
        },
        {
            text: "Logout", //text for the icon slot
            icon: <Input/>, //icon from material ui to be used in slot
            onClick: () => parentLanding() //where the slot takes you on click
        },

    ];


    const OnSkillSelect = [
        //shouldnt add skill selection or deck
        {
            text: "Course Select",
            icon: <Palette/>,
            onClick: () => parentCourse()
        },

        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Home",
            icon: <HomeIcon/>,
            onClick: () => parentHome()
        },
        {
            text: "Logout", //text for the icon slot
            icon: <Input/>, //icon from material ui to be used in slot
            onClick: () => parentLanding() //where the slot takes you on click
        },
    ];

    const OnCards = [

        {
            text: "Course Select",
            icon: <Palette/>,
            onClick: () => parentCourse()
        },

        {
            text: "Skill Select",
            icon: <SportsHandball/>,
            onClick: () => parentSkill()
        },
        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Home",
            icon: <HomeIcon/>,
            onClick: () => parentHome()
        },
        {
            text: "Logout", //text for the icon slot
            icon: <Input/>, //icon from material ui to be used in slot
            onClick: () => parentLanding() //where the slot takes you on click
        },
    ];


    //Side bar options on Calendar
    const OnCalendar = [

        {
            text: "Course Select",
            icon: <Palette/>,
            onClick: () => parentCourse()
        },

        {
            text: "Home",
            icon: <HomeIcon/>,
            onClick: () => parentHome()
        },
        {
            text: "Logout", //text for the icon slot
            icon: <Input/>, //icon from material ui to be used in slot
            onClick: () => parentLanding() //where the slot takes you on click
        },
    ];


    const AccountSettings = [

        {
            text: "Course Select",
            icon: <Palette/>,
            onClick: () => parentCourse()
        },

        {
            text: "See Calendar",
            icon: <Today/>,
            onClick: () => parentCalendar()
        },
        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Logout",
            icon: <Input/>,
            onClick: () => parentHome()
        },
    ];

    let Items = [];

    //Switch that controls what Side Bar view is showing
    switch (parentView) {
        case viewEnum.COURSE: //course
            if (parentCourseView === '1') {
                Items = OnSkillSelect;
                drawerAction = () => handleDrawerOpen();
                break;
            }
            else if (parentCourseView === '2') {
                Items = OnCards;
                drawerAction = () => handleDrawerOpen();
                break;
            }
            else {
                Items = OnCourseList;
                drawerAction = () => handleDrawerOpen();
                break;
            }
        case viewEnum.CALENDAR:
            Items = OnCalendar;
            drawerAction = () => handleDrawerOpen();
            break;
        case viewEnum.SETTINGS:
            Items = AccountSettings;
            drawerAction = () => handleDrawerOpen();
            break;
        default:
            Items = [];
            drawerAction = () => handleDrawerClose();
            break;
    }


    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={drawerAction}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>

            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {Items.map((item, index) => {
                        const { text, icon, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </div>
    );

}
export default SideBar;