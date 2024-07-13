import { PointMaterial, Points, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = () => {
    const ref = useRef();

    // 5000 particles
    // TODO: check what is it random
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });
    const brightStars = random.inSphere(new Float32Array(50), { radius: 1.2 });

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 30;
        // ref.current.rotation.y -= delta / 30;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}

                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
            {/* {brightStars.map((position, index) => (
                <pointLight
                    key={index}
                    position={position}
                    color="#ffffff"
                    intensity={4} // Adjust intensity as needed
                    distance={5} // Adjust distance as needed
                />
            ))} */}
        </group>
    )
}

const StarsConvas = () => {
    return (
        <div className="starts-container">
            <Canvas
                camera={{ position: [0, 0, 1] }}
            >
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    )
}

export default StarsConvas;
