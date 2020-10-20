import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import Deck from "../../containers/Deck/Deck";
import Animation from "../../containers/Login/Animation"

const viewEnum = {
    ANIMATION: 0,
    LOGIN: 1,
    DECK: 2,
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: viewEnum.ANIMATION
        }
    }

    // state = {
    //     showSideDrawer: false,
    //     showDeck: false
    // }

    // sideDrawerClosedHandler = () => {
    //     this.setState({showSideDrawer: false});
    // }
    //
    // sideDrawerToggleHandler = () => {
    //     this.setState((prevState) => {
    //         return {showSideDrawer: !this.state.showSideDrawer}
    //     });
    // }

    changeLayoutState = () => {
        this.setState({view: viewEnum.DECK})
    }

    stopAnimation = () => {
        this.setState({view: viewEnum.LOGIN});
    }


    render () {
        let view = null;
        switch (this.state.view) {
            case viewEnum.ANIMATION:
                view = <Animation stopAnimation={this.stopAnimation.bind(this)}/>
                break;
            case viewEnum.LOGIN:
                view = <Login formClick={this.changeLayoutState.bind(this)}/>
                break;
            case viewEnum.DECK:
                view = <Deck />
                break;
        }
        return (
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {view}
                </main>
            </div>
        );
        // if (this.state.showDeck) {
        //     return (
        //         <div>
        //             <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        //             <SideDrawer
        //                 open={this.state.showSideDrawer}
        //                 closed={this.sideDrawerClosedHandler}/>
        //             <main className={classes.Content}>
        //                 {/*{this.props.children}*/}
        //                 <Deck/>
        //             </main>
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div>
        //             <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        //             <SideDrawer
        //                 open={this.state.showSideDrawer}
        //                 closed={this.sideDrawerClosedHandler}/>
        //             <main className={classes.Content}>
        //
        //                 <Login formClick={this.changeLayoutState.bind(this)}/>
        //             </main>
        //         </div>
        //     );
        // }
    }
}

export default Layout;