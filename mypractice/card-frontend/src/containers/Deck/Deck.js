import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";

class Deck extends Component {
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
                <div  className="d-flex justify-content-center">
                    <CardList
                        cards={this.state.cards}
                    />
                </div>
            </main>
        )
    }
}

export default Deck;