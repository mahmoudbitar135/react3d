import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

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
        xRotationSpeed: 0.003,
        xPositionSpeed: -0.003,
        model_animation: ANIMATION_NAMES.float,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [-5, 1, 185],
        rotation: [0, 1, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.003,
        xPositionSpeed: 0.003,
        model_animation: ANIMATION_NAMES.float,
    },
    THIRD_MOVE: {
        key: 'THIRD_MOVE',
        position: [6, 1, 185],
        rotation: [0, -0.5, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.003,
        xPositionSpeed: -0.003,
        model_animation: ANIMATION_NAMES.float,
    },
    FORTH_MOVE: {
        key: 'FORTH_MOVE',
        position: [6, 0, 185],
        rotation: [0, -0.5, 0],
        scale: [1, 1, 1],
        xRotationSpeed: 0.0,
        xPositionSpeed: -0.0,
        model_animation: ANIMATION_NAMES.jumpDown,
    },
};

const Astronaut = ({ currentMove = ASTRONAUT_MOVES.INITIAL_MOVE.key }) => {
    const { scene, animations } = useGLTF('/models/astronaut.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const nightLight = true;
    const modelRef = useRef();
    const lightRef = useRef();

    const [currentRotation, setCurrentRotation] = useState(ASTRONAUT_MOVES[currentMove].rotation);
    const [currentPosition, setCurrentPosition] = useState(ASTRONAUT_MOVES[currentMove].position);

    useEffect(() => {
        console.log(' Changing: +++++++++++++++++++++++++++++++++++++++');
        setCurrentPosition(ASTRONAUT_MOVES[currentMove].position);
        setCurrentRotation(ASTRONAUT_MOVES[currentMove].rotation);
    }, [currentMove]);

    useEffect(() => {
        if (lightRef.current && modelRef.current) {
            lightRef.current.target = modelRef.current;
        }
    }, []);

    useEffect(() => {
        if (actions && actions[ASTRONAUT_MOVES[currentMove].model_animation]) {
            actions[ASTRONAUT_MOVES[currentMove].model_animation].play();
        }
    }, [currentMove]);

    // Use spring for animation
    const { position, scale, rotation } = useSpring({
        position: currentPosition,
        rotation: currentRotation,
        scale: ASTRONAUT_MOVES[currentMove].scale,
        config: { tension: 90, friction: 40 }
    });

    // console.log({ currentMove, currentPosition, currentRotation });
    useFrame(() => {
        if (modelRef.current) {
            // console.log('-----------------------');
            console.log('position', modelRef.current.position.toArray());
            // console.log('rotation', modelRef.current.rotation.toArray());

            // setCurrentPosition(modelRef.current.position.toArray());
            // setCurrentRotation([modelRef.current.rotation.x, modelRef.current.rotation.y, modelRef.current.rotation.z]);
            if (ASTRONAUT_MOVES[currentMove].xPositionSpeed || ASTRONAUT_MOVES[currentMove].xRotationSpeed) {
                setCurrentPosition([currentPosition[0] + ASTRONAUT_MOVES[currentMove].xPositionSpeed, currentPosition[1], currentPosition[2]]);
                setCurrentRotation([currentRotation[0] + ASTRONAUT_MOVES[currentMove].xRotationSpeed, currentRotation[1], currentRotation[2]]);
            }

            // modelRef.current.rotation.x += ASTRONAUT_MOVES[currentMove].xRotationSpeed;
            // modelRef.current.position.x += ASTRONAUT_MOVES[currentMove].xPositionSpeed;
        }
    })

    return (
        <group>
            <directionalLight ref={lightRef} position={[-0, 0, 200]} intensity={1} />
            <directionalLight ref={lightRef} position={[4, 0, 200]} intensity={1} />
            <animated.primitive
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

useGLTF.preload('/rocket_orbiting_moon.glb')