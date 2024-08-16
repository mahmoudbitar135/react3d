import React from 'react';
import { motion } from 'framer-motion';

const Question = ({ questionNumber, questionObject, onSubmit }) => {

    return (
        <motion.div
            className={`question-outer-container ${questionObject.alignment}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="question-inner-container">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className='home-title'
                >
                    Q {questionNumber}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className='question-text'
                >
                    {questionObject.question}
                </motion.p>

                <div className="question-options-container">
                    {
                        questionObject.options.map((option, optionIndex) => (
                            <div className="animated-button-container">
                                <motion.button
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 2 }}
                                    onClick={() => onSubmit(optionIndex === questionObject.answer_index)}
                                >
                                    {option}
                                </motion.button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    );
}

export default Question;