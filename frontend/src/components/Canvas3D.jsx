import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

function ParticleWaves({ theme }) {
  const pointsRef = useRef(null);
  const count = 3000;

  // Generate STATIC coordinates once on load
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let i = 0;
    
    for (let x = 0; x < 50; x++) {
      for (let z = 0; z < 60; z++) {
        const posX = (x - 25) * 1.2;
        const posZ = (z - 30) * 1.2;
        const posY = 0;
        
        pos[i] = posX;
        pos[i + 1] = posY;
        pos[i + 2] = posZ;
        
        i += 3;
      }
    }
    return pos;
  }, []);

  // Define uniform objects once to share with GLSL shader
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor: { value: new THREE.Color(theme === 'light' ? '#7c3aed' : '#a855f7') }
  }), []);

  useEffect(() => {
    uniforms.uColor.value.set(theme === 'light' ? '#7c3aed' : '#a855f7');
  }, [theme, uniforms]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const scrollFactor = window.scrollY * 0.0015;

    // 1. Instantly push time and scroll offsets to GPU uniforms (CPU cost = 0)
    pointsRef.current.material.uniforms.uTime.value = time;
    pointsRef.current.material.uniforms.uScroll.value = scrollFactor;
    
    // 2. Rotate the entire system slowly
    pointsRef.current.rotation.y = time * 0.02 + scrollFactor * 0.08;
    pointsRef.current.position.y = -3 + Math.sin(time * 0.3) * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      
      {/* High-Performance Custom GLSL Shader Material */}
      <shaderMaterial
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uScroll;
          void main() {
            vec3 pos = position;
            // Wave displacement calculated entirely on the GPU
            float dist = sin(pos.x * 0.12 + uTime * 0.8 + uScroll) * cos(pos.z * 0.12 + uTime * 0.8 + uScroll);
            pos.y = dist * (2.2 + sin(uScroll) * 1.2);
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Attenuate point size based on camera depth
            gl_PointSize = 12.0 / -mvPosition.z;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          void main() {
            // Cut point coordinate blocks into crisp circles
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            // Soften circle boundaries
            float alpha = smoothstep(0.5, 0.1, dist) * 0.28;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

function CoreGeometry({ theme, isMobile }) {
  const meshRef = useRef(null);
  const coreRef = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollFactor = window.scrollY * 0.0015;

    const targetX = isMobile ? 0 : mouse.current.x * 2.0;
    const targetY = isMobile ? 0 : mouse.current.y * 1.2;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;

    meshRef.current.rotation.y = time * 0.05;

    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.15 + scrollFactor * 0.25;
      coreRef.current.rotation.y = time * 0.25 + scrollFactor * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.1 + scrollFactor * 0.15;
      ring2Ref.current.rotation.z = time * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.12 - scrollFactor * 0.1;
      ring3Ref.current.rotation.x = -time * 0.08;
    }
    
    const pulse = 1.6 + Math.sin(time * 1.2) * 0.06 + Math.sin(scrollFactor) * 0.3;
    meshRef.current.scale.set(pulse, pulse, pulse);
  });

  const accentColor = theme === 'light' ? '#0891b2' : '#06b6d4';
  const primaryColor = theme === 'light' ? '#7c3aed' : '#a855f7';

  return (
    <group ref={meshRef}>
      {/* 3D Geodesic Network Node Core */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial
            color={primaryColor}
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
        <points>
          <icosahedronGeometry args={[0.9, 1]} />
          <pointsMaterial
            color={accentColor}
            size={0.05}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.5}
          />
        </points>
      </group>


      <mesh ref={ring2Ref} rotation={[1.0, -0.5, 0.5]}>
        <torusGeometry args={[1.5, 0.012, 8, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent={true}
          opacity={0.3}
          wireframe={true}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-0.5, 1.0, -0.2]}>
        <torusGeometry args={[1.1, 0.01, 8, 64]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent={true}
          opacity={0.3}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

export default function Canvas3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.body.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const accentColor = theme === 'light' ? '#0891b2' : '#06b6d4';
  const primaryColor = theme === 'light' ? '#7c3aed' : '#a855f7';

  return (
    <div className="canvas-3d-container opacity-100 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        events={null}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 10, 5]} intensity={1.2} color={accentColor} />
        <pointLight position={[-5, -10, 5]} intensity={1.2} color={primaryColor} />
        
        <ParticleWaves theme={theme} />
        <CoreGeometry theme={theme} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
