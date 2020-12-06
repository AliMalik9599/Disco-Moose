import React, {Component} from "react";
import DailyScheduleWrapper from '../../components/DailyScheduleWrapper/DailyScheduleWrapper'
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
       window.localStorage.setItem('selectedCourse', id);
       window.localStorage.setItem('cards', cards);
       const new_view = {"main": "CourseWrapper", "subpage": "Deck"}
       window.localStorage.setItem('view', JSON.stringify(new_view));
       this.props.formClick();
       // TODO: Set appropriate local storage values and pass a prop back up to Layout (?) to switch the view to Deck
       // need to set cards in local storage, but that is supposed to be all the card data (see Deck.js line 82)
   }

   render() {
       // only display content if user is logged in
       if (window.localStorage.getItem('login')) {
           return (
               <main>
                   <div className="d-flex justify-content-center">
                       <p>Take a look at what you previously practiced</p>
                       < DailyScheduleWrapper
                           schedules =  {this.state.dailyData}
                           clickHandler = {this.handleCourseClick.bind(this)}
                       />
                   </div>
               </main>
           )
       }
   }
}

export default Calendar;