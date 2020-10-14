import React, {Component} from "react";
import Card from  '../Card/Card'

class CardList extends Component {
    render() {
        const cards = this.props.cards.map(card => (
            <Card
                key={card.id}
                id={card.id}
                title={card.title}
                deck={card.deck}
                category={card.category}
                difficulty={card.difficulty}
                duration={card.duration}
                view_count={card.view_count}
                content={card.content}
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