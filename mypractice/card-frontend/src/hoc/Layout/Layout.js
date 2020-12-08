import React, {Component} from 'react';
import Login from "../../containers/Login/Login";
import classes from './Layout.module.css'
import Animation from "../../containers/Login/Animation"
import CourseWrapper from "../../containers/CourseWrapper/CourseWrapper";
import Registration from "../../containers/Registration/Registration";
import SideBar from "../../containers/SideBar/SideBar";

import Landing from "../../containers/Landing/Landing";
import bulb from '../../containers/Login/bulb-logo.png';
import Calendar from "../../containers/Calendar/Calendar"
import WelcomePage from "../../containers/Welcome/WelcomPage";

const viewEnum = {
    ANIMATION: '0',
    LOGIN: '1',
    COURSE: '2',
    SELECTION: '3',
    REGISTRATION: '4',
    CALENDAR: '5',
    LANDING: '6',
    WELCOME: '7'
}
//realone
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //layoutView: window.localStorage.getItem('layoutView') || viewEnum.LANDING
            layoutView: viewEnum.ANIMATION,
            //layoutView: window.localStorage.getItem('layoutView') || viewEnum.LANDING,
            token: window.localStorage.getItem('login'),
            courseReset: false,
            skillReset: false,
            courseView: window.localStorage.getItem('courseView') || '0',
            username: ''
        }
    }

    changeLayoutState = (token) => {
        window.localStorage.setItem('login', token);
        this.setState({token: token});
        this.setState({layoutView: viewEnum.WELCOME});
        this.setState({layoutView: viewEnum.WELCOME});
        window.localStorage.setItem('layoutView', viewEnum.WELCOME);
    }

    stopAnimation = () => {
        this.setState({layoutView: viewEnum.LANDING});
        window.localStorage.setItem('layoutView', viewEnum.LANDING);
    }

    toRegistration = () => {
        this.setState({layoutView: viewEnum.REGISTRATION});
        window.localStorage.setItem('layoutView', viewEnum.REGISTRATION);
    }

    toLogin = () => {
        this.setState({layoutView: viewEnum.LOGIN});
        window.localStorage.setItem('layoutView', viewEnum.LOGIN);
    }

    resetToCourse = () => {
        this.setState({courseReset: !this.state.courseReset});
        this.setState({layoutView: viewEnum.COURSE});
        window.localStorage.setItem('layoutView', viewEnum.COURSE);
        this.setState({courseView: '0'});
        window.localStorage.setItem('courseView', '0');
    }

    resetToSkill = () => {
        this.setState({skillReset: !this.state.skillReset});
        this.setState({layoutView: viewEnum.COURSE});
        window.localStorage.setItem('layoutView', viewEnum.COURSE);
        this.setState({courseView: '1'});
        window.localStorage.setItem('courseView', '1');
    }

    goCalendar = () => {
        window.localStorage.setItem('layoutView', viewEnum.CALENDAR);
        this.setState({layoutView: viewEnum.CALENDAR});
    }

    goSettings = () => {
        this.setState({layoutView: viewEnum.ANIMATION});
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
    }

    goLogout = () => {
        window.localStorage.clear();
        this.setState({token: ''});
        this.setState({layoutView: viewEnum.LANDING});
        window.localStorage.setItem('layoutView', viewEnum.LANDING);
    }

    viewToCourse = () => {
        this.setState({courseView: '0'});
        window.localStorage.setItem('courseView', '0');
    }

    viewToSkills = () => {
        this.setState({courseView: '1'});
        window.localStorage.setItem('courseView', '1');
    }

    viewToDeck = () => {
        this.setState({courseView: '2'});
        window.localStorage.setItem('courseView', '2');
    }


    goToDeckFromCalendar = () => {
        this.setState({layoutView: viewEnum.COURSE});
        window.localStorage.setItem('layoutView', viewEnum.COURSE);
    }

    setUser = (userName) => {
        this.setState({username: userName});
        window.localStorage.setItem('username', userName);
    }


    /**
     * @desc Renders the appropriate web page layout
     */
    render() {
        let view = null;
        let sidebar = null;
        console.log("asdfdsaf " + this.state.layoutView);
        if (window.localStorage.getItem('login') && this.state.layoutView === viewEnum.COURSE) {
            if (JSON.parse(window.localStorage.getItem('view'))['main'] !== 'CourseWrapper') {
                // set local storage if it's not already set for course wrapper
                let page_view = {
                    'main': 'CourseWrapper',
                    'subpage': 'CourseSelect'
                }
                window.localStorage.setItem('view', JSON.stringify(page_view));
                window.localStorage.setItem('courses', JSON.stringify([]));
                window.localStorage.setItem('skills', JSON.stringify([]));
                view = <CourseWrapper token={this.state.token}
                                      courseReset={this.state.courseReset}
                                      skillReset={this.state.skillReset}
                                      viewToCourse={this.viewToCourse.bind(this)}
                                      viewToSkills={this.viewToSkills.bind(this)}
                                      viewToDeck={this.viewToDeck.bind(this)}
                                      resetToCourse={this.resetToCourse.bind(this)}
                                      resetToSkill={this.resetToSkill.bind(this)}

                />
                sidebar = <SideBar parentCourse={this.resetToCourse.bind(this)}
                         parentCalendar={this.goCalendar.bind(this)}
                         parentSettings={this.goSettings.bind(this)}
                         parentLogout={this.goLogout.bind(this)}
                         parentView={this.state.layoutView}
                         parentSkill={this.resetToSkill.bind(this)}
                         parentCourseView={this.state.courseView}
                />
            } else {
                // do not reset local storage
                view = <CourseWrapper token={this.state.token}
                                      courseReset={this.state.courseReset}
                                      skillReset={this.state.skillReset}
                                      viewToCourse={this.viewToCourse.bind(this)}
                                      viewToSkills={this.viewToSkills.bind(this)}
                                      viewToDeck={this.viewToDeck.bind(this)}
                                      resetToCourse={this.resetToCourse.bind(this)}
                                      resetToSkill={this.resetToSkill.bind(this)}
                />;
                sidebar = <SideBar parentCourse={this.resetToCourse.bind(this)}
                                   parentCalendar={this.goCalendar.bind(this)}
                                   parentSettings={this.goSettings.bind(this)}
                                   parentLogout={this.goLogout.bind(this)}
                                   parentView={this.state.layoutView}
                                   parentSkill={this.resetToSkill.bind(this)}
                                   parentCourseView={this.state.courseView}
                />
            }
        }

        switch (this.state.layoutView) {
            case viewEnum.ANIMATION:
                view = <Animation stopAnimation={this.stopAnimation.bind(this)}/>;
                break;
            case viewEnum.LOGIN:
                view = <Login goLogout={this.goLogout.bind(this)} setUser={this.setUser.bind(this)} formClick={this.changeLayoutState.bind(this)} toRegistration={this.toRegistration.bind(this)}/>;
                const page_view = {
                    'main': 'Login',
                    'subpage': null
                }
                window.localStorage.setItem('view', JSON.stringify(page_view));
                break;
            case viewEnum.REGISTRATION:
                view = <Registration goLogout={this.goLogout.bind(this)} formClick={this.changeLayoutState.bind(this)} toLogin={this.toLogin.bind(this)}/>;
                break;
            case viewEnum.LANDING:
                view = <Landing toLogin={this.toLogin.bind(this)} toRegistration={this.toRegistration.bind(this)}/>;
                break;
            case viewEnum.CALENDAR:
                console.log("IN DEERRRR");
                view = <Calendar formClick={this.goToDeckFromCalendar.bind(this)} />
                sidebar = <SideBar parentCourse={this.resetToCourse.bind(this)}
                                   parentCalendar={this.goCalendar.bind(this)}
                                   parentSettings={this.goSettings.bind(this)}
                                   parentLogout={this.goLogout.bind(this)}
                                   parentView={this.state.layoutView}
                                   parentSkill={this.resetToSkill.bind(this)}
                                   parentCourseView={this.state.courseView}
                />
                break;
            case viewEnum.WELCOME:
                view = <WelcomePage goLogout={this.goLogout.bind(this)} username={this.state.username} parentCalendar={this.goCalendar.bind(this)} parentCourse={this.resetToCourse.bind(this)} />
                break;
        }

        return (
            <div>
                <main>
                    {view}
                </main>
                {sidebar}
            </div>
        );
    }
}

export default Layout;