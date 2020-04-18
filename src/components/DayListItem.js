import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames"

export default function DayListItem(props) {
  const formatSpots = () => props.spots > 0 ? (props.spots === 1 ? `${props.spots} spot remaining` : `${props.spots} spots remaining`) : `no spots remaining`;
  const dayClass = classnames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li
      className={dayClass}
      onClick={props.onChange}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}