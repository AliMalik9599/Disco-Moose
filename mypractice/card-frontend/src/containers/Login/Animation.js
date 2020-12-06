import React, {Component} from "react";
import classes from './Login.module.css'

class Animation extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @desc Changes the view in layout from ANIMATION to LOGIN after 3200 milliseconds
     */
    componentDidMount() {
        setTimeout(() => {
            this.props.stopAnimation();
        }, 3200)
    }

    //renders the login animation
    render() {
        return (
            <div className={classes.fadeOut}>
                <img src={require("./loginAnimation.gif")} alt="loading..."/>
            </div>
            //uses fadeOut to fade the animation out over time
        )
    }
}

export default Animation;