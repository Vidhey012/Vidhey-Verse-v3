// src/shaders/skinPeel.vert.glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uScanY;
uniform float uMorph;
uniform float uTime;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  vec3 pos = position;
  
  // uScanY is 0.0 to 1.0. Model space Y goes roughly from -1.5 to 1.5
  float scanLine = uScanY * 3.0 - 1.5;
  
  // If we are above the scan line (since scan sweeps top to bottom, top is higher Y)
  // Wait, top is positive Y, so sweeping top to bottom means scanLine goes from 1.5 to -1.5.
  // Actually, let's map uScanY directly. 0.0 = top (1.5), 1.0 = bottom (-1.5)
  float scanYWorld = mix(1.5, -1.5, uScanY);
  
  if (pos.y > scanYWorld) {
    // Peeled/scanned area
    // Just pass position, we handle morphing or textures in the fragment shader or via morphTargets natively
  }
  
  vPosition = pos;
  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
