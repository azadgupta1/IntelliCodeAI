import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Box, Html } from '@react-three/drei'

const BoxNode = ({ position, label, color }) => (
  <group position={position}>
    <Box args={[2, 1, 0.5]} position={[0, 0, 0]}>
      <meshStandardMaterial color={color} />
    </Box>
    <Text
      position={[0, 0, 0.6]}
      fontSize={0.3}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  </group>
)

const WorkflowLine = ({ points, color }) => (
  <line>
    <bufferGeometry attach="geometry">
      <bufferAttribute
        attach="attributes-position"
        count={points.length}
        array={new Float32Array(points.flat())}
        itemSize={3}
      />
    </bufferGeometry>
    <lineBasicMaterial attach="material" color={color} />
  </line>
)

const WorkflowScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />

      {/* DEV BRANCH */}
      <BoxNode position={[-6, 0, 0]} label="Dev Branch" color="#1f2937" />

      {/* MIDDLE BOX (Codacy) */}
      <BoxNode position={[0, 0, 0]} label="Codacy" color="#3b82f6" />

      {/* MASTER BRANCH */}
      <BoxNode position={[6, 0, 0]} label="Master Branch" color="#065f46" />

      {/* Flow lines */}
      <WorkflowLine points={[[-4, 0, 0], [-2, 0, 0]]} color="orange" />
      <WorkflowLine points={[[2, 0, 0], [4, 0, 0]]} color="green" />

      {/* Optional controls */}
      <OrbitControls />
    </Canvas>
  )
}

export default WorkflowScene
