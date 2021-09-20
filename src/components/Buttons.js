import React from 'react';
import {motion} from 'framer-motion';
function Button({onClick,children}) {
    return (
        <motion.button
        onClick={onClick}
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
        transition={{type:"spring",
        stiffness:2000,
        damping:30
    }}
        >
            {children}
        </motion.button>
    )
}

export default Button;
