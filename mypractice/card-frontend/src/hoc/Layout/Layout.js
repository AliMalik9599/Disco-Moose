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

const viewEnum = {
    ANIMATION: '0',
    LOGIN: '1',
    COURSE: '2',
    SELECTION: '3',
    REGISTRATION: '4',
    CALENDAR: '5',
    LANDING: '6'
}
//realone
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutView: window.localStorage.getItem('layoutView') || viewEnum.ANIMATION,
            // layoutView: viewEnum.ANIMATION,
            //layoutView: window.localStorage.getItem('layoutView') || viewEnum.LANDING,
            token: window.localStorage.getItem('login'),
            courseReset: false,
            skillReset: false,
            courseView: window.localStorage.getItem('courseView') || '0'
        }
    }

    changeLayoutState = (token) => {
        window.localStorage.setItem('login', token);
        this.setState({token: token});
        this.setState({layoutView: viewEnum.COURSE});
        this.setState({layoutView: viewEnum.COURSE});
        window.localStorage.setItem('layoutView', viewEnum.COURSE);
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
    }

    resetToSkill = () => {
        this.setState({skillReset: !this.state.skillReset});
    }

    goCalendar = () => {
        window.localStorage.setItem('layoutView', viewEnum.CALENDAR);
        this.setState({layoutView: viewEnum.CALENDAR});
        // window.localStorage.setItem('layoutView', viewEnum.LOGIN);
        // this.setState({layoutView: viewEnum.LOGIN});
    }

    goSettings = () => {
        this.setState({layoutView: viewEnum.ANIMATION});
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
    }

    goLogout = () => {
        window.localStorage.clear();
        this.setState({token: ''});
        this.setState({layoutView: viewEnum.ANIMATION});
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
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


    /**
     * @desc Renders the appropriate web page layout
     */
    render() {
        let view = null;
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
            }
        }

        switch (this.state.layoutView) {
            case viewEnum.ANIMATION:
                view = <Animation stopAnimation={this.stopAnimation.bind(this)}/>;
                break;
            case viewEnum.LOGIN:
                view = <Login formClick={this.changeLayoutState.bind(this)} toRegistration={this.toRegistration.bind(this)}/>;
                const page_view = {
                    'main': 'Login',
                    'subpage': null
                }
                window.localStorage.setItem('view', JSON.stringify(page_view));
                break;
            case viewEnum.REGISTRATION:
                view = <Registration formClick={this.changeLayoutState.bind(this)} toLogin={this.toLogin.bind(this)}/>;
                break;
            case viewEnum.LANDING:
                view = <Landing toLogin={this.toLogin.bind(this)} toRegistration={this.toRegistration.bind(this)}/>;
                break;
            case viewEnum.CALENDAR:
                view = <Calendar formClick={this.goToDeckFromCalendar.bind(this)} />
                break;

        }

        return (
            <div>
                <main className={classes.Content}>
                    {view}
                </main>
                <SideBar parentCourse={this.resetToCourse.bind(this)}
                         parentCalendar={this.goCalendar.bind(this)}
                         parentSettings={this.goSettings.bind(this)}
                         parentLogout={this.goLogout.bind(this)}
                         parentView={this.state.layoutView}
                         parentSkill={this.resetToSkill.bind(this)}
                         parentCourseView={this.state.courseView}
                />
            </div>
        );
    }
}

export default Layout;