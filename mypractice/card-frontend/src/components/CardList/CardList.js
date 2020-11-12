import React, {Component} from "react";
import CourseCard from  '../Card/Card';
import checkCookie from '../../hoc/Layout/LoginPersistence';


class CardList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const cards = this.props.cards.map(card => (
            <CourseCard
                key={card.id}
                id={card.id}
                title={card.title}
                course={card.course}
                skill={card.skill}
                level={card.level}
                duration={card.duration}
                view_count={card.view_count}
                content={card.content}
                is_complete={card.is_complete}
                is_favorited={card.is_favorited}
                pressComplete={this.props.completed}
                addToFavorites={this.props.favorited}
                token={this.props.token}
            />
        ));
        if (window.localStorage.getItem('login')) {
            return (
                <div>
                    {cards}
                </div>
            );
        }
    }
}

export default CardList;