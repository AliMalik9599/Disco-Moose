import React, {Component} from "react";
import classes from './Card.css'

class Card extends Component {
    //add state for completed or not

    render() {
        return (
            <div className="card task-wrapper" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <strong>Title: </strong>{this.props.title}<br/>
                    <strong>Course: </strong>{this.props.course}<br/>
                    <strong>Skill: </strong>{this.props.skill}<br/>
                    <strong>Level: </strong>{this.props.level}<br/>
                    <strong>Duration: </strong>{this.props.duration}<br/>
                    <strong>View Count: </strong>{this.props.view_count}<br/>
                  </span>
                </div>
                <div className="card-body">
                    {this.props.content}
                </div>
                <div className="card-footer">
                    <strong>Completed?</strong> {this.props.complete.toString()}
                </div>
            </div>
        );
    }
}

export default Card;