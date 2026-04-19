"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Classic 80s synthwave sun: two-tone gradient with horizontal "venetian" bands.
 * A single full-screen triangle + fragment shader — no geometry, no post-processing.
 * Cost: ~1–2ms per frame on integrated GPUs, well under budget.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // Palette — matches the portfolio's muted synthwave theme
  vec3 palette(float t) {
    vec3 top    = vec3(0.98, 0.44, 0.52); // rose  (fb7185)
    vec3 mid    = vec3(0.98, 0.75, 0.14); // amber (fbbf24)
    vec3 bottom = vec3(0.65, 0.54, 0.98); // violet (a78bfa)
    vec3 c = mix(bottom, mid, smoothstep(0.0, 0.55, t));
    c = mix(c, top, smoothstep(0.55, 1.0, t));
    return c;
  }

  void main() {
    // Aspect-correct UV centered at origin
    vec2 uv = vUv;
    vec2 p = (uv * 2.0 - 1.0);
    p.x *= uResolution.x / uResolution.y;

    // Sun center, radius
    vec2 sunPos = vec2(0.0, -0.15);
    float d = length(p - sunPos);
    float r = 0.55;

    // Soft sun disk with feathered edge
    float sun = smoothstep(r, r - 0.02, d);

    // Vertical gradient across the sun (top→bottom)
    float t = (sunPos.y + r - p.y) / (2.0 * r);
    t = clamp(t, 0.0, 1.0);
    vec3 col = palette(t);

    // Venetian bands: cut horizontal slices out of the lower half
    // Bands thicken toward the bottom — classic look.
    float bandY = p.y - sunPos.y;          // local y relative to sun center
    float bandMask = 1.0;
    if (bandY < 0.0) {
      float thickness = smoothstep(0.0, -r, bandY) * 0.16 + 0.02;
      float stripe = sin((bandY + uTime * 0.04) * 18.0);
      float cut = smoothstep(thickness, thickness + 0.04, abs(stripe));
      bandMask = cut;
    }

    vec3 sunCol = col * bandMask;

    // Outer glow halo (cheap: single smoothstep ring)
    float glow = smoothstep(r + 0.55, r, d) * 0.35;
    vec3 glowCol = mix(vec3(0.65, 0.54, 0.98), vec3(0.98, 0.44, 0.52), t) * glow;

    vec3 finalCol = sunCol * sun + glowCol * (1.0 - sun);

    // Alpha: strong on sun, soft on halo, transparent elsewhere
    float alpha = max(sun, glow * 0.6);

    gl_FragColor = vec4(finalCol, alpha);
  }
`;

function SunPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(state.size.width, state.size.height);
  });

  // Full-screen triangle — cheaper than a quad (1 tri, no diagonal seam)
  return (
    <mesh frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3]}
        />
        <bufferAttribute
          attach="attributes-uv"
          args={[new Float32Array([0, 0, 2, 0, 0, 2]), 2]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SynthwaveSun() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
      style={{ maskImage: "radial-gradient(circle at 50% 55%, black 50%, transparent 85%)" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop="always"
        camera={{ position: [0, 0, 1] }}
      >
        <SunPlane />
      </Canvas>
    </div>
  );
}
