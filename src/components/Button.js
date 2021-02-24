import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   //refactoring buttonClass --> if props.confirm is truthy, it will append button--confirm to button
   const buttonClass = classNames('button', {
      "button--confirm": props.confirm,
      "button--danger": props.danger
      });

  //add an onclick and disabled prop to the Button component 
   return (
   <button 
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      
   >
      {props.children}
   </button>
   );
}