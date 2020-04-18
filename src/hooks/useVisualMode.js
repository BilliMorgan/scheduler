import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(valueNew, replace = false) {
    if (replace){
      history.pop();
      setHistory(history)
    }
    setMode(valueNew)
    history.push(valueNew);
  }
  function back() {
    if(history.length > 1){
      history.pop();
      setMode(history[history.length -1])
    }
}

return { mode, transition, back };
}
