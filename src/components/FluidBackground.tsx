import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const Blob = ({ position, color, speed, distort, radius = 1 }: any) => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.2
    mesh.current.position.x = position[0] + Math.cos(time * speed) * 0.2
  })

  return (
    <Sphere ref={mesh} args={[radius, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        speed={speed}
        distort={distort}
        radius={radius}
        transparent
        opacity={0.5}
      />
    </Sphere>
  )
}

const FluidBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 bg-[#020202] overflow-hidden">
      {/* 3D Atmosphere Layer */}
      <div className="absolute inset-0 opacity-40 blur-[120px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Blob position={[-3, 2, 0]} color="#8B5CF6" speed={1} distort={0.5} radius={3} />
          <Blob position={[3, -2, 0]} color="#3B82F6" speed={1.2} distort={0.6} radius={4} />
          <Blob position={[0, -4, -1]} color="#EF4444" speed={0.8} distort={0.4} radius={3} />
        </Canvas>
      </div>

      {/* Glass Texture / Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Radial Depth Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      
      {/* Subtle Mesh Line (Optional glass detail) */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  )
}

export default FluidBackground
