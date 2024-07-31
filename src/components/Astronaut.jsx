import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF, useProgress } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { apply_new_rotation } from '../utils/common';
import { NO_CHANGE } from './constants/constants';

const ANIMATION_NAMES = {
    float: 'float',
    jumpUp: 'jumpUp',
    jumpDown: 'jumpDown',
    moonwalk: 'moonwalk',
    strafeLef: 'strafeLef',
    strafeRight: 'strafeRight',
    run: 'run',
    silly: 'silly',
};

export const ASTRONAUT_MOVES = {
    INITIAL_MOVE: {
        key: 'INITIAL_MOVE',
        position: [0, -2.5, 199.4],
        rotation: [-0.2, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.0,
        xPositionSpeed: 0.0,
        model_animation: ANIMATION_NAMES.float,
    },
    FIRST_MOVE: {
        key: 'FIRST_MOVE',
        position: [6, -1, 185],
        rotation: [0, -0.5, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.0,
        xPositionSpeed: 0.0,
        model_animation: ANIMATION_NAMES.float,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [-5, 1, 185],
        rotation: [0, 1, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.006,
        xPositionSpeed: 0.006,
        model_animation: ANIMATION_NAMES.float,
    },
    THIRD_MOVE: {
        key: 'THIRD_MOVE',
        position: [4, 1, 185],
        rotation: [0, -0.5, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.006,
        xPositionSpeed: -0.006,
        model_animation: ANIMATION_NAMES.float,
    },
    FORTH_MOVE: {
        key: 'FORTH_MOVE',
        position: [-5, 0, 185],
        rotation: [0, 1, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.006,
        xPositionSpeed: 0.006,
        model_animation: ANIMATION_NAMES.float,
    },
    FIFTH_MOVE: {
        key: 'FIFTH_MOVE',
        position: [6, 1, 185],
        rotation: [0, -0.5, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.006,
        xPositionSpeed: -0.006,
        model_animation: ANIMATION_NAMES.float,
    },
    SEXTH_MOVE: {
        key: 'SEXTH_MOVE',
        position: [6, -3, 186],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0,
        xPositionSpeed: 0,
        model_animation: ANIMATION_NAMES.float,
    },
    SEVENTH_MOVE: {
        key: 'SEVENTH_MOVE',
        position: [0, -2, 191],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0,
        xPositionSpeed: 0,
        model_animation: ANIMATION_NAMES.strafeRight,
    },
    EIGHTH_MOVE: {
        key: 'EIGHTH_MOVE',
        position: [0, -2, 191],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0,
        xPositionSpeed: 0,
        model_animation: ANIMATION_NAMES.run,
    },
    NINETH_MOVE: {
        key: 'NINETH_MOVE',
        position: [0, -2, 191],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0,
        xPositionSpeed: 0,
        model_animation: ANIMATION_NAMES.run,
    },
    TENTH: {
        key: 'TENTH',
        position: [0, -2, 191],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0,
        xPositionSpeed: 0,
        model_animation: ANIMATION_NAMES.silly,
    },
};

const Astronaut = ({ currentMove = ASTRONAUT_MOVES.INITIAL_MOVE.key, onLoad }) => {
    const { scene, animations } = useGLTF('/models/astronaut.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const nightLight = true;
    const modelRef = useRef();
    const lightRef = useRef();

    const [currentRotation, setCurrentRotation] = useState(ASTRONAUT_MOVES[currentMove].rotation);
    const [currentPosition, setCurrentPosition] = useState(ASTRONAUT_MOVES[currentMove].position);
    // 1 for original direction, -1 for the opposite direction
    const [xDirection, setXDirection] = useState(1);

    const { active, progress } = useProgress();

    useEffect(() => {
        onLoad(progress);
    }, [active, progress]);

    useEffect(() => {
        setXDirection(1);
        setCurrentPosition(ASTRONAUT_MOVES[currentMove].position);
        setCurrentRotation(apply_new_rotation(ASTRONAUT_MOVES[currentMove].rotation, currentRotation));
    }, [currentMove]);

    useEffect(() => {
        if (lightRef.current && modelRef.current) {
            lightRef.current.target = modelRef.current;
        }
    }, []);

    useEffect(() => {
        if (actions) {
            // Get the previous and current actions
            const previousAction = actions[Object.keys(actions).find(name => actions[name].isRunning())];
            const newAction = actions[ASTRONAUT_MOVES[currentMove].model_animation];

            // Fade out the previous action
            if (previousAction) {
                previousAction.crossFadeTo(newAction, 0.5, true);
            } else {
                newAction.fadeIn(0.5).play();
            }

            // Play the new action
            newAction.reset().play();
        }
    }, [actions, ASTRONAUT_MOVES[currentMove].model_animation]);

    // Use spring for animation
    const { position, scale, rotation } = useSpring({
        position: currentPosition,
        rotation: currentRotation,
        scale: ASTRONAUT_MOVES[currentMove].scale,
        config: { tension: 90, friction: 40 }
    });

    const screenBounds = { left: -10, right: 10 };

    useFrame(() => {
        if (modelRef.current) {
            if (ASTRONAUT_MOVES[currentMove].xPositionSpeed || ASTRONAUT_MOVES[currentMove].xRotationSpeed) {
                const [x] = currentPosition;
                let yRotation = currentRotation[1];
                let newXRedirection = xDirection;

                // Check bounds and reverse direction if needed
                if (x > screenBounds.right) {
                    newXRedirection *= -1;
                    setXDirection(newXRedirection);
                    // Change astronut face to the opposite side
                    yRotation = -0.5;
                } else if (x < screenBounds.left) {
                    newXRedirection *= -1;
                    setXDirection(newXRedirection);
                    // Change astronut face to the opposite side
                    yRotation = 1;
                }

                setCurrentPosition([x + ASTRONAUT_MOVES[currentMove].xPositionSpeed * newXRedirection, currentPosition[1], currentPosition[2]]);
                setCurrentRotation([currentRotation[0] + ASTRONAUT_MOVES[currentMove].xRotationSpeed, yRotation, currentRotation[2]]);
            }
        }
    })

    return (
        <group>
            < animated.primitive
                ref={modelRef}
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </group>
    )
}

export default Astronaut;

useGLTF.preload('/models/astronaut.glb');