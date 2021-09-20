import {useState,useRef,useCallback, useEffect} from 'react';

const useTimer=(initial,callBack)=>{
    const [time,setTime]= useState(initial);
    const intervalId = useRef(null);
    const memoizedcallback=useCallback(()=>{
        callBack();
    },[callBack])
    const set = useCallback(
        () => {
            setTime(initial);
            intervalId.current = setInterval(()=>{
                setTime(s=>s-10);
            },10);
        },
        [initial],
    )
    const clear = useCallback(()=>{
        intervalId.current && clearInterval(intervalId.current)
    },[])
    useEffect(()=>{
        return ()=>{
            clear();
        }
    },[clear,initial])
    useEffect(()=>{
        if(time <0){
            clear();
            memoizedcallback();
        }
// eslint-disable-next-line
    },[time,clear])
    const reset=useCallback(()=>{
        clear();
        set();
    },[set,clear]);
    return [time<=0?0:time,reset,clear];
}

export default useTimer;