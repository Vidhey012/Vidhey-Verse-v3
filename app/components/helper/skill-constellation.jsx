import React, { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Sphere, Stars, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/utils/data/skills";

function SkillNode({ skill, position, onHover }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing effect
      const t = state.clock.getElapsedTime();
      const s = hovered ? 1.5 : 1 + Math.sin(t * 2 + position[0]) * 0.05;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.08, 16, 16]}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(skill);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? "#00f0ff" : "#7849f8"}
            emissive={hovered ? "#00f0ff" : "#7849f8"}
            emissiveIntensity={hovered ? 5 : 2}
            toneMapped={false}
          />
        </Sphere>
        
        <Text
          position={[0, 0.25, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#0a0e1a"
          visible={hovered}
        >
          {skill.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

function Connections({ nodes }) {
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    
    // Connect nodes in a circular pattern + some random cross-links
    for (let i = 0; i < nodes.length; i++) {
        const next = (i + 1) % nodes.length;
        positions.push(...nodes[i].pos);
        positions.push(...nodes[next].pos);
        
        // Random cross-links for neural network look
        if (i % 4 === 0) {
            const randomTarget = (i + 10) % nodes.length;
            positions.push(...nodes[i].pos);
            positions.push(...nodes[randomTarget].pos);
        }
    }
    
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [nodes]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#7849f8" transparent opacity={0.1} />
    </lineSegments>
  );
}

function SceneContent({ nodes, setActiveSkill }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0015;
            groupRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <SkillNode 
                    key={i} 
                    skill={node.skill} 
                    position={node.pos} 
                    onHover={setActiveSkill} 
                />
            ))}
            <Connections nodes={nodes} />
        </group>
    );
}

export default function SkillConstellation() {
  const [activeSkill, setActiveSkill] = useState(null);

  const nodes = useMemo(() => {
    const data = skillsData.slice(0, 32);
    return data.map((skill, i) => {
      // Fibonacci sphere distribution for uniform nodes
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / data.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const r = 2.8;
      
      return {
        skill,
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ]
      };
    });
  }, []);

  return (
    <div className="w-full h-[500px] md:h-[700px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SceneContent nodes={nodes} setActiveSkill={setActiveSkill} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {/* Info Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <div className="glass-panel px-6 py-2 border-[#7849f8]/20 bg-[#0a0e1a]/40 backdrop-blur-md">
           <p className="text-[10px] font-mono tracking-[0.4em] text-[#7849f8] uppercase mb-1">Neural Connection Active</p>
           <h3 className="text-white font-display text-lg tracking-widest uppercase h-6">
             {activeSkill || "Select Knowledge Node"}
           </h3>
        </div>
      </div>
    </div>
  );
}
