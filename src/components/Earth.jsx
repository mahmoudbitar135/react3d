import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three';
import { COMPLETE_ROTATION, NO_CHANGE } from "./constants/constants";
import { apply_new_position, apply_new_rotation } from "../utils/common";

export const EARTH_MOVES = {
    INITIAL_MOVE: {
        key: 'INITIAL_MOVE',
        position: [0, -70, -350],
        rotation: [0.2, 0.5, 0],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.002,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FIRST_MOVE: {
        key: 'FIRST_MOVE',
        position: [0, -40, -350],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.002,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [100, 0, -150],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.01,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    THIRD_MOVE: {
        key: 'THIRD_MOVE',
        position: [-100, 0, -150],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.01,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FORTH_MOVE: {
        key: 'FORTH_MOVE',
        position: [0, -80, 10],
        rotation: [-0.2, -0.4, NO_CHANGE],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.001,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FORTH_NEXT_MOVE: {
        key: 'FORTH_NEXT_MOVE',
        position: [0, -80, 10],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [0, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.001,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    FIFTH_MOVE: {
        key: 'FIFTH_MOVE',
        position: [0, -70, 30],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [6, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.0008,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    SEXTH_MOVE: {
        key: 'SEXTH_MOVE',
        position: [0, -70, 30],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [4, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.0008,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0,
        yPositionSpeed: 0,
    },
    SEVENTH_MOVE: {
        key: 'SEVENTH_MOVE',
        position: [20, -70, 50],
        rotation: [-0.4, 0.5, NO_CHANGE],
        lightPosition: [3, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.0000,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0.06,
        yPositionSpeed: -0.02,
    },
    EIGHTH_MOVE: {
        key: 'EIGHTH_MOVE',
        position: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        rotation: [-0.4, 0.5, NO_CHANGE],
        lightPosition: [1, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.0000,
        xRotationSpeed: -0.0003,
        zPositionSpeed: 0.06,
        yPositionSpeed: -0.02,
    },
    NINETH_MOVE: {
        key: 'NINETH_MOVE',
        position: [20, -110, 209],
        rotation: [NO_CHANGE, NO_CHANGE, NO_CHANGE],
        lightPosition: [2, 0, 1],
        scale: [1, 1, 1],
        yRotationSpeed: 0.0000,
        xRotationSpeed: 0.0,
        zPositionSpeed: 0.0,
        yPositionSpeed: -0.0,
    },
};

const Earth = ({ currentMove = EARTH_MOVES.INITIAL_MOVE.key, earthRef: ref }) => {
    const { scene } = useGLTF("/models/earth.glb");

    const [currentPosition, setCurrentPosition] = useState(EARTH_MOVES[currentMove].position);
    const [currentRotation, setCurrentRotation] = useState(EARTH_MOVES[currentMove].rotation);
    const [lightPosition, setLightPosition] = useState([0, 0, 1]);

    const model_spring_config = currentMove === EARTH_MOVES.SEVENTH_MOVE.key
        ? { tension: 30, friction: 20 } // Slower transition config for SEVENTH_MOVE
        : { tension: 90, friction: 40 }; // Default config

    // Use spring for animation
    const { position, scale, rotation } = useSpring({
        position: currentPosition,
        rotation: currentRotation,
        config: model_spring_config,
    });

    const lightSpring = useSpring({
        position: lightPosition,
        config: { tension: 30, friction: 20 }
    });

    useEffect(() => {
        setCurrentPosition(EARTH_MOVES[currentMove].position);
        setCurrentPosition(apply_new_position(EARTH_MOVES[currentMove].position, currentPosition));
        setCurrentRotation(apply_new_rotation(EARTH_MOVES[currentMove].rotation, currentRotation));
        setLightPosition(EARTH_MOVES[currentMove].lightPosition);
    }, [currentMove]);

    useFrame(() => {
        if (ref.current) {
            // if (EARTH_MOVES[currentMove].xRotationSpeed) {
            setCurrentRotation([currentRotation[0] + EARTH_MOVES[currentMove].xRotationSpeed, currentRotation[1] + EARTH_MOVES[currentMove].yRotationSpeed, currentRotation[2]]);

            if (EARTH_MOVES[currentMove].yPositionSpeed || EARTH_MOVES[currentMove].zPositionSpeed || EARTH_MOVES[currentMove].xRotationSpeed) {
                setCurrentPosition([currentPosition[0], currentPosition[1] + EARTH_MOVES[currentMove].yPositionSpeed, currentPosition[2] + EARTH_MOVES[currentMove].zPositionSpeed]);
            }
        }
    })

    return (
        <>
            <animated.directionalLight position={lightSpring.position} intensity={4} />
            {/* illuminates all the objects in the scene equally without casting shadows */}
            {/* <ambientLight intensity={1} /> */}
            <animated.primitive
                ref={ref}
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </>
    );
}

export default Earth;