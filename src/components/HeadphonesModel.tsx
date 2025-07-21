import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sphere, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

// Sony WH-1000XM5 3D Model Component - Optimized for Performance
function HeadphonesGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for subtle interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Subtle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Slow ambient rotation
      groupRef.current.rotation.y += 0.002
      
      // Subtle mouse interaction
      groupRef.current.rotation.x = mousePosition.y * 0.1
      groupRef.current.rotation.z = mousePosition.x * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Headband */}
      <Cylinder
        args={[0.03, 0.03, 2.8, 32]}
        position={[0, 1.4, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.1}
          roughness={0.3}
          clearcoat={0.1}
        />
      </Cylinder>

      {/* Left Ear Cup */}
      <group position={[-1.2, 0, 0]}>
        <Sphere args={[0.85, 32, 32]} scale={[1, 0.6, 1]}>
          <meshPhysicalMaterial
            color="#0f0f0f"
            metalness={0.05}
            roughness={0.2}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        
        {/* Inner padding */}
        <Sphere args={[0.7, 16, 16]} scale={[1, 0.4, 1]} position={[0.1, 0, 0]}>
          <meshLambertMaterial color="#2a2a2a" />
        </Sphere>
      </group>

      {/* Right Ear Cup */}
      <group position={[1.2, 0, 0]}>
        <Sphere args={[0.85, 32, 32]} scale={[1, 0.6, 1]}>
          <meshPhysicalMaterial
            color="#0f0f0f"
            metalness={0.05}
            roughness={0.2}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        
        {/* Inner padding */}
        <Sphere args={[0.7, 16, 16]} scale={[1, 0.4, 1]} position={[-0.1, 0, 0]}>
          <meshLambertMaterial color="#2a2a2a" />
        </Sphere>
      </group>

      {/* Connecting Arms */}
      <Box
        args={[0.1, 1.8, 0.05]}
        position={[-0.9, 0.9, 0]}
        rotation={[0, 0, -0.3]}
      >
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.15}
          roughness={0.25}
        />
      </Box>

      <Box
        args={[0.1, 1.8, 0.05]}
        position={[0.9, 0.9, 0]}
        rotation={[0, 0, 0.3]}
      >
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.15}
          roughness={0.25}
        />
      </Box>

      {/* Sony Logo (subtle) */}
      <Box
        args={[0.3, 0.05, 0.05]}
        position={[1.3, 0.3, 0.85]}
      >
        <meshLambertMaterial color="#ffffff" opacity={0.8} transparent />
      </Box>
    </group>
  )
}

// Main component with performance optimizations
export default function HeadphonesModel() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ 
          position: [3, 2, 5], 
          fov: 45,
          near: 0.1,
          far: 20
        }}
        dpr={[1, 1.5]} // Limit DPR for performance
        gl={{ 
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        {/* Optimized lighting setup */}
        <ambientLight intensity={0.3} color="#C7D2C8" />
        <directionalLight 
          position={[2, 3, 2]} 
          intensity={0.4}
          color="#F7F4EC"
          castShadow={false} // Disable shadows for performance
        />
        <pointLight 
          position={[-2, 1, 2]} 
          intensity={0.2}
          color="#4a6741"
        />

        {/* Environment for realistic reflections */}
        <Environment preset="night" environmentIntensity={0.2} />

        {/* 3D Model */}
        <HeadphonesGeometry />

        {/* Subtle orbit controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Gradient overlay for seamless integration */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(transparent, rgba(16, 23, 25, 0.3))',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}