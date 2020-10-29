import React, {Component} from "react";
import Card from  '../Card/Card'

class CardList extends Component {
    //add a constructor that calls super(props)
    //need a function that acts as an intermediate between Deck and Card
    //to know if a card has been completed or not

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