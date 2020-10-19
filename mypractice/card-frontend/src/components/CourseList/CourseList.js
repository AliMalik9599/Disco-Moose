import React, {Component} from "react";
import Course from  '../Course/Course'

class CourseList extends Component {
    render() {
        const courses = this.props.courses.map(course => (
            <Card
                key={card.id}
                id={card.id}
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