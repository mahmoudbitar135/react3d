import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three';

const OrbitControlledEarth = ({
    displayConfig = {
        visible: false,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    },
    earthRef
}) => {
    const { scene } = useGLTF("/models/earth.glb");
    const ref = useRef();
    const groupRef = useRef();
    const controlsRef = useRef();
    const nightLight = true;
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState([0,0,0]);

    useEffect(() => {
    }, [JSON.stringify(displayConfig)]);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.004;
            // earthRef.current.rotation.y += 0.007;

            if (controlsRef.current) {
                // Update the target of the controls to the current position of the Earth
                controlsRef.current.target.copy(ref.current.position);
                controlsRef.current.update();
            }
        }
    })

    return (
        true &&
        <>
            <group ref={groupRef}>
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

                <animated.primitive
                    ref={ref}
                    object={scene}
                    scale={[1, 1, 1]}
                    // position={[0, 0, 0]}
                    // rotation={displayConfig.rotation}
                />
            </group>
            <OrbitControls
                target={[500, 100, 0]}
                ref={controlsRef}
                enabled={true} // the controls can be disabled by setting this to false
                enableZoom={false}
                enablePan={false}              // Disable panning
                minPolarAngle={Math.PI / 2}    // Lock vertical rotation
                maxPolarAngle={Math.PI / 2}    // Lock vertical rotation
            />
        </>
    );
}

export default OrbitControlledEarth;