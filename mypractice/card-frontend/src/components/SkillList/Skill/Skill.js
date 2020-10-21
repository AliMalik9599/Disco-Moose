import React, {Component} from 'react';

class Skill extends Component {
    render() {
        return(
            <div className="skill task-wrapper" onClick={(e) => this.props.skillUpdate(e, this.props.id)}>
                <div className="skill-header d-flex justify-content-between">
                    <span>
                        <strong>Name:</strong>{this.props.name} <br/>
                        <strong>Description: </strong>{this.props.description}<br/>
                        <strong>Number of Levels: </strong>{this.props.num_levels}<br/>
                        <strong>Number of Cards: </strong>{this.props.num_cards}<br/>
                        <strong>Course: </strong>{this.props.course}<br/>
                    </span>
                </div>
                <div className="skill-body">
                    {this.props.description}
                </div>
            </div>
        );
    }

}

export default Skill;