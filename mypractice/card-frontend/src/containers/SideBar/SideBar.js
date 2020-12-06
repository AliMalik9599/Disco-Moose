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



//export default function SideBar = ({parentSkill, parentCardsinDeck, parentCalender, parentHomePage, parentSettings, parentLogout}) => {
const SideBar = ({parentCourse, parentCalendar, parentSettings, parentLogout, parentView, parentCourseView, parentSkill}) => {


    const viewEnum = {
        ANIMATION: '0',
        LOGIN: '1',
        COURSE: '2',
        SELECTION: '3',
        REGISTRATION: '4',
        CALENDAR: '5',
        LANDING: '6'
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
        //shouldnt add skill selection or deck
       // {
       //     text: "See Calender",
       //     icon: <Today/>,
       //     onClick: () => parentCalendar()
       // },
       // {
       //     text: "Settings",
       //     icon: <Settings/>,
       //     onClick: () => parentSettings()
       // },
        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Logout", //text for the icon slot
            icon: <Input/>, //icon from material ui to be used in slot
            onClick: () => parentLogout() //where the slot takes you on click
        },
    ];


    const OnSkillSelect = [
        //shouldnt add skill selection or deck
        {
            text: "Course Select",
            icon: <Palette/>,
            onClick: () => parentCourse()
        },
       // {
       //     text: "See Calender",
       //     icon: <Today/>,
       //     onClick: () => parentCalendar()
       // },
       // {
       //     text: "Settings",
       //     icon: <Settings/>,
       //     onClick: () => parentSettings()
       // },
        {
            text: "Calendar", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Logout",
            icon: <Input/>,
            onClick: () => parentLogout()
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
            text: "Calender", //text for the icon slot
            icon: <Today/>, //icon from material ui to be used in slot
            onClick: () => parentCalendar() //where the slot takes you on click
        },
        {
            text: "Logout",
            icon: <Input/>,
            onClick: () => parentLogout()
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
            text: "Account Settings",
            icon: <Settings/>,
            onClick: () => parentSettings()
        },

        {
            text: "Logout",
            icon: <Input/>,
            onClick: () => parentLogout()
        }
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
            onClick: () => parentLogout()
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
        case viewEnum.LOGIN:
            Items = [];
            drawerAction = () => handleDrawerClose();
            break;
        case viewEnum.REGISTRATION:
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