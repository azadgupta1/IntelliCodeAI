// Hero.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Cloud, Sky } from '@react-three/drei'
import DevBranch from './DevBranch'
import IntelliCodeAI from './IntelliCodeAI'
import MasterBranch from './MasterBranch'

export default function Hero() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <color attach="background" args={['#f3e8ff']} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Cloud position={[0, 5, -10]} speed={0.2} opacity={0.2} />
      <DevBranch position={[-5, 0, 0]} />
      <IntelliCodeAI position={[0, 0, 0]} />
      <MasterBranch position={[5, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
