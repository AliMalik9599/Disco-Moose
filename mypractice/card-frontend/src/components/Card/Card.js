import React, {Component} from "react";
import classes from './Card.css'

class Card extends Component {
    //add state for completed or not
    constructor(props) {
        super(props);
        this.state = {
            complete: false
        };
    }

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
                    <strong>Is complete: </strong>{this.props.is_complete}<br/>
                    <strong>Is favorite: </strong>{this.props.is_favorited}<br/>
                  </span>
                </div>
                <div className="card-body">
                    {this.props.content}
                </div>
                <div className="card-footer">
                    <label className="switch">Complete
                        <input type="checkbox" onClick={(e) => this.props.pressComplete(e, this.props.id)} checked={(this.props.is_complete === 'True')}/>
                               {/*onClick={this.props.pressComplete}/>*/}
                    </label>
                </div>
            </div>
        );
    }
}

export default Card;