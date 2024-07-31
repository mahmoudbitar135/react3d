import { PointMaterial, Points, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useMemo, useRef } from 'react'
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = ({ loading }) => {
    const ref = useRef();

    // 5000 particles
    // TODO: check what is it random
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }), []);

    useFrame((state, delta) => {
        // ref.current.rotation.x -= delta / 30;
        // ref.current.rotation.y -= delta / 30;
        if (loading) {
            // Rotate faster and oscillate in Z-axis during loading
            ref.current.rotation.y += delta * 1.5; // Faster Y rotation
            ref.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Oscillate in Z-axis
        } else {
            // Normal animation for stars
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 30;
        }
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
        </group>
    )
}

const StarsConvas = ({loading }) => {
    return (
        <div className="starts-container">
            <Canvas
                camera={{ position: [0, 0, 1] }}
            >
                <Suspense fallback={null}>
                    <Stars loading={loading} />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}

export default StarsConvas;
