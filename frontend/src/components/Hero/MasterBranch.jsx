// components/MasterBranch.jsx
import React from 'react'
import CodeLine from './CodeLine'

export default function MasterBranch({ position }) {
  return (
    <group position={position}>
      {/* Monitor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Green Lines of Code coming in */}
      {Array.from({ length: 3 }).map((_, i) => (
        <CodeLine
          key={i}
          position={[0, 0.3 * i - 0.5, -0.5]}
          color="green"
          direction="in"
        />
      ))}
    </group>
  )
}
