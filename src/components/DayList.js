import React from "react";
import DayListItem from "components/DayListItem";
import "components/DayListItem.scss";

export default function DayList(props) {

  const mapDays = props.days.map(day => {

    return (
    <DayListItem
    key={day.name}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
    )

  });
  
  return (<ul> {mapDays} </ul>);
};
