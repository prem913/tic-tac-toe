import React from 'react'
import {motion} from 'framer-motion'
function Pieces({state,handleclick}) {
    return (
        <motion.div whileTap={{scale:1.1}}
        transition={{
            type:"spring",
            stiffness:1500,
            damping:20
        }}
        onClick={handleclick}
        className="piece">
            {state!==-1 && (state?
                "X":"O")}
        </motion.div>
    )
}

export default Pieces;
