import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";

class Deck extends Component {
    //deck should know what cards are completed
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    //deck needs to have function that tracks if user has clicked card
    //update backend every time the user "completes" a card

    handleComplete(e, cardId) {
        console.log(cardId)
        //cardid -> the id of the card checked
        //need access to current user
        // something to send the card info to the backend
    }

    componentDidMount() {
        this.str_url = 'http://127.0.0.1:8000/cards/cardprogress/' + this.props.courseid.toString() + '/'
            + this.props.skills.toString();
        console.log(this.str_url)
            fetch(this.str_url)
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
                        completed={this.handleComplete.bind(this)}
                    />
                </div>
            </main>
        )
    }
}

export default Deck;