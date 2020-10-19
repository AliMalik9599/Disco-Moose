import React, {Component} from "react";
import Course from  '../Course/Course'

class CourseList extends Component {
    render() {
        const courses = this.props.courses.map(course => (
            <Course
                key={course.id}
                id={course.id}
                name={course.name}
                description={course.description}
                num_skills={course.num_skills}
                num_cards={course.num_cards}
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