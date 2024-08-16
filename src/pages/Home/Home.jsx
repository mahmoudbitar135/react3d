import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import './home.css';

import Earth, { EARTH_MOVES } from '../../components/Earth';
import StarsConvas from '../../components/Stars';
import Moon from '../../components/Moon';
import Astronaut from '../../components/Astronaut';
import Question from '../../components/Question';
import { getRandomQuestions } from '../../utils';
import { getContentConfig } from '../../components/constants/content';
import { NUMBER_OF_QUESTIONS } from '../../components/constants/constants';
import { getScoreTitle } from '../../utils/common';
import Content from '../../components/Content';

const Home = () => {
	const earthRef = useRef();
	const [contentStepsData, setContentStepsData] = useState(getRandomQuestions(NUMBER_OF_QUESTIONS));
	const [score, setScore] = useState(0);
	const [currentContentIndex, setCurrentQuestionIndex] = useState(0);
	const [QuestionsVisible, setQuestionsVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadedModelsCount, setLoadedModelsCount] = useState(0);
	const [loadingProgress, setLoadingProgress] = useState(0);

	useEffect(() => {
		setLoading(loadedModelsCount < 100);
	}, [loadedModelsCount]);

	console.log({ loading, loadedModelsCount });

	useEffect(() => {
		const randomQuestions = getRandomQuestions(NUMBER_OF_QUESTIONS);

		const contentSteps = [
			{ // For the Welcome content
				isQuestion: false,
				title: `${NUMBER_OF_QUESTIONS} Questions`,
				description: `Hello and welcome! Are you ready to put your knowledge to the test? In this quiz, you will face ${NUMBER_OF_QUESTIONS} questions. Try to answer as many as you can correctly. Good luck and have fun!`,
				submitText: "Start Quiz",
				onSubmit: onContentSubmit,
			},
			...randomQuestions.map(q => ({ isQuestion: true, ...q })),
			{ // For the score content
				isQuestion: false,
				isScore: true,
				title: "",
				score: `${score}/${NUMBER_OF_QUESTIONS}`,
				description: `Hope you enjoyed the experince! Thank you?`,
				submitText: "Try Again?",
				onSubmit: () => setCurrentQuestionIndex(0),
			},
		];

		const contentConfig = getContentConfig();

		setContentStepsData(contentSteps.map((content, index) => ({
			...content,
			...contentConfig[index],
		})))
	}, []);

	useEffect(() => {
		if (currentContentIndex === NUMBER_OF_QUESTIONS + 1) {
			setQuestionsVisible(false);
		}
	}, [currentContentIndex]);

	const onContentSubmit = () => {
		setQuestionsVisible(true);
		setCurrentQuestionIndex(pre => pre + 1);
	}

	console.log({ score });

	const onQuestionSubmit = (isCorrectAnswer) => {
		console.log({ isCorrectAnswer });
		setScore(pre => pre + (isCorrectAnswer ? 1 : 0));
		setQuestionsVisible(false);

		setTimeout(() => {
			setCurrentQuestionIndex(currentContentIndex + 1);

			if (currentContentIndex !== NUMBER_OF_QUESTIONS) {
				setQuestionsVisible(true);
			}
		}, 600); // This delay should match the exit animation duration plus 100 ms
	}

	console.log({loadedModelsCount});
	return (
		<section className="main-section-container">
			<div className="content">
				{
					loading && (
						<div className="loading-container">
							LOADING
						</div>
					)
				}
				{
					!loading && (
						<>
							<StarsConvas loading={loading} />
							<AnimatePresence>
								{
									!contentStepsData[currentContentIndex].isQuestion && <Content
										title={contentStepsData[currentContentIndex].isScore ? getScoreTitle(score) : contentStepsData[currentContentIndex].title}
										description={contentStepsData[currentContentIndex].description}
										submitText={contentStepsData[currentContentIndex].submitText}
										onSubmit={contentStepsData[currentContentIndex].onSubmit}
										score={score}
										isScore={contentStepsData[currentContentIndex].isScore}
									/>
								}
								{
									QuestionsVisible && <Question
										key={currentContentIndex}
										questionObject={contentStepsData[currentContentIndex]}
										questionNumber={currentContentIndex}
										onSubmit={onQuestionSubmit}
									/>
								}
							</AnimatePresence>
						</>
					)
				}

				<Canvas className="basic-canvas" gl={{}} camera={{ position: [0, 0, 200], fov: contentStepsData[currentContentIndex]?.earth_movement === EARTH_MOVES.FORTH_MOVE.key ? 40 : 40 }}>
					<Earth currentMove={contentStepsData[currentContentIndex].earth_movement} earthRef={earthRef} />
					
					<Moon currentMove={contentStepsData[currentContentIndex].moon_movement} />
					<Astronaut onLoad={(progress) => setLoadedModelsCount(progress)} currentMove={contentStepsData[currentContentIndex].astronaut_movement} />
				</Canvas>
			</div>
		</section>
	)
}
{/* <SpaceShip position={[140, 20, 50]} rotation={[0.3, 0, 0]} />  */ }
export default Home;
