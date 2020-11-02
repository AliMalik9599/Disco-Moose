import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";

import classes from './CourseWrapper.css'
import Selection from "../Selection/Selection";
import Deck from "../Deck/Deck";

const courseViewEnum = {
    COURSESELECT: 0,
    SKILLSELECT: 1,
    DECK: 2
}


class CourseWrapper extends Component {
    constructor(props) {
        super(props);
        this.selectedSkills = [];
    }

    state = {
        courses: [],
        skills: [],
        selectedCourse: 0,
        view: courseViewEnum.COURSESELECT
    }

    handleCourseClick(e, value) {
        this.setState({
            view: courseViewEnum.SKILLSELECT,
            selectedCourse: value
        });
    }

    addSkill(e, skill) {
        this.selectedSkills.push(skill); //does not trigger a re-render
    }

    handleDonePress() {
        this.setState({
            skills: this.selectedSkills,
            view: courseViewEnum.DECK
        });
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/courses/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b9836F45E23A345'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data});
            });
    }

    render() {
        let view = null;
        switch(this.state.view) {
            case courseViewEnum.COURSESELECT:
                view = (<div className="div">
                            <h1 className="h1">What would you like to work on today?</h1>
                            <div className="d-flex justify-content-center">
                                <CourseList courses={this.state.courses}
                                            clickHandler={this.handleCourseClick.bind(this)}
                                />
                            </div>
                        </div>)
                break;
            case courseViewEnum.SKILLSELECT:
                view = <Selection skills={this.state.skills}
                                  skillUpdate={this.addSkill.bind(this)}
                                  doneClick={this.handleDonePress.bind(this)}
                />
                break;
            case courseViewEnum.DECK:
                view = <Deck courseid={this.state.selectedCourse}
                             skills={this.state.skills}
                />
        }
        return (
            <main>
                {view}
            </main>
        )
    }
}

export default CourseWrapper;