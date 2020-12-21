import React, {Component} from "react";
import Profile from '../UserProfile/Profile'
import {Box, withStyles, Button, Grid, Typography, Input, Container} from "@material-ui/core";

/* ProfileInfo components handles the display of the
 * flow of the user's selection from course selection to
 * skill selection to the deck.
 */
class ProfileInfo extends Component {
    constructor(props) {
        super(props);
    }

    // collect state values from locals storage so if page is refreshed
    // all data is not lost
    state = {
        courses: JSON.parse(window.localStorage.getItem('courses')),
        view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
        favorites: JSON.parse(window.localStorage.getItem('favorites'))
    }

    // Retrieve data from from server
    componentDidMount() {
        fetch('/courses/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + window.localStorage.getItem('login')
            }
        })
            .then(response => response.json())
            .then(data => {
                window.localStorage.setItem('courses', JSON.stringify(data));
                this.setState({courses: data});
            });

        fetch(`favorites/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + window.localStorage.getItem('login')
            }
        }).then(response => response.json())
            .then(data => {
                window.localStorage.setItem('favorites', JSON.stringify(data));
                this.setState({favorites: data});
                console.log(JSON.stringify(data));
            });
    }

    // conditionally render correct view
    render() {
        let view = null;
        // window.localStorage.setItem('view', JSON.stringify(course_view));
        view = (<Profile courses={this.state.courses}/>);
        // Only display content if user is logged in
        if (window.localStorage.getItem('login')) {
            return (
                <main>
                    {view}
                </main>
            )
        }
    }
}

export default ProfileInfo;
