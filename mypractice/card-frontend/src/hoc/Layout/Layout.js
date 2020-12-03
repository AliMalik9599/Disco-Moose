import React, {Component} from 'react';
import Login from "../../containers/Login/Login";
import classes from './Layout.module.css'
import Animation from "../../containers/Login/Animation"
import CourseWrapper from "../../containers/CourseWrapper/CourseWrapper";
import Selection from "../../containers/Selection/Selection";
import Registration from "../../containers/Registration/Registration";
import SideBar from "../../containers/SideBar/SideBar";

//enumeration used to switch between webpage layouts
const viewEnum = {
    ANIMATION: '0',
    LOGIN: '1',
    COURSE: '2',
    SELECTION: '3',
    REGISTRATION: '4'
}


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //layoutView will get the value of 'layoutView' in local storage if it exists, otherwise ANIMATION
            layoutView: window.localStorage.getItem('layoutView') || viewEnum.ANIMATION,
            //token will get the value of 'login' in local storage
            token: window.localStorage.getItem('login'),
            courseReset: false,
            skillReset: false,
            //courseView will get the value of 'courseView' in local storage if it exists, '0'
            courseView: window.localStorage.getItem('courseView') || '0'
        }
    }

    /**
     * @desc On a formClick in Login or Registration, this function changes the layout to
     * the COURSE page.
     * @param token - the login token for the user
     */
    changeLayoutState = (token) => {
        window.localStorage.setItem('login', token);
        this.setState({token: token});
        this.setState({layoutView: viewEnum.COURSE});
        console.log("Set token: " + this.state.token)
        this.setState({layoutView: viewEnum.COURSE});
        window.localStorage.setItem('layoutView', viewEnum.COURSE);
    }

    /**
     * @desc Switches the layout from ANIMATION to LOGIN
     */
    stopAnimation = () => {
        this.setState({layoutView: viewEnum.LOGIN});
        window.localStorage.setItem('layoutView', viewEnum.LOGIN);
    }

    /**
     * @desc Switch the layout to REGISTRATION
     */
    toRegistration = () => {
        this.setState({layoutView: viewEnum.REGISTRATION});
        window.localStorage.setItem('layoutView', viewEnum.REGISTRATION);
    }

    /**
     * @desc Switch the layout to LOGIN
     */
    toLogin = () => {
        this.setState({layoutView: viewEnum.LOGIN});
        window.localStorage.setItem('layoutView', viewEnum.LOGIN);
    }

    /**
     * @desc Changes courseReset from false/true to true/false. Used in CourseWrapper to change back to COURSE
     */
    resetToCourse = () => {
        this.setState({courseReset: !this.state.courseReset});
    }

    /**
     * @desc Changes skillReset from false/true to true/false. Used in CourseWrapper to change back to SKILL
     */
    resetToSkill = () => {
        this.setState({skillReset: !this.state.skillReset});
    }

    /**
     * @desc Currently not in use
     */
    goCalendar = () => {
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
        this.setState({layoutView: viewEnum.ANIMATION});
        console.log(this.state.layoutView + " CALENDER");
        console.log(window.localStorage.getItem('layoutView') + " asjhfdlkasjdhflka");
        console.log(this.state.layoutView + " CALENDER");
    }

    /**
     * @desc Currently not in use
     */
    goSettings = () => {
        this.setState({layoutView: viewEnum.ANIMATION});
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
    }

    /**
     * @desc Changes page layout back to ANIMATION upon loging out
     */
    goLogout = () => {
        window.localStorage.clear();
        this.setState({token: ''});
        this.setState({layoutView: viewEnum.ANIMATION});
        window.localStorage.setItem('layoutView', viewEnum.ANIMATION);
    }

    /**
     * @desc Changes the course view to '0' or course to be used in the SideBar
     */
    viewToCourse = () => {
        this.setState({courseView: '0'});
        window.localStorage.setItem('courseView', '0');
    }

    /**
     * @desc Changes the course view to '1' or skill to be used in the SideBar
     */
    viewToSkills = () => {
        this.setState({courseView: '1'});
        window.localStorage.setItem('courseView', '1');
    }

    /**
     * @desc Changes the course view to '2' or deck to be used in the SideBar
     */
    viewToDeck = () => {
        this.setState({courseView: '2'});
        window.localStorage.setItem('courseView', '2');
    }

    /**
     * @desc Renders the appropriate web page layout
     */
    render() {
        let view = null;
        if (window.localStorage.getItem('login') && this.state.layoutView === viewEnum.COURSE) {
            if (JSON.parse(window.localStorage.getItem('view'))['main'] !== 'CourseWrapper') {
                // set local storage if it's not already set for course wrapper
                console.log("is in herr");
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