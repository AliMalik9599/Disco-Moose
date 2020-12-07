import React, {Component} from "react";
import CourseCard from  '../Card/Card';
import {withStyles, Button, Grid, Typography} from "@material-ui/core";

const styles = theme => ({
    main: {
        display: "inline-flex",
        fontFamily: 'Montserrat',
        justifyContent: 'evenly-spaced',
        alignItems: "center",
        alignContent: 'center',
        flexFlow: "row wrap",
        margin: "1%",
        textAlign: "left",
        width: "24%",

    },
});
/* CardList component to display cards for user */
class CardList extends Component {
    constructor(props) {
        super(props);
    }

    // creates mapping of backend data to Card components
    render() {
        const { classes } = this.props;
        const cards = this.props.cards.map(card => (
            <Grid className={classes.main}>
                <CourseCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    course={card.course}
                    skill={card.skill}
                    level={card.level}
                    duration={card.duration}
                    view_count={card.view_count}
                    content={card.content}
                    is_complete={card.is_complete}
                    is_favorited={card.is_favorited}
                    pressComplete={this.props.completed}
                    addToFavorites={this.props.favorited}
                    token={this.props.token}
                    last_completed={card.last_completed}
                />
            </Grid>
        ));
        // Only display list if user is logged in
        if (window.localStorage.getItem('login')) {
            return (
                <div>
                    {cards}
                </div>
            );
        }
    }
}

export default withStyles(styles)(CardList);