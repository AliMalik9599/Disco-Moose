import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";

class Deck extends Component {
    state = {
        cards: []
    };

    componentDidMount() {
        fetch('http://127.0.0.1:8000/cards/')
            .then(response => response.json())
            .then(data => {
                this.setState({cards: data});
            });
        console.log("HERE IS DECK");
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