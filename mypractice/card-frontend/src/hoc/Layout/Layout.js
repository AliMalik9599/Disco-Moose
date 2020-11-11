import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import Animation from "../../containers/Login/Animation"
import CourseWrapper from "../../containers/CourseWrapper/CourseWrapper";
import Selection from "../../containers/Selection/Selection";
import SideBar from "../../containers/SideBar/SideBar";


const viewEnum = {
    ANIMATION: 0,
    LOGIN: 1,
    COURSE: 2,
    SELECTION: 3
}

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: viewEnum.ANIMATION,
            token: '',
            resetToCourse: false,
            courseView: 0
        }
    }

    changeLayoutState = (token) => {
        console.log("changeLayoutState")
        console.log(token)
        this.setState({token: token})
        console.log("Set token: " + this.state.token)
        this.setState({view: viewEnum.COURSE})
    }

    stopAnimation = () => {
        this.setState({view: viewEnum.LOGIN});
    }

    toCourse = () => {
        this.setState({resetToCourse: !this.state.resetToCourse});
    }

    goCalender = () => {
        this.setState({view: viewEnum.ANIMATION});
    }

    goSettings = () => {
        this.setState({view: viewEnum.ANIMATION});
    }

    goLogout = () => {
        this.setState({view: viewEnum.ANIMATION});
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
                view = <CourseWrapper token={this.state.token}/>
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
                <SideBar parentCourse={this.toCourse.bind(this)}
                         parentCalender={this.goCalender.bind(this)}
                         parentSettings={this.goSettings.bind(this)}
                         parentLogout={this.goLogout.bind(this)}
                         parentView={this.state.view}
                         parentCourseView={this.state.courseView}
                />
            </div>
        );
    }
}

export default Layout;