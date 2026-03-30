'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    // Lerp pointer to actual mouse for smooth tracking
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.05)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.05)

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x += 0.001
      
      // Track mouse
      meshRef.current.rotation.y += pointer.current.x * 0.02
      meshRef.current.rotation.x -= pointer.current.y * 0.02
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y -= 0.001
      linesRef.current.rotation.z += 0.002
      
      // Offset scale slightly for pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      linesRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={[0, 5, -10]} scale={[2, 2, 2]}>
      {/* Inner solid geometry */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00f5ff" wireframe={true} transparent opacity={0.1} />
      </mesh>
      
      {/* Outer wireframe geometry */}
      <lineSegments ref={linesRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.2, 2)]} />
        <lineBasicMaterial color="#00ffcc" transparent opacity={0.3} />
      </lineSegments>
      
      {/* Core Glow */}
      <pointLight color="#00f5ff" intensity={50} distance={20} />
    </group>
  )
}
