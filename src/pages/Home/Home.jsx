import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import './home.css';

import SpaceShip from '../../components/SpaceShip';
import Earth, { EARTH_MOVES } from '../../components/Earth';
import StarsConvas from '../../components/Stars';
import WhoAmIContent from '../../components/whoIAmContent/WhoAmIContent';
import WelcomeContent from '../../components/WelcomeContent';
import Moon, { MOON_MOVES } from '../../components/Moon';
import Astronaut, { ASTRONAUT_MOVES } from '../../components/Astronaut';
import SpaceWelcomeContent from '../../components/SpaceWelcomeContent';

const Home = () => {
	const earthRef = useRef();
	const [earthCurrentMove, setEarthCurrentmove] = useState(EARTH_MOVES.INITIAL_MOVE.key);
	const [moonCurrentMove, setMoonCurrentmove] = useState(MOON_MOVES.INITIAL_MOVE.key);
	const [astronautCurrentMove, setAstronautCurrentmove] = useState(ASTRONAUT_MOVES.INITIAL_MOVE.key);
	const [welcomeContentVisible, setWelcomeContentVisible] = useState(true);
	const [spacewelcomeContentVisible, setSpaceWelcomeContentVisible] = useState(false);
	const [whoAmIcontentVisible, setWhoAmIContentVisible] = useState(false);

	const onWelcomeContentSubmit = () => {
		setWelcomeContentVisible(false);
		setSpaceWelcomeContentVisible(true);
		setAstronautCurrentmove(ASTRONAUT_MOVES.FIRST_MOVE.key);
	}

	const onSpaceWelcomeContentSubmit = () => {
		setSpaceWelcomeContentVisible(false);
		setWhoAmIContentVisible(true);
		setAstronautCurrentmove(ASTRONAUT_MOVES.SECOND_MOVE.key);
		setEarthCurrentmove(EARTH_MOVES.FIRST_MOVE.key);
		setMoonCurrentmove(MOON_MOVES.FIRST_MOVE.key);
	}

	const onWhoAmIContentSubmit = () => {
		setWhoAmIContentVisible(false);
		setWhoAmIContentVisible(false);
		setAstronautCurrentmove(ASTRONAUT_MOVES.THIRD_MOVE.key);
		setEarthCurrentmove(EARTH_MOVES.SECOND_MOVE.key);
		setMoonCurrentmove(MOON_MOVES.SECOND_MOVE.key);
	}

	return (
		<section className="main-section-container">
			<StarsConvas />

			<div className="content">
				<AnimatePresence>
					{welcomeContentVisible && <WelcomeContent onSubmit={onWelcomeContentSubmit} />}
					{spacewelcomeContentVisible && <SpaceWelcomeContent onSubmit={onSpaceWelcomeContentSubmit} /> }
					{whoAmIcontentVisible && <WhoAmIContent onSubmit={onWhoAmIContentSubmit} />}
				</AnimatePresence>

				<Canvas className="basic-canvas" gl={{}} camera={{ position: [0, 0, 200], fov: earthCurrentMove !== EARTH_MOVES.INITIAL_MOVE.key ? 75 : 40 }}>
					<Earth currentMove={earthCurrentMove} earthRef={earthRef} />
					{/* <SpaceShip position={[140, 20, 50]} rotation={[0.3, 0, 0]} />  */}
					{/* <ambientLight intensity={0.5} /> */}
					{/* <pointLight position={[10, 10, 10]} /> */}
					<Moon currentMove={moonCurrentMove} />
					<Astronaut currentMove={astronautCurrentMove} />
				</Canvas>
			</div>
		</section>
	)
}

export default Home;
