import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/">Account</NavigationItem>
        <NavigationItem link="/">Settings</NavigationItem>
        <NavigationItem link="/" active>Cards</NavigationItem>
        <NavigationItem link="/">My Decks</NavigationItem>
        <NavigationItem link="/">Calendar</NavigationItem>

    </ul>
);

export default navigationItems;