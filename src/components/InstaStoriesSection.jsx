import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const InstaStoriesSection = ({ artworks, onArtworkClick, sectionIndex }) => {
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
      {/* Cursor-following purple gradient background */}
      <div className="absolute inset-0">
        {/* Base purple gradient layer */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, 
              rgba(147, 51, 234, 0.2) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              rgba(139, 92, 246, 0.2) 100%)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(139, 92, 246, 0.2) 100%)`,
              `linear-gradient(225deg, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(139, 92, 246, 0.2) 100%)`,
              `linear-gradient(315deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(147, 51, 234, 0.2) 100%)`,
              `linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(139, 92, 246, 0.2) 100%)`,
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Mouse-following radial gradient - Purple theme */}
        <motion.div
          className="absolute inset-0 opacity-35"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(168, 85, 247, 0.5) 0%, 
              rgba(147, 51, 234, 0.4) 30%, 
              rgba(139, 92, 246, 0.3) 60%, 
              transparent 100%)`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Flowing purple orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${180 + i * 70}px`,
              height: `${180 + i * 70}px`,
              background: i % 2 === 0
                ? `radial-gradient(circle, rgba(168, 85, 247, 0.35), transparent)`
                : `radial-gradient(circle, rgba(147, 51, 234, 0.35), transparent)`,
            }}
            animate={{
              x: [
                `${15 + i * 18}%`,
                `${65 + i * 12}%`,
                `${15 + i * 18}%`,
              ],
              y: [
                `${25 + i * 12}%`,
                `${75 + i * 18}%`,
                `${25 + i * 12}%`,
              ],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}

        {/* Animated geometric patterns - Purple */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 rounded-full"
              style={{
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`,
                borderColor: 'rgba(168, 85, 247, 0.4)',
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2,
              }}
            />
          ))}
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
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent mx-auto mb-4" />
        </motion.div>
        <motion.h2
          className="text-5xl md:text-7xl font-serif font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-purple-light to-neon-purple">
            Instagram Stories
          </span>
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-purple-200/70 font-light italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Moments captured
        </motion.p>
      </motion.div>

      {/* Vertical carousel-style layout */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="relative group cursor-pointer flex-shrink-0"
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotateY: 0 }
                  : { opacity: 0, y: 100, rotateY: -15 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2 * index + sectionIndex * 0.2,
                ease: 'easeOut',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onArtworkClick(artwork)}
              style={{
                perspective: '1000px',
              }}
            >
              {/* Phone frame effect for stories */}
              <div className="relative">
                {/* Phone frame glow */}
                <motion.div
                  className="absolute -inset-2 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(168, 85, 247, 0.3) 0%, 
                      rgba(147, 51, 234, 0.2) 50%, 
                      rgba(168, 85, 247, 0.3) 100%)`,
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                  }}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative overflow-hidden rounded-[2rem] glass p-2">
                  {/* Inner glow */}
                  <motion.div
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(168, 85, 247, 0.2) 0%, 
                        rgba(147, 51, 234, 0.15) 50%, 
                        transparent 100%)`,
                    }}
                  />

                  {/* Vertical story format */}
                  <div className="relative overflow-hidden rounded-[1.5rem] aspect-[9/16] w-[280px] md:w-[320px]">
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
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: hoveredIndex === index ? 0.9 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Title overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
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
                      <div className="h-1 w-0 bg-gradient-to-r from-neon-purple to-neon-purple-light transition-all duration-500 group-hover:w-full" />
                    </motion.div>

                    {/* Top notch effect */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Swipe indicator */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute top-1/2 -right-8 text-neon-purple opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstaStoriesSection

