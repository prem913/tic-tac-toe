import React from 'react'

import { motion } from 'framer-motion';
import Button from './Buttons';
function Alert({children,setAlert}) {
    return (
    <motion.div className="alert">
    <motion.div
    className="alert-wrap"
    initial={{y:"-100%"}}
    exit={{y:"-100%",opacity:0}}
    animate={{y:"0",opacity:1}}
    transition={{type:"spring",
     stiffness:2000,
     damping:30
 }} 
      >
    <h2>
    {children}
    </h2>
    <div>
        <Button onClick={()=>setAlert("")}>close</Button>
    </div>
  </motion.div></motion.div>
    )
}

export default Alert;
