import React from "react";
import classNames from "classnames";
import { action } from "@storybook/addon-actions/dist/preview";
import "components/InterviewListItem.scss";


export default function InterviewListItem(props) {

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })


  return (
  <li className={interviewClass} onClick={action("setInterviewer")}>
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
    {props.name}
  </li>
  );
}