'use client'

import * as THREE from 'three'
import { useMemo } from 'react'

interface LightCycleProps {
  groupRef: React.RefObject<THREE.Group>
}

export function LightCycle({ groupRef }: LightCycleProps) {
  // HIGH-END TRON MATERIALS
  const tronMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f5ff',
    emissive: '#00f5ff',
    emissiveIntensity: 5.0, // High intensity for Bloom
    metalness: 1.0,
    roughness: 0.0,
  }), [])
  
  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#050505',
    metalness: 1.0,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
  }), [])

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#00f5ff',
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.9, // See-through cockpit
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
    opacity: 0.4,
  }), [])
  
  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      
      {/* AERODYNAMIC CHASSIS (Sleeker swept body) */}
      <mesh material={bodyMat} position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 2.5, 4, 16]} />
      </mesh>
      
      {/* COCKPIT CANOPY (Glassmorphism) */}
      <mesh material={glassMat} position={[0.4, 0.9, 0]} rotation={[0, 0, Math.PI / 8]}>
        <sphereGeometry args={[0.7, 32, 16, 0, Math.PI, 0, Math.PI / 2]} />
      </mesh>
      
      {/* FRONT POWER UNIT (Lathe for curved details) */}
      <mesh material={bodyMat} position={[1.8, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.6, 0.4, 1.2, 16]} />
      </mesh>
      
      {/* GLOWING WHEELS (High-end Rings) */}
      <group position={[1.5, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={tronMat}>
          <torusGeometry args={[0.6, 0.08, 16, 64]} />
        </mesh>
        {/* Hub Light */}
        <mesh>
          <circleGeometry args={[0.4, 16]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
        </mesh>
      </group>
      
      <group position={[-1.5, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={tronMat}>
          <torusGeometry args={[0.6, 0.08, 16, 64]} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.4, 16]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
        </mesh>
      </group>
      
      {/* NEON STRIPS (Physical Detail) */}
      <mesh material={tronMat} position={[0, 0.5, 0.55]}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
      </mesh>
      <mesh material={tronMat} position={[0, 0.5, -0.55]}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
      </mesh>

      {/* REAR THRUSTER (Lathe look) */}
      <mesh material={tronMat} position={[-2.2, 0.4, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.0, 0.5, 4]} />
      </mesh>
      
      {/* DYNAMIC LIGHTING */}
      <pointLight color="#00f5ff" intensity={15} distance={10} position={[0, 0.5, 0]} />
      <spotLight color="#00f5ff" intensity={20} distance={30} angle={0.5} penumbra={1} position={[3, 2, 0]} target-position={[10,0,0]} />
    </group>
  )
}
