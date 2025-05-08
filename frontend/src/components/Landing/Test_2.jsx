// CodeFlowScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

function BranchBox({ position, label, color = 'skyblue' }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, 0.7, 0]} fontSize={0.3} color="white">
        {label}
      </Text>
    </group>
  );
}

function MovingCode({ path }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() % 6) / 6; // Loop every 6 seconds
    const [start, middle, end] = path;
    const currentPos =
      t < 0.5
        ? start.map((s, i) => s + (middle[i] - s) * (t * 2))
        : middle.map((m, i) => m + (end[i] - m) * ((t - 0.5) * 2));
    meshRef.current.position.set(...currentPos);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default function CodeFlowScene() {
  const dev = [-4, 0, 0];
  const ai = [0, 0, 0];
  const master = [4, 0, 0];

  return (
    <Canvas camera={{ position: [0, 3, 10], fov: 50 }} style={{ height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BranchBox position={dev} label="dev" color="orange" />
      <BranchBox position={ai} label="IntelliCodeAI" color="purple" />
      <BranchBox position={master} label="master" color="green" />
      <MovingCode path={[dev, ai, master]} />
      <OrbitControls />
    </Canvas>
  );
}
