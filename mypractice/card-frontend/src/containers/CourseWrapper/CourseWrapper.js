import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";
import Selection from "../Selection/Selection";
import Deck from "../Deck/Deck";
import "./CourseWrapper.css";
import {Box, withStyles, Button, Grid, Typography, Input, Container} from "@material-ui/core";

// dictionary representing course selection view
const course_view = {
    'main': 'CourseWrapper',
    'subpage': 'CourseSelect'
}

// dictionary representing skill selection view
const skill_view = {
    'main': 'CourseWrapper',
    'subpage': 'SkillSelect'
}

// dictionary representing card (deck) view
const deck_view = {
    'main': 'CourseWrapper',
    'subpage': 'Deck'
}

/* CourseWrapper components handles the display of the
 * flow of the user's selection from course selection to
 * skill selection to the deck.
 */
class CourseWrapper extends Component {
    constructor(props) {
        super(props);
        this.selectedSkills = [];
        this.selectedTime = 0;
    }

    // collect state values from locals storage so if page is refreshed
    // all data is not lost
    state = {
        courses: JSON.parse(window.localStorage.getItem('courses')),
        skills: JSON.parse(window.localStorage.getItem('skills')),
        selectedCourse: JSON.parse(window.localStorage.getItem('selectedCourse')),
        time: JSON.parse(window.localStorage.getItem('time')),
        view: JSON.parse(window.localStorage.getItem('view'))['subpage']
    }

    // handler for selecting a course
    handleCourseClick(e, value) {
        // set values for state as well as local storage
        window.localStorage.setItem('view', JSON.stringify(skill_view));
        window.localStorage.setItem('selectedCourse', value);
        this.setState({
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            selectedCourse: value
        });
        this.props.viewToSkills();
    }

    // handler for skill selection (does not trigger state change)
    skillSelection(e, skill) {
        if (this.selectedSkills.indexOf(skill) !== -1) {
            this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
        } else {
            this.selectedSkills.push(skill); //does not trigger a re-render
        }
    }

    // handler for user clicked the "done" button
    handleDonePress() {
        // set necessary local storage and state values
        window.localStorage.setItem('view', JSON.stringify(deck_view));
        window.localStorage.setItem('skills', JSON.stringify(this.selectedSkills));
        window.localStorage.setItem('time', this.selectedTime)
        this.setState({
            skills: this.selectedSkills,
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            time: this.selectedTime
        });
        this.props.viewToDeck();
    }

    // Update selected time from drop down menu
    timeSelection(e, time) {
        this.selectedTime = time;
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
    }

    // conditionally render correct view
    render() {
        let view = null;
        if (this.props.courseReset) {
            this.state.view = 'CourseSelect';
            this.setState({token: this.state.token});
            this.props.resetToCourse();
            this.props.viewToCourse();
        }
        else if (this.props.skillReset) {
            this.state.view = 'SkillSelect';
            this.setState({token: this.state.token});
            this.props.resetToSkill();
            this.props.viewToSkills();
        }
        switch(this.state.view) {
            case 'CourseSelect': // display course selection
            window.localStorage.setItem('view', JSON.stringify(course_view));
                view = (<div className="div">
                    <h1 className="h1">What would you like to work on today?</h1>
                    <div className="d-flex justify-content-center">
                        <CourseList courses={this.state.courses}
                                    clickHandler={this.handleCourseClick.bind(this)}
                                    token={this.props.token}
                        />
                    </div>
                </div>)
                break;
            case 'SkillSelect': // display skill selection
                window.localStorage.setItem('view', JSON.stringify(skill_view));
                view =
                    (<div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: '30pt',
                                color: '#0e1428',
                                marginTop: "7%",
                                marginBottom: "2%",

                            }}
                        >
                            Which skills would you like to practice today?
                        </Typography>
                        <Selection skills={this.state.skills}
                                      skillUpdate={this.skillSelection.bind(this)}
                                      doneClick={this.handleDonePress.bind(this)}
                                      course={this.state.selectedCourse}
                                      token={this.props.token}
                                      time={this.timeSelection.bind(this)}
                        />
                    </div>)
                break;
            case 'Deck': // display cards
                if (JSON.parse(window.localStorage.getItem('cards')) === null) {
                    window.localStorage.setItem('cards', JSON.stringify([]));
                }
                view =
                    (<div
                        style={{
                            textAlign: "center",
                            //alignContent: "center",
                            //alignItems: "center",
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "40pt",
                                textAlign: 'center',
                                color: '#0e1428',
                                marginTop: '7%',
                                marginBottom: '1%',
                            }}
                        >
                            Today's Practice
                        </Typography>
                        <Deck courseid={this.state.selectedCourse}
                                 skills={this.state.skills}
                                 token={window.localStorage.getItem('login')}
                                 time={this.state.time}
                        />
                    </div>)
        }
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

export default CourseWrapper;
