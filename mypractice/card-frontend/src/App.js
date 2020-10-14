import React, {Component} from 'react';
import Deck from './containers/Deck/Deck';
import Login from "./containers/Login/Login";
import Layout from "./hoc/Layout/Layout";
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Layout/>
            </div>
        );
    }
}

export default App;