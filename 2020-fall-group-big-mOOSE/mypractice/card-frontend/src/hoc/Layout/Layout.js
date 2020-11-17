import React, {Component} from 'react';
import Login from "../../containers/Login/Login";
import classes from './Layout.module.css'
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
            token: window.localStorage.getItem('login'),
            courseReset: false,
            skillReset: false,
            courseView: 0
        }
    }

    changeLayoutState = (token) => {
        window.localStorage.setItem('login', token);
        this.setState({token: token});
        this.setState({view: viewEnum.COURSE});
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

    goCalendar = () => {
        this.setState({view: viewEnum.ANIMATION});
    }

    goSettings = () => {
        this.setState({view: viewEnum.ANIMATION});
    }

    goLogout = () => {
        window.localStorage.clear();
        this.setState({token: ''});
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
        if (window.localStorage.getItem('login')) {
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
        } else {
            switch (this.state.view) {
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
                    view = <Registration formClick={this.changeLayoutState.bind(this)} toLogin={this.toLogin.bind(this)}/>
                    break;
            }
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
                         parentView={this.state.view}
                         parentSkill={this.resetToSkill.bind(this)}
                         parentCourseView={this.state.courseView}
                />
            </div>
        );
    }
}

export default Layout;