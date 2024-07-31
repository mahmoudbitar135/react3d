import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF, useProgress } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { COMPLETE_ROTATION, NO_CHANGE } from './constants/constants';
import { apply_new_rotation } from '../utils/common';

export const MOON_MOVES = {
    INITIAL_MOVE: {
        key: 'INITIAL_MOVE',
        position: [-270, 0, -300],
        rotation: [0.2, 0, 0],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.002,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FIRST_MOVE: {
        key: 'FIRST_MOVE',
        position: [-240, 0, -300],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.002,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [-250, -80, -300],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.001,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    THIRD_MOVE: {
        key: 'THIRD_MOVE',
        position: [-180, -60, -300],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.003,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FORTH_MOVE: {
        key: 'FORTH_MOVE',
        position: [300, 50, -350],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.003,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FIFTH_MOVE: {
        key: 'FIFTH_MOVE',
        position: [390, 150, -500],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        scale: [0.4, 0.4, 0.4],
        yRotation: 0.0008,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    SEXTH_MOVE: {
        key: 'SEXTH_MOVE',
        position: [-60, 0, -250],
        rotation: [NO_CHANGE, -0.5, NO_CHANGE],
        scale: [0.5, 0.5, 0.5],
        yRotation: 0.000,
        zPositionSpeed: 0.4,
        yPositionSpeed: -0.008,
    },
    SEVENTH_MOVE: {
        key: 'SEVENTH_MOVE',
        position: [-60, -8, 250],
        rotation: [NO_CHANGE, -0.5, NO_CHANGE],
        scale: [0.5, 0.5, 0.5],
        yRotation: 0.000,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
};

const Moon = ({ currentMove = MOON_MOVES.INITIAL_MOVE.key }) => {
    const { scene } = useGLTF('/models/rocket_orbiting_moon.glb');
    const ref = useRef();
    
    const [currentPosition, setCurrentPosition] = useState(MOON_MOVES[currentMove].position);
    const [currentRotation, setCurrentRotation] = useState(MOON_MOVES[currentMove].rotation);

    // Use spring for animation
    const { position, rotation, scale } = useSpring({
        position: currentPosition,
        rotation: currentRotation,
        scale: MOON_MOVES[currentMove].scale,
        config: { tension: 90, friction: 40 }
    });

    useEffect(() => {
        setCurrentPosition(MOON_MOVES[currentMove].position);
        setCurrentRotation(apply_new_rotation(MOON_MOVES[currentMove].rotation, currentRotation));
    }, [currentMove]);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += MOON_MOVES[currentMove].yRotation;

            if (MOON_MOVES[currentMove].yPositionSpeed || MOON_MOVES[currentMove].zPositionSpeed) {
                setCurrentPosition([currentPosition[0], currentPosition[1] + MOON_MOVES[currentMove].yPositionSpeed, currentPosition[2] + MOON_MOVES[currentMove].zPositionSpeed]);
            }
        }
    })

    return (
        <group>
            <animated.primitive
                ref={ref}
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </group>
    )
}

export default Moon;

// useGLTF.preload('/rocket_orbiting_moon.glb')