import React from 'react';
import { motion } from 'framer-motion';
import { NUMBER_OF_QUESTIONS } from './constants/constants';

const Content = ({ title, description, submitText, onSubmit, isScore, score }) => (
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
            {title}
        </motion.h1>
        {
            isScore && (
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='home-title'
                    style={{ marginTop: 10 }}
                >
                    {score}/{NUMBER_OF_QUESTIONS}
                </motion.h1>
            )
        }
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='home-description'
        >
            {description}
        </motion.p>

        <div className="animated-button-container">
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                onClick={onSubmit}
            >
                {submitText}
            </motion.button>
        </div>
    </motion.div>
);

export default Content;