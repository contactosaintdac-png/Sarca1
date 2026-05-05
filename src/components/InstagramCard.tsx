import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'

interface InstagramCardProps {
  image: string
  caption: string
  likes: string
  comments: string
  index: number
}

const InstagramCard: React.FC<InstagramCardProps> = ({ image, caption, likes, comments, index }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showHeartAnim, setShowHeartAnim] = useState(false)

  const handleDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true)
      setShowHeartAnim(true)
      setTimeout(() => setShowHeartAnim(false), 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="glass rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 group"
    >
      {/* Header */}
      <div className="p-3 md:p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-red to-brand-purple p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <img src="https://github.com/sarcaone.png" alt="sarcaone" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="font-bold text-xs md:text-sm hover:text-white/70 cursor-pointer transition-colors">sarcaone</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white/40 cursor-pointer hover:text-white" />
      </div>

      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-white/5 cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        <img 
          src={image} 
          alt={caption} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Heart Animation on Double Click */}
        <AnimatePresence>
          {showHeartAnim && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart className="w-20 h-20 text-white fill-white drop-shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart 
                className={cn(
                  "w-6 h-6 transition-colors",
                  isLiked ? "text-brand-red fill-brand-red" : "hover:text-white/70"
                )} 
              />
            </motion.button>
            <MessageCircle className="w-6 h-6 hover:text-white/70 cursor-pointer transition-colors" />
            <Send className="w-6 h-6 hover:text-white/70 cursor-pointer transition-colors" />
          </div>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark 
              className={cn(
                "w-6 h-6 transition-colors",
                isBookmarked ? "text-white fill-white" : "hover:text-white/70"
              )} 
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="space-y-1 md:space-y-2">
          <p className="font-bold text-xs md:text-sm">
            {isLiked ? '12.401' : likes} Me gusta
          </p>
          <div className="text-xs md:text-sm leading-relaxed">
            <span className="font-bold mr-2 hover:underline cursor-pointer text-white">sarcaone</span>
            <span className="text-white/90">{caption}</span>
          </div>
          <p className="text-white/40 text-[10px] md:text-xs uppercase mt-2 cursor-pointer hover:text-white/60 transition-colors">
            Ver los {comments} comentarios
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

export default InstagramCard
