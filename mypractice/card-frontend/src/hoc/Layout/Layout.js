import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import Deck from "../../containers/Deck/Deck";

class Layout extends Component {
    state = {
        showSideDrawer: true,
        showDeck: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer}
        });
    }

    changeLayoutState = () => {
        this.setState({showDeck: !this.state.showDeck})
    }

    render () {
        if (this.state.showDeck) {
            return (
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {/*{this.props.children}*/}
                        <Deck/>
                    </main>
                </div>
            );
        } else {
            return (
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {/*{this.props.children}*/}
                        <Login formClick={this.changeLayoutState.bind(this)}/>
                    </main>
                </div>
            );
        }
    }
}

export default Layout;