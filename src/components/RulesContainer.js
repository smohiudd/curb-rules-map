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
    <div className="left toggle-group mt12 border border--2 border--white bg-white shadow-darken10">
         {options.map(renderOptions)}
    </div>
  )
}

function Rules(props){

  let output = null

  if(props.rules=="Parking Class"){
    output = ""
  }else{
    output = ""
  }

  return(
    <div>
      <h4>{output}</h4>
    </div>
  )
}

function RulesContainer(props) {
  return (
    <div className={rulesStyles.container}>
      <div className="prose">
        <h3>Parking Rules</h3>
        <p className='txt-s'>Click on the filters below to see parking classes and rates in Calgary</p>
        <SelectDay dayValue={props.day} handleDayChange={props.onDayChange}/>
        <SelectTime timeValue={props.time} handleTimeChange={props.onTimeChange}/>
        <SelectToggle checkedValue={props.view} handleViewChange={props.onViewChange}/>
        <Rules rules={props.viewcontext}/>
      </div>
    </div>
  )
}

export default RulesContainer
