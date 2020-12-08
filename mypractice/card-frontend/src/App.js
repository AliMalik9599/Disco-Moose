import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import './App.css';

window.onbeforeunload = function() {
    localStorage.clear();
};

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