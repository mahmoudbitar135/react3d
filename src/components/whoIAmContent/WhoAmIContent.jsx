import React from 'react';
import { motion } from 'framer-motion';

import './index.css';

const WhoAmIContent = ({ onSubmit }) => (
    <motion.div
        className="WhoIAmContent-container"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='WhoIAmContent-title'
        >
            who am I ?
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='WhoIAmContent-description'
        >
            Mahmoud Bitar. A passionate software engineer specialized in frontend stack and technologies
        </motion.p>

        <div className="animated-button-container">
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                onClick={onSubmit}
            >
                What do I do
            </motion.button>
        </div>
    </motion.div>
)

export default WhoAmIContent;