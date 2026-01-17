import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const FreeHandsSection = ({ artworks, onArtworkClick, sectionIndex }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Cursor-following teal gradient background */}
      <div className="absolute inset-0">
        {/* Base teal gradient layer */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, 
              rgba(6, 182, 212, 0.2) 0%, 
              rgba(20, 184, 166, 0.3) 50%, 
              rgba(14, 165, 233, 0.2) 100%)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(20, 184, 166, 0.3) 50%, rgba(14, 165, 233, 0.2) 100%)`,
              `linear-gradient(225deg, rgba(20, 184, 166, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(14, 165, 233, 0.2) 100%)`,
              `linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(20, 184, 166, 0.3) 50%, rgba(14, 165, 233, 0.2) 100%)`,
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Mouse-following radial gradient - Teal theme */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(20, 184, 166, 0.5) 0%, 
              rgba(6, 182, 212, 0.4) 30%, 
              rgba(14, 165, 233, 0.3) 60%, 
              transparent 100%)`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Flowing teal orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              background: `radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent)`,
            }}
            animate={{
              x: [
                `${20 + i * 20}%`,
                `${70 + i * 10}%`,
                `${20 + i * 20}%`,
              ],
              y: [
                `${40 + i * 15}%`,
                `${80 + i * 10}%`,
                `${40 + i * 15}%`,
              ],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2.5,
            }}
          />
        ))}

        {/* Animated background waves - Teal */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(20, 184, 166, 0.15) 50%, transparent 70%)',
          }}
          animate={{
            x: ['-100%', '200%'],
            y: [0, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        className="text-center mb-16 md:mb-24 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-neon-teal to-transparent mx-auto mb-4" />
        </motion.div>
        <motion.h2
          className="text-5xl md:text-7xl font-serif font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-teal via-neon-teal-light to-neon-teal">
            Free Hands
          </span>
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-teal-200/70 font-light italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Unbound creativity
        </motion.p>
      </motion.div>

      {/* Side-by-side artistic layout */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2 * index + sectionIndex * 0.2,
                ease: 'easeOut',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onArtworkClick(artwork)}
            >
              {/* Decorative frame effect */}
              <div className="relative">
                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, 
                      transparent, 
                      rgba(20, 184, 166, 0.3), 
                      transparent, 
                      rgba(20, 184, 166, 0.3), 
                      transparent)`,
                  }}
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: hoveredIndex === index ? Infinity : 0,
                    ease: 'linear',
                  }}
                />

                <div className="relative overflow-hidden rounded-2xl glass p-3">
                  {/* Inner glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(20, 184, 166, 0.2) 0%, 
                        rgba(6, 182, 212, 0.15) 50%, 
                        transparent 100%)`,
                    }}
                  />

                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <motion.img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotate: hoveredIndex === index ? 2 : 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      loading="lazy"
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: hoveredIndex === index ? 0.8 : 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ y: 20, opacity: 0.7 }}
                      animate={{
                        y: hoveredIndex === index ? 0 : 10,
                        opacity: hoveredIndex === index ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-2">
                        {artwork.title}
                      </h3>
                      <div className="h-1 w-0 bg-gradient-to-r from-neon-teal to-neon-teal-light transition-all duration-500 group-hover:w-full" />
                    </motion.div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neon-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neon-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FreeHandsSection

