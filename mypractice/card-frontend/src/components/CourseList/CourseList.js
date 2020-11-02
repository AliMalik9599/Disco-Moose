import React, {Component} from "react";
import Course from  '../Course/Course'
import Deck from '../../containers/Deck/Deck'

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: ''
        };
    }

    selectCourse  = (courseKey) => {
        this.setState({selection: courseKey})
    }

    render() {
        /*TODO: figure out how to click on course and have the selection render the selection page.
        *  This can probably be accomplished with an onclick method or something but that
        *  has yet to be figured out. */

        /*TODO: On course selection, render the selection container (which will then call SkillList
        *  and subsequently Skill. */

        const courses = this.props.courses.map(course => (
            <Course
                key={course.id}
                id={course.id}
                name={course.name}
                description={course.description}
                num_skills={course.num_skills}
                num_cards={course.num_cards}
                clickHandler={this.props.clickHandler}
                token={this.props.token}
            />
        ));
        return (
            <div>
                {courses}
            </div>
        );
    }
}

export default CourseList;