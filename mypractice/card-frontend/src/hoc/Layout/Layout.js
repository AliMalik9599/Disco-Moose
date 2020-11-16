import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import Animation from "../../containers/Login/Animation"
import CourseWrapper from "../../containers/CourseWrapper/CourseWrapper";
import Selection from "../../containers/Selection/Selection";
import Registration from "../../containers/Registration/Registration";
import SideBar from "../../containers/SideBar/SideBar";


const viewEnum = {
    ANIMATION: 0,
    LOGIN: 1,
    COURSE: 2,
    SELECTION: 3,
    REGISTRATION: 4
}

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: viewEnum.ANIMATION,
            token: '',
            courseReset: false,
            skillReset: false,
            courseView: 0
        }
    }

    changeLayoutState = (token) => {
        console.log("changeLayoutState");
        console.log(token);
        this.setState({token: token})
        console.log("Set token: " + this.state.token)
        this.setState({view: viewEnum.COURSE})
    }

    stopAnimation = () => {
        this.setState({view: viewEnum.LOGIN});
    }

    toRegistration = () => {
        this.setState({view: viewEnum.REGISTRATION});
    }

    toLogin = () => {
        this.setState({view: viewEnum.LOGIN});
    }

    resetToCourse = () => {
        this.setState({courseReset: !this.state.courseReset});
    }

    resetToSkill = () => {
        this.setState({skillReset: !this.state.skillReset});
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

    viewToCourse = () => {
        this.setState({courseView: 0});
    }

    viewToSkills = () => {
        this.setState({courseView: 1});
    }

    viewToDeck = () => {
        this.setState({courseView: 2});
    }

    render () {

        let view = null;
        console.log(this.state.view + "viewwww");
        switch (this.state.view) {
            case viewEnum.ANIMATION:
                view = <Animation stopAnimation={this.stopAnimation.bind(this)}/>
                break;
            case viewEnum.LOGIN:
                console.log(this.state.token);
                view = <Login formClick={this.changeLayoutState.bind(this)} toRegistration={this.toRegistration.bind(this)}/>
                break;
            case viewEnum.REGISTRATION:
                console.log(this.state.token);
                view = <Registration formClick={this.changeLayoutState.bind(this)} toLogin={this.toLogin.bind(this)}/>
                break;
            case viewEnum.COURSE:
                view = <CourseWrapper token={this.state.token}
                                      courseReset={this.state.courseReset}
                                      skillReset={this.state.skillReset}
                                      viewToCourse={this.viewToCourse.bind(this)}
                                      viewToSkills={this.viewToSkills.bind(this)}
                                      viewToDeck={this.viewToDeck.bind(this)}
                                      resetToCourse={this.resetToCourse.bind(this)}
                                      resetToSkill={this.resetToSkill.bind(this)}

                />
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
                <SideBar parentCourse={this.resetToCourse.bind(this)}
                         parentCalender={this.goCalender.bind(this)}
                         parentSettings={this.goSettings.bind(this)}
                         parentLogout={this.goLogout.bind(this)}
                         parentView={this.state.view}
                         parentSkill={this.resetToSkill.bind(this)}
                         parentCourseView={this.state.courseView}
                />
            </div>
        );
    }
}

export default Layout;