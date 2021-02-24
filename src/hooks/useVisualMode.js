import { useState } from "react";

export default function useVisualMode(initial) {
  const [ history, setHistory ] = useState([initial]); //array with initial value

  // function that will allow us to advance to any other mode
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => 
        [...prev.slice(0, prev.length-1), newMode] // replace the last element in history with newMode 1, 1, new mode 
      )
    } else {
      setHistory(prev => 
        [...prev, newMode] // add newMode to history
      );
    }
  }


  // function will allow us to return to the previous mode
  const back = () => {

    if (history.length > 1) {
      setHistory(prev => 
        [...prev.slice(0, prev.length-1)]

      );
    };
  };

  const mode = history[history.length-1];
  return { mode, transition, back };
};