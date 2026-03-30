'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'

export function CyberOrb() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  
  const particles = useMemo(() => {
    const pts = []
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2
      const radius = 1.3 + Math.random() * 0.7
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1.0))
    }
    return pts
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
        groupRef.current.rotation.y += 0.003
        groupRef.current.rotation.z += 0.001
    }
    if (coreRef.current) {
        // Dynamic pulse based on time (Zenith state)
        const pulse = 1 + Math.sin(time * 3) * 0.1
        coreRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        {/* EXTERNAL ENERGY SHELL */}
        <Sphere args={[1.2, 128, 128]}>
          <MeshDistortMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={1.5}
            distort={0.5}
            speed={4}
            roughness={0}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* ATMOSPHERIC OUTER SHIELD */}
        <Sphere args={[1.4, 64, 64]}>
            <meshPhongMaterial 
                color="#00f5ff" 
                transparent 
                opacity={0.15} 
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
            />
        </Sphere>
        
        {/* INTERNAL GLOWING CORE */}
        <mesh ref={coreRef}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial color="#00f5ff" />
            <pointLight color="#00f5ff" intensity={800} distance={12} decay={1.5} />
        </mesh>
        
        {/* SECONDARY LIGHTING FOR WOW FACTOR */}
        <pointLight position={[3, 3, 3]} color="#0ff0fc" intensity={200} />
        <pointLight position={[-3, -3, -3]} color="#00ffcc" intensity={150} />
        
        {/* ORBITING DATA NODES */}
        {particles.map((pt, i) => (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}
