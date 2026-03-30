'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

interface LightTrailProps {
  bikeRef: React.RefObject<THREE.Group>
  maxPoints?: number
}

export function LightTrail({ bikeRef, maxPoints = 150 }: LightTrailProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const points = useRef<THREE.Vector3[]>([])
  
  // High-poly wall geometry that we update each frame
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, maxPoints - 1, 1)
    geo.rotateY(Math.PI / 2) // Orient vertically
    return geo
  }, [maxPoints])
  
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float time;
      varying vec2 vUv;
      
      void main() {
        // Vertical fade (bottom = 0.0, top = 1.0)
        float verticalFade = 1.0 - vUv.y;
        
        // Horizontal fade (near bike = 0.0, end = 1.0)
        float horizontalFade = 1.0 - vUv.x;
        
        // Digital scanline effect
        float scanline = step(0.9, fract(vUv.x * 20.0 - time * 5.0)) * 0.2;
        
        float alpha = verticalFade * horizontalFade * 0.8;
        alpha += scanline * verticalFade * horizontalFade;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    uniforms: {
      color: { value: new THREE.Color('#00f5ff') },
      time: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  }), [])
  
  useFrame((state) => {
    if (!bikeRef.current || !meshRef.current) return
    
    material.uniforms.time.value = state.clock.elapsedTime
    
    // Calculate current rear position
    const currentPos = new THREE.Vector3(-1.8, 0, 0) // Positioned at rear tire
    currentPos.applyMatrix4(bikeRef.current.matrixWorld)
    
    // Add point if we've moved significantly
    if (points.current.length === 0 || points.current[0].distanceTo(currentPos) > 0.1) {
        points.current.unshift(currentPos.clone())
        if (points.current.length > maxPoints) points.current.pop()
    }
    
    // Update geometry vertices to form the "wall"
    const posAttr = geometry.attributes.position
    for (let i = 0; i < points.current.length; i++) {
        const pt = points.current[i]
        
        // Bottom vertex (on ground)
        posAttr.setXYZ(i, pt.x, pt.y, pt.z)
        
        // Top vertex (1.5 units high)
        posAttr.setXYZ(i + maxPoints, pt.x, pt.y + 1.2, pt.z)
    }
    
    // Fill remaining vertices with the last point to avoid "jumping"
    for (let i = points.current.length; i < maxPoints; i++) {
        const lastPt = points.current[points.current.length - 1] || currentPos
        posAttr.setXYZ(i, lastPt.x, lastPt.y, lastPt.z)
        posAttr.setXYZ(i + maxPoints, lastPt.x, lastPt.y + 1.2, lastPt.z)
    }
    
    posAttr.needsUpdate = true
  })
  
  return <mesh ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />
}
