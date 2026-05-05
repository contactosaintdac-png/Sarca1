import React from 'react'
import { motion } from 'framer-motion'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`gradient-text animate-gradient inline-block font-black ${className}`}
      whileHover={{
        scale: 1.03,
        filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.span>
  )
}

export default GradientText
