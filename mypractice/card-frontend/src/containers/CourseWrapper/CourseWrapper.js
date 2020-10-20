import React, {Component} from "react";
import CourseList from "../../components/CourseList/CourseList";

class CourseWrapper extends Component {
    state = {
        courses: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8000/courses/')
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data});
            });
    }

    render() {
        return (
            <main>
                <p>What would you like to work on today?</p>
                <div className="d-flex justify-content-center">
                    <CourseList
                        courses={this.state.courses}
                    />
                </div>
            </main>
        )
    }
}

export default CourseWrapper;