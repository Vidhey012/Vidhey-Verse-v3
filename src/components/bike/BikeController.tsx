'use client'

import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LightCycle } from './LightCycle'
import { LightTrail } from './LightTrail'
import { useScrollVelocity } from '@/hooks/useScrollVelocity'
import { AudioEngine } from '@/lib/audio'

export const SECTION_WAYPOINTS = {
  hero:         new THREE.Vector3(0, 0, 0),
  about:        new THREE.Vector3(-5, 0, 0),
  experience0:  new THREE.Vector3(-8, 0, -5),
  experience1:  new THREE.Vector3(8, 0, -5),
  experience2:  new THREE.Vector3(-6, 0, -10),
  experience3:  new THREE.Vector3(6, 0, -10),
  projects:     new THREE.Vector3(0, 0, -15),
  skills:       new THREE.Vector3(-8, 0, -20),
  certs:        new THREE.Vector3(0, 0, -25),
  github:       new THREE.Vector3(6, 0, -28),
  contact:      new THREE.Vector3(0, 0, -32),
}

export function BikeController() {
  const bikeGroup = useRef<THREE.Group>(null)
  const scrollProgress = useRef(0)
  const velocity = useScrollVelocity()
  
  const bikePath = useMemo(() => new THREE.CatmullRomCurve3(Object.values(SECTION_WAYPOINTS)), [])

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress dynamically to bypass Preloader initial 0px height locks
      const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight)
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      } else {
        scrollProgress.current = 0
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    // Initial calc after slight delay to ensure DOM paints
    setTimeout(handleScroll, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  
  useFrame((state) => {
    if (!bikeGroup.current) return
    
    const safeProgress = Math.min(Math.max(scrollProgress.current, 0.001), 0.999)
    const point = bikePath.getPointAt(safeProgress)
    const tangent = bikePath.getTangentAt(safeProgress)
    
    // Smooth bike movement
    bikeGroup.current.position.lerp(point, 0.08)
    const targetLookAt = point.clone().add(tangent)
    bikeGroup.current.lookAt(targetLookAt)
    
    // SPEED-BASED VFX
    const currentVelocity = velocity.current
    const normalizedV = Math.min(currentVelocity / 15, 1) // Sensitivity based on scroll speed
    
    // 1. Dynamic Camera (Chase Physics)
    // Goal: Position camera slightly behind and above the bike relative to its trajectory
    const relativeCameraOffset = new THREE.Vector3(-4, 2, 0)
    const cameraOffset = relativeCameraOffset.applyMatrix4(bikeGroup.current.matrixWorld)
    
    state.camera.position.lerp(cameraOffset, 0.1) // Cinematic lag
    state.camera.lookAt(bikeGroup.current.position.clone().add(new THREE.Vector3(2, 0, 0).applyMatrix4(bikeGroup.current.matrixWorld)))
    
    // 2. Dynamic FOV Stretches
    if ((state.camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
        const pCam = state.camera as THREE.PerspectiveCamera
        pCam.fov = THREE.MathUtils.lerp(pCam.fov, 75 + normalizedV * 25, 0.1)
        pCam.updateProjectionMatrix()
    }
    
    // 3. Shake and Tilt
    const shake = normalizedV * 0.05
    state.camera.position.y += Math.sin(state.clock.elapsedTime * 20) * shake
    
    bikeGroup.current.rotation.z = THREE.MathUtils.lerp(bikeGroup.current.rotation.z, -normalizedV * 0.3, 0.1)
    
    AudioEngine.setBikeSpeed(normalizedV)
  })
  
  return (
    <>
      <LightCycle groupRef={bikeGroup} />
      <LightTrail bikeRef={bikeGroup} maxPoints={250} />
    </>
  )
}
