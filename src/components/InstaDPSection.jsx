import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const InstaDPSection = ({ artworks, onArtworkClick, sectionIndex }) => {
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
      {/* Cursor-following pink-purple gradient background */}
      <div className="absolute inset-0">
        {/* Base pink-purple gradient layer */}
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            background: `linear-gradient(135deg, 
              rgba(236, 72, 153, 0.25) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              rgba(255, 110, 199, 0.25) 100%)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(255, 110, 199, 0.25) 100%)`,
              `linear-gradient(225deg, rgba(168, 85, 247, 0.3) 0%, rgba(255, 110, 199, 0.25) 50%, rgba(236, 72, 153, 0.25) 100%)`,
              `linear-gradient(315deg, rgba(255, 110, 199, 0.25) 0%, rgba(236, 72, 153, 0.25) 50%, rgba(168, 85, 247, 0.3) 100%)`,
              `linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(255, 110, 199, 0.25) 100%)`,
            ],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Mouse-following radial gradient - Pink-Purple theme */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 110, 199, 0.5) 0%, 
              rgba(168, 85, 247, 0.4) 30%, 
              rgba(236, 72, 153, 0.3) 60%, 
              transparent 100%)`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Flowing pink-purple orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${160 + i * 60}px`,
              height: `${160 + i * 60}px`,
              background: i % 3 === 0
                ? `radial-gradient(circle, rgba(255, 110, 199, 0.4), transparent)`
                : i % 3 === 1
                ? `radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)`
                : `radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)`,
            }}
            animate={{
              x: [
                `${18 + i * 14}%`,
                `${68 + i * 11}%`,
                `${18 + i * 14}%`,
              ],
              y: [
                `${30 + i * 13}%`,
                `${75 + i * 15}%`,
                `${30 + i * 13}%`,
              ],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 16 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.8,
            }}
          />
        ))}

        {/* Floating particles - Pink/Purple */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const colors = ['bg-neon-pink', 'bg-neon-purple']
            const color = colors[Math.floor(Math.random() * colors.length)]
            const size = Math.random() * 2 + 1
            
            return (
              <motion.div
                key={i}
                className={`absolute ${color} rounded-full opacity-30`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </div>
      </div>
      {/* Section Header */}
      <motion.div
        className="text-center mb-16 md:mb-24"
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
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent mx-auto mb-4" />
        </motion.div>
        <motion.h2
          className="text-5xl md:text-7xl font-serif font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink">
            Profile Portraits
          </span>
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-pink-200/70 font-light italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Identity in art
        </motion.p>
      </motion.div>

      {/* Circular grid layout */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center justify-items-center">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.5, rotate: -180 }
              }
              transition={{
                duration: 1,
                delay: 0.3 * index + sectionIndex * 0.2,
                ease: 'easeOut',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onArtworkClick(artwork)}
            >
              {/* Rotating ring effect */}
              <motion.div
                className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `conic-gradient(from 0deg, 
                    transparent, 
                    rgba(255, 110, 199, 0.4), 
                    transparent, 
                    rgba(168, 85, 247, 0.4), 
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

              {/* Circular frame */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-full glass p-3 w-64 h-64 md:w-80 md:h-80">
                  {/* Inner glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(255, 110, 199, 0.3) 0%, 
                        rgba(168, 85, 247, 0.2) 50%, 
                        transparent 100%)`,
                    }}
                  />

                  {/* Circular image */}
                  <div className="relative overflow-hidden rounded-full aspect-square">
                    <motion.img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-full"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: hoveredIndex === index ? 0.8 : 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Title below circle */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full"
                  initial={{ y: 20, opacity: 0.7 }}
                  animate={{
                    y: hoveredIndex === index ? 0 : 10,
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-2">
                    {artwork.title}
                  </h3>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink transition-all duration-500 group-hover:w-24 mx-auto" />
                </motion.div>

                {/* Floating particles */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-neon-pink"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                        }}
                        animate={{
                          x: Math.cos((i / 8) * Math.PI * 2) * 200,
                          y: Math.sin((i / 8) * Math.PI * 2) * 200,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstaDPSection

