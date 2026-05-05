import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const Blob = ({ position, color, speed, distort, radius = 1 }: any) => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.4
    mesh.current.position.x = position[0] + Math.cos(time * speed) * 0.4
  })

  return (
    <Sphere ref={mesh} args={[radius, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={radius}
        transparent
        opacity={0.6}
      />
    </Sphere>
  )
}

const FluidBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 bg-[#050505] overflow-hidden">
      {/* 3D Blobs Layer */}
      <div className="absolute inset-0 opacity-60 blur-[100px]">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Blob position={[-5, 3, 0]} color="#8B5CF6" speed={1.2} distort={0.5} radius={4} />
          <Blob position={[5, -3, 0]} color="#3B82F6" speed={1.5} distort={0.6} radius={5} />
          <Blob position={[0, 5, -2]} color="#EF4444" speed={0.8} distort={0.4} radius={3} />
          <Blob position={[-3, -5, 1]} color="#EC4899" speed={2} distort={0.7} radius={4} />
        </Canvas>
      </div>

      {/* Grain/Noise Overlay for Elite Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* Radial depth mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  )
}

export default FluidBackground
