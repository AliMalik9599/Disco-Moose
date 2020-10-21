import React, {Component} from "react";
import SkillList from "../../components/SkillList/SkillList";
import CourseWrapper from "../CourseWrapper/CourseWrapper";

class Selection extends Component {
    state = {
        skills: []
    };

    componentDidMount() {
        fetch('http://localhost:8000/skills/')
            .then(response => response.json())
            .then(data => {
                this.setState({skills: data});
            });
    }

    render() {
        return (
            <main>
                <p>ON SELECTION PAGE</p>
                <div  className="d-flex justify-content-center">
                    <SkillList
                        skills={this.state.skills}
                        skillUpdate={this.props.skillUpdate}
                    />
                </div>
                <button onClick={this.props.doneClick}>
                    Done
                </button>
            </main>
        )
    }
}

export default Selection;