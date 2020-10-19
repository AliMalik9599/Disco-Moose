import React, {Component} from 'react';

class Skill extends Component {
    render() {
        return(
            <div>
                <strong>Title:</strong>{this.props.title} <br/>
                //other attributes of a skill can be added later like progress, ranking, etc
            </div>
        );
    }

}

export default Skill;