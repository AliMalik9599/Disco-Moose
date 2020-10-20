import React, {Component} from "react";
import Skill from './Skill/Skill'

class SkillList extends Component {
    state = {
        title: 'SkillList'
    }

    handleSubmit() {
        //TODO: send necessary information to backend
    }

    render() {
        const skills = this.props.skills.map(skill => (
            <form onSubmit={this.handleSubmit}>
                <label>Select the skills you want to work on:
                <select value={this.state.title}>
                    <option value={skill.title}>
                        <Skill title={skill.title}/>
                    </option>
                </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        ));
        return (
            <div>
                {skills}
            </div>
        );
    }
}

export default SkillList;