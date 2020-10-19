import React, {Component} from "react";

class Course extends Component {
    render() {
        return (
            <div className="card task-wrapper" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <strong>Name: </strong>{this.props.name}<br/>
                    <strong>Description: </strong>{this.props.description}<br/>
                    <strong>num_skills: </strong>{this.props.num_skills}<br/>
                    <strong>num_cards: </strong>{this.props.num_cards}<br/>
                  </span>
                </div>
                <div className="card-body">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

export default Course;