'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

interface DataDustProps {
  count?: number
}

export function DataDust({ count = 2000 }: DataDustProps) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      
      sizes[i] = 0.5 + Math.random() * 2.5
      speeds[i] = 0.05 + Math.random() * 0.1
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))
    return geo
  }, [count])

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute float speed;
      uniform float time;
      varying float vOpacity;
      
      void main() {
        vec3 pos = position;
        
        // Gentle drift upward
        pos.y = mod(pos.y + time * speed + 30.0, 60.0) - 30.0;
        
        // Horizontal swaying
        pos.x += sin(time * 0.5 + position.z) * 1.5;
        pos.z += cos(time * 0.5 + position.x) * 1.5;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        vOpacity = 1.0 - smoothstep(10.0, 30.0, abs(pos.y));
      }
    `,
    fragmentShader: `
      varying float vOpacity;
      void main() {
        // Draw a soft glowing circle
        float dist = distance(gl_PointCoord, vec2(0.5));
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        glow = pow(glow, 3.0);
        
        gl_FragColor = vec4(0.0, 0.96, 1.0, glow * vOpacity * 0.6);
      }
    `,
    uniforms: {
      time: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  useFrame((state) => {
    if (pointsRef.current) {
      material.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <points ref={pointsRef} geometry={particles} material={material} />
  )
}
