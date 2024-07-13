import React from 'react';
import { motion } from 'framer-motion';

const SpaceWelcomeContent = ({ onSubmit }) => (
    <motion.div
        className="welcome-text-container"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='home-title'
        >
            Explore New Worlds
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='home-description'
        >
            Wanna see more innovative software development and cutting-edge technologies? Start your experince!
        </motion.p>

        <div className="animated-button-container">
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                onClick={onSubmit}
            >
                Start
            </motion.button>
        </div>
    </motion.div>
)

export default SpaceWelcomeContent;