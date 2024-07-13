import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three';

export const EARTH_MOVES = {
    INITIAL_MOVE: {
        key: 'INITIAL_MOVE',
        position: [0, -40, -350],
        scale: [1, 1, 1],
        yRotation: 0.002,
    },
    FIRST_MOVE: {
        key: 'FIRST_MOVE',
        position: [130, 0, -150],
        scale: [1, 1, 1],
        yRotation: 0.008,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [130, 250, -150],
        scale: [1, 1, 1],
        yRotation: 0.01,
    },
    // THIRD_MOVE: {
    //     key: 'THIRD_MOVE',
    //     position: [100, 0, -150],
    //     scale: [1, 1, 1],
    //     yRotation: 0.008,
    // },
};

const Earth = ({ currentMove = EARTH_MOVES.INITIAL_MOVE.key, earthRef: ref }) => {
    const { scene } = useGLTF("/models/earth.glb");
    const nightLight = true;

    // Use spring for animation
    const { position, scale } = useSpring({
        position: EARTH_MOVES[currentMove].position,
        position: EARTH_MOVES[currentMove].position,
        config: { tension: 90, friction: 40 }
    });

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += EARTH_MOVES[currentMove].yRotation;
        }
    })

    return (
        <>
            {
                nightLight
                    ? <directionalLight position={[-3, 2, 1]} intensity={1} />
                    : (
                        <>
                            <directionalLight position={[-1, 2, 1]} intensity={1} />
                            <directionalLight position={[-4, 0, 1]} intensity={3} />
                        </>
                    )
            }

            {/* illuminates all the objects in the scene equally without casting shadows */}
            <ambientLight intensity={1} />
            <animated.primitive
                ref={ref}
                object={scene}
                scale={scale}
                position={position}
                rotation={[0.2, 0.5, 0]}
            />
        </>
    );
}

export default Earth;