import React, {Component} from "react";
import Card from  '../Card/Card'

class CardList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const cards = this.props.cards.map(card => (
            <Card
                key={card.id}
                id={card.id}
                title={card.title}
                course={card.course}
                skill={card.skill}
                level={card.level}
                duration={card.duration}
                view_count={card.view_count}
                content={card.content}
                complete={card.complete}
                pressComplete={this.props.completed}
            />
        ));
        return (
            <div>
                {cards}
            </div>
        );
    }
}

export default CardList;