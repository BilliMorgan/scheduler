import React from "react";
import DayListItem from "components/DayListItem"



//onChange(element.name) = setDay(day)
export default function DayList(props) {
  const days = props.days.map((element) => (
    <DayListItem
      key={element.id}
      name={element.name}
      spots={element.spots}
      selected={element.name === props.value}
      onChange={event => props.onChange(element.name)}
    />
  ));
    return (
    <ul>
      {days}
    </ul>
  );

}



