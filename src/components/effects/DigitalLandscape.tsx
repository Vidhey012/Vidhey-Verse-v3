'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

interface DigitalLandscapeProps {
  color?: string
}

import { useUI } from '../providers/UIProvider'

export function DigitalLandscape({ color = '#00f5ff' }: DigitalLandscapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { booted } = useUI()
  
  // Create a large grid with noise displacement
  const geometry = useMemo(() => {
    const size = 120
    const segments = 128 // HIGHER DENSITY FOR CRISP MOUNTAINS
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)
    
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const z = pos.getZ(i)
        
        // Majestic procedural mountains
        const dist = Math.sqrt(x * x + z * z)
        if (dist > 10) { 
            const mountainHeight = Math.pow(dist / 25, 2.2) * 6.0 // CINEMATIC HEIGHT
            pos.setY(i, (Math.sin(x * 0.1) * Math.cos(z * 0.1)) * mountainHeight)
        }
    }
    
    return geo
  }, [])

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      uniform float elevationProgress;
      varying vec2 vUv;
      varying float vElevation;
      varying float vGlow;
      void main() {
        vUv = uv;
        // Kinetic Elevation: Mountains rise from 0 to full height
        vec3 newPos = position;
        if (newPos.y > 0.1 || newPos.y < -0.1) {
            newPos.y *= elevationProgress;
        }
        vElevation = newPos.y;
        vGlow = pow(vElevation / 6.0, 3.0); 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;
      varying float vGlow;
      
      void main() {
        // High-end thinning grid with "Signal Motion"
        vec2 movingUv = vUv + vec2(0.0, time * 0.05);
        vec2 gridUv = fract(movingUv * 80.0);
        float grid = step(0.98, gridUv.x) + step(0.98, gridUv.y);
        
        // Distance-based atmospheric fade
        float dist = length(vUv - 0.5) * 2.0;
        float fade = 1.0 - smoothstep(0.1, 0.9, dist);
        
        // Silhouette Peak Glow
        float peakGlow = smoothstep(1.5, 6.0, vElevation) * 0.8;
        
        vec3 finalColor = mix(color * 0.05, color, grid + peakGlow + vGlow);
        gl_FragColor = vec4(finalColor, fade * 0.5);
      }
    `,
    uniforms: {
      color: { value: new THREE.Color(color) },
      time: { value: 0 },
      elevationProgress: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  }), [color])
  
  useFrame((state) => {
    if (!meshRef.current) return
    material.uniforms.time.value = state.clock.elapsedTime
    
    // Smooth Elevation Assembly
    const targetElevation = booted ? 1 : 0
    material.uniforms.elevationProgress.value = THREE.MathUtils.lerp(
        material.uniforms.elevationProgress.value,
        targetElevation,
        0.02
    )
    
    // Scrolling effect
    meshRef.current.position.z = (state.clock.elapsedTime * 2) % 50
  })
  
  return (
    <group>
        <mesh ref={meshRef} geometry={geometry} material={material} />
        {/* Mirror side */}
        <mesh 
            geometry={geometry} 
            material={material} 
            position={[0, 0, -100]} 
        />
        
        {/* ACCENT LIGHTING */}
        <rectAreaLight 
            width={100} 
            height={1} 
            color="#00f5ff" 
            intensity={2} 
            position={[0, 0.1, -10]} 
            rotation={[-Math.PI / 2, 0, 0]} 
        />
    </group>
  )
}
