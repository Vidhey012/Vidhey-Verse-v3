'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import * as THREE from 'three';
// Postprocessing removed - additive blending provides natural glow
import { useSceneStore } from './SceneProvider';

// ── Starfield: instanced points with purple/pink/cyan palette ──
function StarField({ count = 4000 }) {
  const ref = useRef();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const palette = [
      [0.47, 0.29, 0.97],  // #7849f8 purple
      [1.0, 0.18, 0.58],   // #ff2d95 pink
      [0.0, 0.94, 1.0],    // #00f0ff cyan
      [0.09, 0.95, 0.70],  // #16f2b3 mint
      [0.6, 0.4, 1.0],     // light violet
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere
      const radius = 30 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];

      siz[i] = 0.5 + Math.random() * 2.5;
    }

    return [pos, col, siz];
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Floating neon particles (closer, larger, fewer - for depth) ──
function FloatingParticles({ count = 30 }) {
  const ref = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i].x;
      posArr[i * 3 + 1] += velocities[i].y;
      posArr[i * 3 + 2] += velocities[i].z;

      // Wrap around
      if (Math.abs(posArr[i * 3]) > 30) velocities[i].x *= -1;
      if (Math.abs(posArr[i * 3 + 1]) > 20) velocities[i].y *= -1;
      if (Math.abs(posArr[i * 3 + 2]) > 15) velocities[i].z *= -1;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#7849f8"
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── TRON-style grid floor ──
function GridFloor() {
  const shaderRef = useRef();

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#7849f8') },
        uOpacity: { value: 0.12 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDist;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vDist = length(mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        varying float vDist;

        void main() {
          // Create grid
          vec2 uv = vUv * 60.0;
          uv.y += uTime * 3.0;
          
          vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
          float line = min(grid.x, grid.y);
          float gridVal = 1.0 - min(line, 1.0);
          
          // Distance fade
          float dist = length(vUv - 0.5) * 2.0;
          float fade = smoothstep(1.0, 0.2, dist);
          
          // Pulse on major gridlines
          vec2 majorGrid = abs(fract(uv / 10.0 - 0.5) - 0.5) / fwidth(uv / 10.0);
          float majorLine = 1.0 - min(min(majorGrid.x, majorGrid.y), 1.0);
          
          float alpha = (gridVal * 0.6 + majorLine * 1.0) * uOpacity * fade;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -18, 0]}
    >
      <planeGeometry args={[300, 300, 1, 1]} />
      <primitive object={gridMaterial} ref={shaderRef} attach="material" />
    </mesh>
  );
}

// ── Mouse-tracked camera parallax ──
function CameraRig() {
  const { camera } = useThree();
  const mouseNorm = useRef({ x: 0, y: 0 });

  // Subscribe to store outside render loop for perf
  useEffect(() => {
    const unsub = useSceneStore.subscribe(
      (state) => {
        mouseNorm.current = state.mouseNorm;
      }
    );
    return unsub;
  }, []);

  useFrame(() => {
    const targetX = mouseNorm.current.x * 3;
    const targetY = mouseNorm.current.y * 2;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}




// ── Main Background3D component ──
export default function Background3D() {
  const deviceTier = useSceneStore((s) => s.deviceTier);
  const isPreloaderDone = useSceneStore((s) => s.isPreloaderDone);

  const starCount = deviceTier === 'high' ? 5000 : deviceTier === 'medium' ? 2500 : 1000;

  return (
    <div
      className="background-3d"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        opacity: isPreloaderDone ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 500 }}
        dpr={deviceTier === 'low' ? 1 : [1, 1.5]}
        gl={{
          antialias: deviceTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#0a0e1a']} />
        <fog attach="fog" args={['#0a0e1a', 60, 200]} />

        <StarField count={starCount} />
        <FloatingParticles count={deviceTier === 'low' ? 10 : 30} />
        {deviceTier !== 'low' && <GridFloor />}
        <CameraRig />

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 0]} color="#7849f8" intensity={0.5} distance={50} />
      </Canvas>
    </div>
  );
}
