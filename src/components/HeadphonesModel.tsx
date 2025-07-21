import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Componente centralizador e animador do modelo GLB
function CenteredModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (scene && group.current) {
      // Centraliza pelo bounding box
      const box = new THREE.Box3().setFromObject(scene)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)
      // Centraliza o grupo
      group.current.position.set(-center.x, -center.y, -center.z)
      // Escala para caber no espaço (ajuste o fator conforme necessário)
      const maxDim = Math.max(size.x, size.y, size.z)
      const desiredSize = 2 // ou 1, depende do seu canvas/câmera
      const scale = desiredSize / maxDim
      group.current.scale.set(scale, scale, scale)
    }
  }, [scene])

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.01
  })

  return <group ref={group}><primitive object={scene} /></group>
}

export default function HeadphonesModel() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />
        <CenteredModel url='/hp_lite.glb' />
        <OrbitControls enableZoom={false} />
      </Canvas>
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
