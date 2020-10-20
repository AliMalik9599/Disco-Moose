import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import Animation from "../../containers/Login/Animation"
import CourseWrapper from "../../containers/CourseWrapper/CourseWrapper";


const viewEnum = {
    ANIMATION: 0,
    LOGIN: 1,
    COURSE: 2,
}

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: viewEnum.ANIMATION
        }
    }

    changeLayoutState = () => {
        this.setState({view: viewEnum.COURSE})
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
            case viewEnum.COURSE:
                view = <CourseWrapper />
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
    }
}

export default Layout;