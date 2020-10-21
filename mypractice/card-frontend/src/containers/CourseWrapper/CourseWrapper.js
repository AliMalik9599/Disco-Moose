import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";

import classes from './CourseWrapper.css'
import Selection from "../Selection/Selection";

const courseViewEnum = {
    COURSESELECT: 0,
    SKILLSELECT: 1
}


class CourseWrapper extends Component {

    state = {
        courses: [],
        selectedSkills: [],
        view: courseViewEnum.COURSESELECT
    }

    handleCourseClick(e) {
        console.log("helloooo");
        this.setState({view: courseViewEnum.SKILLSELECT});
    }

    addSkill(skill) {

    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/courses/')
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
                view = <Selection />
                break;
        }
        return (
            <main>
                {view}
            </main>
        )
    }
}

export default CourseWrapper;