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
       console.log("mounttttt")
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

   /*
    * Store variables in local storage needed to render the correct deck
    * Switch the view from Calendar to Deck
    * Call the method in Layout.js to handle the view change
    */
   handleCourseClick(e, id, cards, skill_id_list, time) {
       window.localStorage.setItem('selectedCourse', id);
       window.localStorage.setItem('cards', cards);
       const new_view = {"main": "CourseWrapper", "subpage": "Deck"}
       window.localStorage.setItem('view', JSON.stringify(new_view));
       window.localStorage.setItem('skills', JSON.stringify(skill_id_list));
       window.localStorage.setItem('time', time);
       this.props.formClick();
   }

   render() {
       // only display content if user is logged in
       console.log("asdfasfdasdfLLLLLLLLL");
       if (window.localStorage.getItem('login')) {
           console.log("andaisCool");
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
       console.log("andaisLame");
   }
}

export default Calendar;