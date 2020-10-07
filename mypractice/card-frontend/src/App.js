import React from 'react';
import './App.css';

class Deck extends React.Component {
    state = {
        cards: []
    };

    componentDidMount() {
        fetch('http://localhost:8000/cards/')
            .then(response => response.json())
            .then(data => {
                this.setState({cards: data});
            });
    }

    render() {
        return (
            <main>
                <div className="topnav">
                    <a className="active" href="/cards">Home</a>
                    <a href="/cards">My Decks</a>
                    <a href="">Account</a>
                    <a href="">Settings</a>
                </div>
                <div  className="d-flex justify-content-center">
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
                deck={card.deck}
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
            <div className="card task-wrapper" /* style="width: 18rem;" */>
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <strong>Title: </strong>{this.props.title}<br></br>
                    <strong>Category: </strong>{this.props.category}<br></br>
                    <strong>Difficulty: </strong>{this.props.difficulty}<br></br>
                    <strong>Duration: </strong>{this.props.duration}<br></br>
                    <strong>View_count: </strong>{this.props.view_count}<br></br>
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

export default Deck;