// components/CodeLine.jsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CodeLine({ position, color, direction }) {
  const ref = useRef()

  useFrame(() => {
    if (direction === 'right') ref.current.position.x += 0.02
    else if (direction === 'in') ref.current.position.x -= 0.02
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.8, 0.05, 0.05]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
