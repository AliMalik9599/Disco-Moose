import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        this.str_url = 'http://127.0.0.1:8000/cards/' + this.props.courseid.toString() + '/' + this.props.skills.toString();
        console.log(this.str_url)
            fetch(this.str_url)
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