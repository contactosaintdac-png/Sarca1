import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

const Blob = ({ position, color, speed, distort }: any) => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y += Math.sin(time * speed) * 0.002
    mesh.current.position.x += Math.cos(time * speed) * 0.002
  })

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
        />
      </Sphere>
    </Float>
  )
}

const FluidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-40 blur-[120px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Blob 
            position={[-2, 1, 0]} 
            color="#EF4444" 
            speed={1.5} 
            distort={0.4} 
          />
          <Blob 
            position={[2, -1, 0]} 
            color="#3B82F6" 
            speed={2} 
            distort={0.5} 
          />
          <Blob 
            position={[0, 0, -2]} 
            color="#8B5CF6" 
            speed={1} 
            distort={0.3} 
          />
          <Blob 
            position={[-1, -2, 1]} 
            color="#EC4899" 
            speed={2.5} 
            distort={0.6} 
          />
        </Canvas>
      </div>
      {/* Overlay for subtle grain or depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  )
}

export default FluidBackground
