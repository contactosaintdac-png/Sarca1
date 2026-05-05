import { motion } from 'framer-motion'

const blobs = [
  { color: '#8B5CF6', size: 600, x: '-10%', y: '-10%', duration: 18 },
  { color: '#3B82F6', size: 700, x: '50%',  y: '30%',  duration: 22 },
  { color: '#EF4444', size: 500, x: '10%',  y: '60%',  duration: 20 },
  { color: '#EC4899', size: 450, x: '70%',  y: '-5%',  duration: 25 },
  { color: '#8B5CF6', size: 400, x: '80%',  y: '70%',  duration: 16 },
]

const FluidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden">

      {/* ── Blobs animados en CSS puro ── */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
            filter: 'blur(120px)',
            opacity: 0.25,
          }}
          animate={{
            x: [0, 60, -40, 80, 0],
            y: [0, -50, 40, -30, 0],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}

      {/* ── Grid mesh sutil (glassmorphism) ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── Radial vignette para profundidad ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

    </div>
  )
}

export default FluidBackground
