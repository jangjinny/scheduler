import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const mapDays = props.days.map(day => {

    return (
    <DayListItem 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
    )

  });
  
  return (<ul> {mapDays} </ul>);
};
