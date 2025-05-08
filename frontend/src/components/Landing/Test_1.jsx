// CubeScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RotatingCube() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

export default function CubeScene() {
  return (
    <Canvas style={{ height: '100vh', background: '#111' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
      <OrbitControls />
    </Canvas>
  );
}
