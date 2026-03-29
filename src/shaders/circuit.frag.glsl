// src/shaders/circuit.frag.glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColor;

void main() {
  // Simple grid/circuit pattern based on UVs and Time
  vec2 grid = fract(vUv * 20.0);
  float line1 = smoothstep(0.0, 0.05, grid.x) - smoothstep(0.05, 0.1, grid.x);
  float line2 = smoothstep(0.0, 0.05, grid.y) - smoothstep(0.05, 0.1, grid.y);
  
  float glow = sin(uTime * 3.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.5 + 0.5;
  
  float circuit = max(line1, line2) * glow;
  
  // Base processor color (dark metal)
  vec3 baseColor = vec3(0.1, 0.1, 0.15);
  
  // Add circuit
  vec3 finalColor = mix(baseColor, uColor, circuit);
  
  // Add rim light
  float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
  rim = smoothstep(0.6, 1.0, rim);
  finalColor += vec3(0.3, 0.3, 0.8) * rim;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
