import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";
import Selection from "../Selection/Selection";
import Deck from "../Deck/Deck";

// const courseViewEnum = {
//     COURSESELECT: 0 | null,
//     SKILLSELECT: 1,
//     DECK: 2
// }
//realone
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
        // courses: [],
        // skills: [],
        // selectedCourse: 0,
        // time: 0,
        // view: courseViewEnum.COURSESELECT
        courses: JSON.parse(window.localStorage.getItem('courses')),
        skills: JSON.parse(window.localStorage.getItem('skills')),
        selectedCourse: JSON.parse(window.localStorage.getItem('selectedCourse')),
        time: JSON.parse(window.localStorage.getItem('time')),
        view: JSON.parse(window.localStorage.getItem('view'))['subpage']
    }

    handleCourseClick(e, value) {
        window.localStorage.setItem('view', JSON.stringify(skill_view));
        window.localStorage.setItem('selectedCourse', value);
        this.setState({
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            selectedCourse: value
        });
        this.props.viewToSkills();
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
        window.localStorage.setItem('skills', JSON.stringify(this.selectedSkills));
        window.localStorage.setItem('time', this.selectedTime)
        this.setState({
            skills: this.selectedSkills,
            view: JSON.parse(window.localStorage.getItem('view'))['subpage'],
            time: this.selectedTime
        });
        this.props.viewToDeck();
    }

    timeSelection(e, time) {
        this.selectedTime = time;
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/courses/', {
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
            case 'SkillSelect':
                window.localStorage.setItem('view', JSON.stringify(skill_view));
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
            case 'Deck':
                if (JSON.parse(window.localStorage.getItem('cards')) === null) {
                    console.log("SETTING CARDS");
                    window.localStorage.setItem('cards', JSON.stringify([]));
                }
                console.log('local storage : ' + window.localStorage.getItem('view'));
                console.log('state view: ' + this.state.view);
                view = <Deck courseid={this.state.selectedCourse}
                             skills={this.state.skills}
                             token={window.localStorage.getItem('login')}
                             time={this.state.time}
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
