import React, {Component} from "react";
import classes from './Login.module.css'
import Disco from './discoAnimation.gif';

class Animation extends Component {
    constructor(props) {
        super(props);
    }



    componentDidMount() {
        setTimeout(() => {
            this.props.stopAnimation();
        }, 3200)
    }

    render() {
        return (
            <div className={classes.fadeOut}>
                <img src={Disco} alt="loading..."/>
            </div>
        )
    }
}

export default Animation;