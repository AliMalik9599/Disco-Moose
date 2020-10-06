import React from 'react';
import './App.css';

class Deck extends React.Component {
    state = {
        cards: []
    }

    componentDidMount() {
        fetch('http://localhost:8000/cards/')
            .then(response => response.json())
            .then(data => {
                this.setState({cards: data});
            });
    }

    render() {
        return (
            <main className="d-flex justify-content-center my-4">
                <div  className="col-5">
                    <CardList
                        cards={this.state.cards}
                    />
                </div>
            </main>
        )
    }
}

class CardList extends React.Component {
    render() {
        const cards = this.props.cards.map(card => (
            <Card
                key={card.id}
                id={card.id}
                title={card.title}
                topic={card.topic}
                category={card.category}
                difficulty={card.difficulty}
                duration={card.duration}
                view_count={card.view_count}
                content={card.content}
            ></Card>
        ));
        return (
            <div>
                {cards}
            </div>
        );
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
          <span>
            <strong>Title: </strong>{this.props.title}
          </span>
                </div>
                <div className="card-body">
                    {this.props.content}
                </div>
                <div className="card-footer">
                    <strong>Topic:</strong>  {this.props.topic}
                </div>
            </div>
        );
    }
}

export default Deck;