// components/DevBranch.jsx
import React from 'react'
import { useFrame } from '@react-three/fiber'
import CodeLine from './CodeLine'

export default function DevBranch({ position }) {
  return (
    <group position={position}>
      {/* Monitor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Red & Yellow Lines of Code shooting out */}
      {Array.from({ length: 10 }).map((_, i) => (
        <CodeLine
          key={i}
          position={[0, 0.2 * i - 1, 0.5]}
          color={i % 2 === 0 ? 'red' : 'yellow'}
          direction="right"
        />
      ))}
    </group>
  )
}
