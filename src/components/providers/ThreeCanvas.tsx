'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useGPUTier } from '@/hooks/useGPUTier'
import { BikeController } from '../bike/BikeController'
import { DigitalLandscape } from '../effects/DigitalLandscape'
import { DataDust } from '../effects/DataDust'
import { CyberCore } from '../effects/CyberCore'

import { useUI } from '../providers/UIProvider'

export function ThreeCanvas() {
  const { tier, isDetected } = useGPUTier()
  const { booted, isTransitioning } = useUI()
  
  if (!isDetected || tier === 'lite') return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 2, 5], fov: 75 }}
        dpr={tier === 'full' ? [1, 2] : 1}
      >
        <color attach="background" args={['#000']} />
        <fogExp2 attach="fog" args={['#000', 0.04]} />
        
        <Suspense fallback={null}>
          <BikeController />
          <DigitalLandscape color="#00f5ff" />
          <DataDust count={tier === 'full' ? 1000 : 300} />
          <CyberCore />
          
          {tier === 'full' && (
            <EffectComposer>
              <Bloom 
                luminanceThreshold={0.4} 
                luminanceSmoothing={0.9} 
                height={300} 
                intensity={isTransitioning ? 8.0 : 3.2} 
              />
              <ChromaticAberration 
                blendFunction={BlendFunction.NORMAL} 
                offset={new THREE.Vector2(isTransitioning ? 0.005 : 0.001, isTransitioning ? 0.005 : 0.001)}
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette offset={0.2} darkness={1.1} />
              <Noise opacity={0.04} />
              <Scanline density={1.2} opacity={0.1} />
            </EffectComposer>
          )}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
