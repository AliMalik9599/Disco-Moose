import React, {Component} from "react";
import DailySchedule from '../../components/DailySchedule/DailySchedule'
/* Deck class handles the display and modifications
* to the displayed card list
*/
class Calendar extends Component {
   constructor(props) {
       super(props);
       this.state = {
           dailyData: []
       };
   }

   componentDidMount() {
       fetch('/decks/', {
           method: 'GET',
           headers: {
               'Content-type': 'application/json; charset=UTF-8',
               'Authorization': 'Token ' + window.localStorage.getItem('login')
           }
       })
           .then(response => response.json())
           .then(data => {
               this.setState({dailyData: data});
           });
   }

   handleCourseClick(e, id, cards) {
       // TODO: Set appropriate local storage values and pass a prop back up to Layout (?) to switch the view to Deck
       // window.localStorage.setItem('selectedCourse', id);
       // need to set cards in local storage, but that is supposed to be all the card data (see Deck.js line 82)
   }

   render() {
       // only display content if user is logged in
       if (window.localStorage.getItem('login')) {
           const schedules = this.state.dailyData.map(schedule => (
               <DailySchedule
                   date={schedule.date}
                   course_id={schedule.course_id}
                   card_ids={schedule.cards}
                   deck_id={schedule.id}
                   clickHandler={this.handleCourseClick.bind(this)}
               />
           ));

           return (
               <main>
                   <div className="d-flex justify-content-center">
                       <p>Take a look at what you previously practiced</p>
                       {schedules}
                   </div>
               </main>
           )
       }
   }
}

export default Calendar;