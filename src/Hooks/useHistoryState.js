import { useRef, useState,useCallback } from "react";

const useHistoryState=(initial)=>{
    const [state,setState] = useState(initial);
    const states = useRef([state]);
    const pos = useRef(0);
    const sethistory=useCallback(
        (newstate) => {
            states.current=[newstate,...states.current];
            pos.current=0;
            setState(newstate);
        },
        [],
    )
    const forward=()=>{
        if(pos.current>0){
            pos.current--;
            setState(states.current[pos.current]);
        }
    }
    const backward=()=>{
        if(pos.current<states.current.length-1){
            pos.current++;
            setState(states.current[pos.current]);
        }
    }
    const reset=()=>{
        states.current=[initial];
        pos.current=0;
        setState(initial);
    }
    return [state,sethistory,backward,forward,reset];
}

export default useHistoryState;