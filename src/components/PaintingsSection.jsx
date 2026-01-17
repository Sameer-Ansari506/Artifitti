import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const PaintingsSection = ({ artworks, onArtworkClick, sectionIndex }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [imageDimensions, setImageDimensions] = useState({})
  const [columnCount, setColumnCount] = useState(1)

  // Handle responsive column count
  useEffect(() => {
    const updateColumnCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        setColumnCount(width >= 1024 ? 4 : width >= 768 ? 2 : 1)
      }
    }

    updateColumnCount()
    window.addEventListener('resize', updateColumnCount)
    return () => window.removeEventListener('resize', updateColumnCount)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16"
    >
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
          className="text-5xl md:text-7xl font-serif font-bold mb-4 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The Paintings
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-pink-200/70 font-light italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Where colors meet canvas
        </motion.p>
      </motion.div>

      {/* Pinterest-style Masonry Layout using CSS Columns */}
      <div className="max-w-7xl mx-auto">
        <div 
          className="masonry-container"
          style={{
            columnCount: columnCount,
            columnGap: '2rem',
          }}
        >
          {artworks.map((artwork, index) => {
            const dims = imageDimensions[artwork.id]

            return (
              <motion.div
                key={artwork.id}
                className="group cursor-pointer mb-6 md:mb-8 break-inside-avoid"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index + sectionIndex * 0.2,
                  ease: 'easeOut',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onArtworkClick(artwork)}
                style={{
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl glass p-2">
                  {/* Enhanced glow for paintings */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(255, 110, 199, 0.3) 0%, 
                        rgba(168, 85, 247, 0.2) 50%, 
                        transparent 100%)`,
                    }}
                    animate={{
                      scale: hoveredIndex === index ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Image container - adapts to actual image aspect ratio */}
                  <div className="relative overflow-hidden rounded-xl bg-black/20">
                    <motion.img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-auto object-contain"
                      style={{
                        display: 'block',
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      loading="lazy"
                      onLoad={(e) => {
                        // Update dimensions if not already set
                        if (!dims) {
                          const img = e.target
                          setImageDimensions((prev) => ({
                            ...prev,
                            [artwork.id]: {
                              width: img.naturalWidth,
                              height: img.naturalHeight,
                              aspectRatio: img.naturalWidth / img.naturalHeight,
                            },
                          }))
                        }
                      }}
                    />

                    {/* Gradient overlay - positioned at bottom */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: hoveredIndex === index ? 0.9 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Title overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10"
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
                      <div className="h-0.5 w-0 bg-gradient-to-r from-neon-pink to-neon-purple transition-all duration-500 group-hover:w-full" />
                    </motion.div>
                  </div>

                  {/* Floating particles on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full bg-neon-pink"
                          initial={{
                            x: '50%',
                            y: '50%',
                            opacity: 0,
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 80}%`,
                            y: `${50 + (Math.random() - 0.5) * 80}%`,
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: hoveredIndex === index
                        ? '0 0 40px rgba(255, 110, 199, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)'
                        : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PaintingsSection
