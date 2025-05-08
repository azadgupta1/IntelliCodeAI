// components/IntelliCodeAI.jsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function IntelliCodeAI({ position }) {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial emissive="#a855f7" color="#e9d5ff" />
    </mesh>
  )
}
