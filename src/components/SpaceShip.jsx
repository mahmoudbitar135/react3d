import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

const SpaceShip = ({ position, rotation }) => {
    const { scene } = useGLTF("/models/spaceShip.glb");
    const earthRef = useRef();
    const { camera, size } = useThree();
    const [is_within_screen, set_is_within_screen] = useState(true);

    // console.log({size});

    useFrame(() => {
        if (earthRef.current) {

            // console.log({ is_within_screen });
            if (!is_within_screen) {
                console.log('changing...');
                earthRef.current.position.set(position[0], position[1], position[2]);
                earthRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
            }

            earthRef.current.position.x -= 0.5;
            earthRef.current.position.y -= 0.03;
            earthRef.current.rotation.z += 0.0003;
            earthRef.current.rotation.y += 0.0001;
            earthRef.current.rotation.x += 0.0005;

            // Get object's world position
            const objectPosition = new THREE.Vector3();
            earthRef.current.getWorldPosition(objectPosition);

            // Project the object's position to 2D screen space
            const projectedPosition = objectPosition.project(camera);

            // Convert normalized device coordinates (NDC) to screen coordinates
            const x = (projectedPosition.x * 0.5 + 0.5) * size.width;
            const y = (projectedPosition.y * -0.5 + 0.5) * size.height;

            // console.log({x});
            // Check if the object is within the screen borders
            set_is_within_screen(x >= -40 && y >= 0 && y <= size.height);
            // set_is_within_screen(x >= -40 && x <= size.width && y >= 0 && y <= size.height);

            // console.log(`Object Position: [${x}, ${y}] - Within Borders: ${is_within_screen}`);
        }
    });

    return (
        <>
            <ambientLight intensity={1} />
            <primitive
                ref={earthRef}
                object={scene}
                scale={[1, 1, 1]}
                position={[...position]}
                rotation={[...rotation]}
            />
        </>
    );
}

export default SpaceShip;