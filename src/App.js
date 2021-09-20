import {  useRef, useState } from 'react';
import './App.css';
import Board from './components/Board';
import { check } from './services';
import useHistoryState from './Hooks/useHistoryState';
import Alert from './components/Alert';
import Button from './components/Buttons';
import { AnimatePresence,motion } from 'framer-motion';
import useTimer from './Hooks/useTimer';
const players = ["O","X"];
const initial = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
function App() {
  const [state,setState,backward,forward,resetHistory]=useHistoryState(initial);
  const [alert,setAlert] = useState("");
  const [paused,pause] = useState(true);
  const [cheats,setCheats] = useState(false);
  const [dropdown,showDropdown] = useState(false);
  const player = useRef(0);
  const wins = useRef({x:0,o:0});
  const [timer,setTimer] = useState(3000);
  const [time,resetTimer,clear]= useTimer(timer,()=>{
    player.current===0?player.current=1:player.current=0;
    setAlert("Player - "+players[player.current]+" wins(Timeout)")
    if(player.current===1){
      wins.current={x:wins.current.x+1,o:wins.current.o};
    }
    else{
      wins.current={x:wins.current.x,o:wins.current.o+1};
    }
    setState(initial)
  });
  const handleclick=async(n)=>{
    if(state[n]===-1){
    !cheats && resetTimer();
      const newstate=[...state.slice(0,n),player.current,...state.slice(n+1,state.length)];
      setState(newstate);
      check(newstate,(p)=>{
        if(p===2){
          setAlert("Draw");
          setState(initial);
          clear();
          return;
        }
        setAlert("Player-"+players[p]+" wins");
        clear();
        setState(initial);
        if(p===1){
          wins.current={x:wins.current.x+1,o:wins.current.o};
        }
        else{
          wins.current={x:wins.current.x,o:wins.current.o+1};
        }
      });
      player.current=player.current===0?1:0;
    }
  }
  const startGame=()=>{
    pause(false);
  }
  const reset=()=>{
    player.current=0;
    wins.current={x:0,o:0}
    resetHistory();
    pause(true);
    clear();
  }
  return(
    <>
      { !paused && 
        <div className="app">
        <div className="game">
          <div style={{
            width:"100%"
          }}>
              <div>
          {!cheats && <h2>Timer : {time}</h2>}
            <b>
            Current player : {player.current===0? "O":"X"}
            </b>
              </div>
              <div style={{
                width:"100%",
                display:'flex',
                justifyContent:'space-between',
                margin:"1rem 0"
              }}>
                <b>X:<b style={{color:"var(--y)"}}>{wins.current.x}</b></b>
                <b>O:<b style={{color:"var(--y)"}}>{wins.current.o}</b></b>
              </div>
          </div>
    <Board state={state} handleclick={handleclick}/>
    <div >
      {cheats && 
      <>
      <Button onClick={backward}><b>Backward</b></Button>
      <Button onClick={forward}><b>Forward</b></Button>
      </>
}
      <Button onClick={reset}><b>Reset</b></Button>
    </div>
    </div></div>}
    {paused &&  
        <div className="app">
      <motion.h1
      initial={{scale:0.8}}
      animate={{scale:1}}
      whileHover={{scale:0.8}}
      transition={
        {
          type:"spring",
          stiffness:1000,
          damping:10
        }
      }
      >
        Tic-Tac-Toe
      </motion.h1>
    <div className="menu">
      <Button onClick={startGame}><h1>Start</h1></Button>
      <Button onClick={()=>{setCheats(!cheats)}}>Cheats : {cheats?"On":"Off"}</Button>
      {!cheats && <><div><b>Timer: {timer}</b><Button onClick={()=>showDropdown(!dropdown)}>Change</Button></div>
      <div className="dropdown" style={dropdown?{
        transform:"translateY(0)",
        opacity:'1',
      }:{}}>
      <Button onClick={()=>setTimer(1000)}>1000</Button>
      <Button onClick={()=>setTimer(2000)}>2000</Button>
      <Button onClick={()=>setTimer(3000)}>3000</Button>
      </div></>}
    </div>
    </div>
  }
    <AnimatePresence>
    {alert!=="" && <Alert children={alert} setAlert={setAlert} />}
    </AnimatePresence>
    </>
  )
}

export default App;
