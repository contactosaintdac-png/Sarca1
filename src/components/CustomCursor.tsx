import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        !!(target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive'))
      )
    }
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%', border: '2px solid white' }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderWidth: isHovering ? 1 : 2,
          borderColor: 'rgba(255,255,255,1)',
        }}
        transition={{ type: 'spring', ...springConfig }}
      />
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
      />
    </>
  )
}

export default CustomCursor
