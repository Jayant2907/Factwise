import { useState, useEffect } from "react";
import PieChart from "./components/pieChart";
import "./App.css";
import {current_date} from "../public/data/current_date.json"
import persons from "../public/data/vaccine_dates.json";
import Table from "./components/Table/Table";
function App() {
 
  const [currentDate, setCurrentDate] = useState(new Date(current_date)); // Current Date Fetch from current_date.json in public/data
  const [vaccineDates, setVaccineDates] = useState(persons.map((item)=>{return item.vaccination_date})); // List Of Vaccine Dates Fetch from vaccine_dates.json in public/data
  const [chartData,setChartData]=useState({done:0,not_done:0})
  
  //runs after any change in currentDate
  useEffect(() => {
    var done=0;
    var not_done=0;
    var date = currentDate.toJSON().slice(0, 10);
    var nDate = date.slice(0, 4) + '-' 
               + date.slice(5, 7) + '-' 
               + date.slice(8, 10);

    vaccineDates.map((date)=>{
      if(date<=nDate) done++;
      else not_done++;
    })
    setChartData({done:done,not_done:not_done});
  
  },[currentDate])

  //updates currentDate
  const handleDate=(action)=>{
    var nextDay = new Date(currentDate);
   if(action==='next'){
    nextDay.setDate(currentDate.getDate() + 1);
   }
   else  nextDay.setDate(currentDate.getDate() - 1);
   
    setCurrentDate(nextDay);
  }

  return (
    <div className="App">
      <div className="date">
        <button onClick={()=>handleDate('next')} style={{marginRight:'5px'}} title="Next date">+</button> {/* Set Current Date to next date on click  */}
        <div className="currentdate">{currentDate.toDateString()}</div>
        <button onClick={()=>handleDate('prev')} style={{marginLeft:'5px'}} title="Previous date">-</button> {/* Set Current Date to drevious date on click  */}
      </div>
      <div style={{display: 'flex',minHeight:'600px',width:'100%'}}>
      <div className="chart" style={{flex:'0.5',height:'500px'}}>
        {/* Update the following Component to display pie chart with proper data, alignment and colors */}
        <PieChart data={[chartData.done, chartData.not_done]} />
      </div>
      <Table currentDate={currentDate} />
      {/* Add a table with the user data as explained in README.MD */ }
      </div>
    </div>
  );
}

export default App;
