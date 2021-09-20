import { motion } from 'framer-motion';
import React from 'react'
import Pieces from '../pieces';

function Board({state,handleclick}) {
    return (
        <motion.div className="board" 
        initial={{
            scale:0.7
        }}
        animate={{
            scale:1
        }}
        transition={
          {
            type:"spring",
            stiffness:1000,
            damping:10
          }}
        drag
        dragConstraints={{
            top:0,
            bottom:0,
            right:0,
            left:0
        }}
        whileDrag={{cursor:"move",scale:0.8}}
        >
            <div style={{
                display:"flex"
            }}>
            <Pieces state={state[0]} handleclick={()=>handleclick(0)} />
            <Pieces state={state[1]} handleclick={()=>handleclick(1)} />
            <Pieces state={state[2]} handleclick={()=>handleclick(2)} />
            </div>
            <div style={{
                display:"flex"
            }}>
            <Pieces state={state[3]} handleclick={()=>handleclick(3)} />
            <Pieces state={state[4]} handleclick={()=>handleclick(4)} />
            <Pieces state={state[5]} handleclick={()=>handleclick(5)} />
            </div>
            <div style={{
                display:"flex"
            }}>
            <Pieces state={state[6]} handleclick={()=>handleclick(6)} />
            <Pieces state={state[7]} handleclick={()=>handleclick(7)} />
            <Pieces state={state[8]} handleclick={()=>handleclick(8)} />
            </div>
        </motion.div>
    )
}

export default Board;
