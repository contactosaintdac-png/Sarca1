import { motion } from 'framer-motion'

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      className={`relative inline-block bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue bg-[length:200%_auto] bg-clip-text text-transparent font-black ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}

export default GradientText
