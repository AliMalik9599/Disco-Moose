import React, {Component} from "react";

class Card extends Component {
    render() {
        return (
            <div className="card task-wrapper" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <strong>Title: </strong>{this.props.title}<br/>
                    <strong>Category: </strong>{this.props.category}<br/>
                    <strong>Difficulty: </strong>{this.props.difficulty}<br/>
                    <strong>Duration: </strong>{this.props.duration}<br/>
                    <strong>View_count: </strong>{this.props.view_count}<br/>
                  </span>
                </div>
                <div className="card-body">
                    {this.props.content}
                </div>
                <div className="card-footer">
                    <strong>Deck:</strong>  {this.props.deck}
                </div>
            </div>
        );
    }
}

export default Card;