import { type MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface SceneProps {
  scrollRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

function DepthParticles({ reducedMotion }: Pick<SceneProps, 'reducedMotion'>) {
  const ref = useRef<THREE.Points>(null);
  const count = reducedMotion ? 180 : 850;

  const particles = useMemo(() => {
    const temp: number[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 38;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 28;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group rotation={[0.15, 0, Math.PI / 8]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8fd3ff"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.42}
        />
      </Points>
    </group>
  );
}

function EditorialRings({ reducedMotion }: Pick<SceneProps, 'reducedMotion'>) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
      groupRef.current.rotation.y += delta * 0.09;
    }
  });

  return (
    <group ref={groupRef} position={[4.8, -0.4, -3]} rotation={[0.15, -0.4, 0.2]}>
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2, 0, ring * 0.55]}>
          <torusGeometry args={[2.4 + ring * 0.42, 0.01, 12, 120]} />
          <meshBasicMaterial color={ring === 1 ? '#d9b46d' : '#8fd3ff'} transparent opacity={ring === 1 ? 0.24 : 0.16} />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#f4efe6" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Scene({ scrollRef, reducedMotion }: SceneProps) {
  useFrame((state) => {
    const scrollRatio = Math.min(scrollRef.current / 1200, 1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollRatio * 1.2, 0.035);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, scrollRatio * 0.65, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <DepthParticles reducedMotion={reducedMotion} />
      <EditorialRings reducedMotion={reducedMotion} />
    </>
  );
}

const ThreeBackground = () => {
  const scrollRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const updateScroll = () => {
      scrollRef.current = window.scrollY;
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-90" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9], fov: 58 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Scene scrollRef={scrollRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
