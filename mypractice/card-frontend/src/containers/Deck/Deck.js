import React, {Component} from "react";
import CardList from "../../components/CardList/CardList";

/* Deck class handles the display and modifications
 * to the displayed card list
 */
class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: JSON.parse(window.localStorage.getItem('cards'))
        };
    }

    // Send message to backend when card is completed (checkbox is clicked)
    handleComplete(e, cardId) {
        //cardid -> the id of the card checked
        //need access to current user
        // something to send the card info to the backend
        fetch(`/cardprogress/${cardId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + window.localStorage.getItem('login')
            }
        }).then(response => response.status)
            .then(data => {
                if (data === 404) {
                    alert("Something went wrong, try again!");
                } else {
                    this.refresh()
                }
            });
    }

    // Send message to backend when heart icon is clicked
    handleFavorite(e, cardId) {
        fetch(`/cardprogress/favorite/${cardId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + window.localStorage.getItem('login')
            }
        }).then(response => response.status)
            .then(data => {
                if (data === 404) {
                    alert("Something went wrong, try again!");
                } else {
                    this.refresh()
                }
            });
    }

    // if the page is refreshed, make sure the correct data is displayed
    refresh() {
        this.str_url = '/cards/refresh/' + this.props.courseid.toString() + '/' + this.props.skills.toString() + '/' + this.props.time.toString();
        console.log(window.localStorage.getItem('login'));
        fetch(this.str_url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token ' + window.localStorage.getItem('login')
            }
        })
            .then(response => response.json())
            .then(data => {
                window.localStorage.setItem('cards', JSON.stringify(data));
                this.setState({cards: data});
            });
    }

    // Collect data from backend when component mounts
    componentDidMount() {
        this.str_url = '/cards/cardprogress/' + this.props.courseid.toString() + '/' + this.props.skills.toString() + '/' + this.props.time.toString();
            fetch(this.str_url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + window.localStorage.getItem('login')
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('COMPONENT DID MOUNT:' + data);
                window.localStorage.setItem('cards', JSON.stringify(data));
                this.setState({cards: data});
            });
    }

    render() {
        // only display content if user is logged in
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