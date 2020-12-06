import React, {Component} from "react";
import DailySchedule from  '../DailySchedule/DailySchedule';

/* CardList component to display cards for user */
class ScheduleWrapper extends Component {
    constructor(props) {
        super(props);
    }

    // creates mapping of backend data to Card components
    render() {
        const schedules = this.props.schedules.map(schedule => (
            <DailySchedule
                date = {schedule.date}
                course = {schedule.course}
                skills = {schedule.skills}
                cards = {JSON.stringify(schedule.cards)}
                id = {schedule.id}
                clickHandler = {this.props.clickHandler}
            />
        ));
        // Only display list if user is logged in
        if (window.localStorage.getItem('login')) {
            return (
                <div>
                    {schedules}
                </div>
            );
        }
    }
}

export default ScheduleWrapper;