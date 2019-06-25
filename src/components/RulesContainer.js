import React from "react"
import rulesStyles from "./RulesContainer.module.css"


function SelectTime(props){
    let intervals = ["00", "30"];
    let times = [];
    for(let i = 0; i < 24; i++){
      for(let j = 0; j < intervals.length; j++){
        if(i < 10){
          times.push("0" + i + ":" + intervals[j]);
        } else {
          times.push(i + ":" + intervals[j]);
        }
      }
    }

    let optionItems = times.map((time) => <option key={time} value={time}>{time}</option>);

    return(
      <div className="inline-block mr12">
        <div className="select-container">
          <select onChange={props.handleTimeChange} value={props.timeValue} className="select select--border-darken10">
                {optionItems}
          </select>
          <div className="select-arrow"></div>
        </div>
      </div>
    )
}

function SelectDay(props){
  let day_list = [
    {"day_num":1, "day_name":"Monday"},
    {"day_num":2, "day_name":"Tuesday"},
    {"day_num":3, "day_name":"Wednesday"},
    {"day_num":4, "day_name":"Thursday"},
    {"day_num":5, "day_name":"Friday"},
    {"day_num":6, "day_name":"Saturday"},
    {"day_num":7, "day_name":"Sunday"}]

  let optionItems = day_list.map((day) => <option key={day.day_num} value={day.day_num}>{day.day_name}</option>);

  return(
    <div className="inline-block mr12">
      <div className="select-container">
        <select onChange={props.handleDayChange} value={props.dayValue} className="select select--border-darken10">
              {optionItems}
        </select>
        <div className="select-arrow"></div>
      </div>
    </div>
  )
}

function SelectToggle(props){
  let options = ["Parking Class", "Parking Rate"]

  const renderOptions = (option) => {
      return (
        <label key={option} className="toggle-container">
          <input onChange={props.handleViewChange} checked={props.checkedValue===option} value={option} name="toggle" type="radio" />
          <div className="toggle toggle--active-darken75 toggle--darken25">{option}</div>
        </label>
      );
    }

  return(
    <div className="left toggle-group mt6 mb12 border border--2 border--white bg-white shadow-darken10">
         {options.map(renderOptions)}
    </div>
  )
}

function ParkingRateView(){
   return (

     <div className='w240 mt12 txt-s'>
      <strong className='block mb6'>Parking Rate</strong>
      <div className='grid mb6'>
        <div className='col h12' style={{backgroundColor: "#6105ff"}}></div>
        <div className='col h12' style={{backgroundColor: "#af3d87"}}></div>
        <div className='col h12' style={{backgroundColor: "#cb525a"}}></div>
        <div className='col h12' style={{backgroundColor: "#e56532"}}></div>
        <div className='col h12' style={{backgroundColor: "#fe770c"}}></div>
        <div className='col h12' style={{backgroundColor: "#ff9807"}}></div>
        <div className='col h12' style={{backgroundColor: "#ffb605"}}></div>
        <div className='col h12' style={{backgroundColor: "#ffd302"}}></div>
        <div className='col h12' style={{backgroundColor: "#ffee00"}}></div>
      </div>
      <div className='grid txt-s'>
        <div className='col flex-child--grow'>$0/hour</div>
        <div className='col flex-child--grow align-r'>$5/hour</div>
      </div>
    </div>

   )
 }

function ClassView(){
  return (
    <div>
      <span className="txt-m mt12 block"><span className='inline-block w12 h12 round-full bg-blue-light'></span>  Passenger Vehicle</span>
      <span className="txt-m block"><span className='inline-block w12 h12 round-full bg-green'></span>  Loading Zone</span>
      <span className="txt-m block"><span className='inline-block w12 h12 round-full bg-red'></span>  Taxi Zone</span>
      <span className="txt-m block"><span className='inline-block w12 h12 round-full bg-yellow'></span>  Calgary Transit Access</span>
    </div>
  )
}

function Rules(props){
  if(props.rules==="Parking Rate"){
    return <ParkingRateView  />
  }
  return <ClassView />

}

function RulesContainer(props) {
  return (
    <div className={rulesStyles.container}>
      <div className="prose">
        <h4>On-Street Parking Rules Map</h4>
        <p className='txt-xs'>Click on the filters below to see parking class type and rates in Calgary</p>
        <SelectToggle checkedValue={props.view} handleViewChange={props.onViewChange}/>
        <SelectDay dayValue={props.day} handleDayChange={props.onDayChange}/>
        <SelectTime timeValue={props.time} handleTimeChange={props.onTimeChange}/>

        <Rules rules={props.viewcontext}/>
      </div>
    </div>
  )
}

export default RulesContainer
