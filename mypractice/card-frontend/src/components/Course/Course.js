import React, {Component} from "react";

class Course extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="course task-wrapper" onClick={(e) => this.props.clickHandler(e, this.props.id)}>
                <div className="course-header d-flex justify-content-between">
                  <span>
                    <strong>Name: </strong>{this.props.name}<br/>
                    <strong>Description: </strong>{this.props.description}<br/>
                    <strong>Number of Skills: </strong>{this.props.num_skills}<br/>
                    <strong>Number of Cards: </strong>{this.props.num_cards}<br/>
                  </span>
                </div>
                <div className="course-body">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

export default Course;