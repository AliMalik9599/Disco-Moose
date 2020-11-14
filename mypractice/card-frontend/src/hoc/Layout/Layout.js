import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Login from "../../containers/Login/Login";
import classes from './Layout.module.css'
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
    }

    stopAnimation = () => {
        this.setState({view: viewEnum.LOGIN});
    }

    logout = () => {
        this.setState({token: ''});
        window.localStorage.clear();
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
                    view = <Login formClick={this.changeLayoutState.bind(this)}/>;
                    const page_view = {
                        'main': 'Login',
                        'subpage': null
                    }
                    window.localStorage.setItem('view', JSON.stringify(page_view));
                    break;
            }
        }

        return (
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} logout={this.logout.bind(this)}/>
                {/*<SideDrawer*/}
                {/*    open={this.state.showSideDrawer}*/}
                {/*    closed={this.sideDrawerClosedHandler}/>*/}
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

// if (window.localStorage.getItem('login') && JSON.parse(window.localStorage.getItem('view'))['page'] !== 'CourseWrapper') {
//     let page_view = {
//         'main': 'CourseWrapper',
//         'subpage': 'CourseSelect'
//     }
//     window.localStorage.setItem('view', JSON.stringify(page_view));
//     view = <CourseWrapper token={this.state.token}/>;
// }