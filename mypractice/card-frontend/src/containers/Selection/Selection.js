import React, {Component} from "react";
import SkillList from "../../components/SkillList/SkillList";

class Selection extends Component {
    state = {
        skills: []
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/skills/${this.props.course}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + this.props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({skills: data});
            });
    }

    render() {
        return (
            <main className="d-flex flex-column align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <h1>Select which skills you would like to practice.</h1>
                    <SkillList
                        skills={this.state.skills}
                        skillUpdate={this.props.skillUpdate}
                        token={this.props.token}
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