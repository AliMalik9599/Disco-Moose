import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";
import Selection from "../Selection/Selection";
import Deck from "../Deck/Deck";

const courseViewEnum = {
    COURSESELECT: 0 | null,
    SKILLSELECT: 1,
    DECK: 2
}

const course_view = {
    'main': 'CourseWrapper',
    'subpage': 'CourseSelect'
}

const skill_view = {
    'main': 'CourseWrapper',
    'subpage': 'SkillSelect'
}

const deck_view = {
    'main': 'CourseWrapper',
    'subpage': 'Deck'
}


class CourseWrapper extends Component {
    constructor(props) {
        super(props);
        this.selectedSkills = [];
        this.selectedTime = 0;
    }

    state = {
        courses: [],
        skills: [],
        selectedCourse: 0,
        time: 0,
        // view: courseViewEnum.COURSESELECT
        view: JSON.parse(window.localStorage.getItem('view'))['subpage']
    }

    handleCourseClick(e, value) {
        window.localStorage.setItem('view', JSON.stringify(skill_view));
        this.setState({
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            selectedCourse: value
        });
    }

    skillSelection(e, skill) {
        if (this.selectedSkills.indexOf(skill) !== -1) {
            this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
        } else {
            this.selectedSkills.push(skill); //does not trigger a re-render
        }
    }

    handleDonePress() {
        window.localStorage.setItem('view', JSON.stringify(deck_view));
        this.setState({
            skills: this.selectedSkills,
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            time: this.selectedTime
        });
    }

    timeSelection(e, time) {
        this.selectedTime = time;
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/courses/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + this.props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data});
            });
    }

    render() {
        let view = null;
        console.log(JSON.parse(window.localStorage.getItem('view')));
        switch (this.state.view) {
            // case courseViewEnum.COURSESELECT:
            case 'CourseSelect':
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
            // case courseViewEnum.SKILLSELECT:
            case 'SkillSelect':
                // window.localStorage.setItem('view', JSON.stringify(skill_view));
                console.log('local storage : ' + window.localStorage.getItem('view'));
                console.log('state view: ' + this.state.view);
                view = <Selection skills={this.state.skills}
                                  skillUpdate={this.skillSelection.bind(this)}
                                  doneClick={this.handleDonePress.bind(this)}
                                  course={this.state.selectedCourse}
                                  token={this.props.token}
                                  time={this.timeSelection.bind(this)}
                />
                break;
            // case courseViewEnum.DECK:
            case 'Deck':
                // window.localStorage.setItem('view', JSON.stringify(deck_view));
                console.log('local storage : ' + window.localStorage.getItem('view'));
                console.log('state view: ' + this.state.view);
                view = <Deck courseid={this.state.selectedCourse}
                             skills={this.state.skills}
                             token={this.props.token}
                />
        }
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