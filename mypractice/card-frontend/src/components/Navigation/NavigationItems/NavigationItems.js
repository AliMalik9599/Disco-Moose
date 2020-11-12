import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Courses</NavigationItem>
        <NavigationItem link="/" logout={props.logout}>Log Out</NavigationItem>
        <NavigationItem link="/" /*active*/>Cards</NavigationItem>
    </ul>
);

export default navigationItems;