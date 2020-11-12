import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";
import checkCookie from '../../hoc/Layout/LoginPersistence';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    handleComplete(e, cardId) {
        console.log(cardId)
        //cardid -> the id of the card checked
        //need access to current user
        // something to send the card info to the backend
        fetch(`http://127.0.0.1:8000/cardprogress/${cardId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + this.props.token
            }
        }).then(response => response.status)
            .then(data => {
                console.log("I AM HERE")
                if (data === 404) {
                    alert("Something went wrong, try again!");
                } else {
                    this.componentDidMount()
                }
            });
    }

    handleFavorite(e, cardId) {
        fetch(`http://127.0.0.1:8000/cardprogress/favorite/${cardId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + this.props.token
            }
        }).then(response => response.status)
            .then(data => {
                //console.log("I AM HERE 1")
                if (data === 404) {
                    alert("Something went wrong, try again!");
                } else {
                    this.componentDidMount()
                }
            });
    }

    componentDidMount() {
        this.str_url = 'http://127.0.0.1:8000/cards/cardprogress/' + this.props.courseid.toString() + '/'
            + this.props.skills.toString();
            fetch(this.str_url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + this.props.token
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({cards: data});
            });
    }

    render() {
        if (window.localStorage.getItem('login')) {
            return (
                <main>
                    <div  className="d-flex justify-content-center">
                        <CardList
                            cards={this.state.cards}
                            completed={this.handleComplete.bind(this)}
                            favorited={this.handleFavorite.bind(this)}
                            token={this.props.token}
                        />
                    </div>
                </main>
            )
        }
    }
}

export default Deck;