import React, {Component} from "react";
import SkillList from "../../components/SkillList/SkillList";

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
                <div  className="d-flex justify-content-center">
                    <SkillList
                        skills={this.state.skills}
                    />
                </div>
            </main>
        )
    }
}

export default Selection;