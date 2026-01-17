import { motion } from 'framer-motion'
import { useState } from 'react'

const ArtworkCard = ({ artwork, index, onClick, isInView }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 50 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl glass p-2 h-full">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, 
              rgba(255, 110, 199, 0.2) 0%, 
              rgba(168, 85, 247, 0.15) 50%, 
              transparent 100%)`,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image container */}
        <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
          <motion.img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            loading="lazy"
          />

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Title overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-serif font-semibold text-white">
              {artwork.title}
            </h3>
          </motion.div>
        </div>

        {/* Hover glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? '0 0 30px rgba(255, 110, 199, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)'
              : 'none',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default ArtworkCard

