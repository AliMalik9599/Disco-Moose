import React, {Component} from "react";
import Skill from './Skill/Skill';

class SkillList extends Component {
    state = {
        title: 'SkillList'
    }

    handleSubmit() {
        //TODO: send necessary information to backend
    }

    render() {
        const skills = this.props.skills.map(skill => (
            <Skill
                key={skill.id}
                id={skill.id}
                name={skill.name}
                description={skill.description}
                num_levels={skill.num_levels}
                num_cards={skill.num_cards}
                course={skill.course}
                skillUpdate={this.props.skillUpdate}
            />
        ));
        return (
            <div>
                {skills}
            </div>
        );
    }
}

export default SkillList;

    /*render() {
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

export default SkillList;*/