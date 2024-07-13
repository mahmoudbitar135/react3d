import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';


export const MOON_MOVES = {
    INITIAL_MOVE: {
        key: 'INITIAL_MOVE',
        position: [-240, 0, -300],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.002,
    },
    FIRST_MOVE: {
        key: 'FIRST_MOVE',
        position: [-250, -80, -300],
        scale: [0.3, 0.3, 0.3],
        yRotation: 0.001,
    },
    SECOND_MOVE: {
        key: 'SECOND_MOVE',
        position: [-170, -0, -400],
        scale: [1, 1, 1],
        yRotation: 0.001,
    },
};

const Moon = ({ currentMove = MOON_MOVES.INITIAL_MOVE.key }) => {
    const { scene } = useGLTF('/models/rocket_orbiting_moon.glb');
    const nightLight = true;
    const ref = useRef();

    // Use spring for animation
    const { position, scale } = useSpring({
        position: MOON_MOVES[currentMove].position,
        scale: MOON_MOVES[currentMove].scale,
        config: { tension: 90, friction: 40 }
    });

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += MOON_MOVES[currentMove].yRotation;
        }
    })

    return (
        <group>
            {/* {
                nightLight
                    ? <directionalLight position={[-3, 2, 1]} intensity={0.2} />
                    : (
                        <>
                            <directionalLight position={[-1, 2, 1]} intensity={1} />
                            <directionalLight position={[-4, 0, 1]} intensity={1} />
                        </>
                    )
            } */}

            {/* illuminates all the objects in the scene equally without casting shadows */}
            {/* <ambientLight intensity={1} /> */}
            <animated.primitive
                ref={ref}
                object={scene}
                scale={scale}
                position={position}
                rotation={[0.2, 0, 0]}
            />
        </group>
    )
}

export default Moon;

useGLTF.preload('/rocket_orbiting_moon.glb')