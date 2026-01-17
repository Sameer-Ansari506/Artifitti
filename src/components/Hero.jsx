import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [scrollY, setScrollY] = useState(0)

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
      setMousePosition({
        x: (e.clientX / dimensions.width) * 100,
        y: (e.clientY / dimensions.height) * 100,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dimensions.width, dimensions.height])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(236, 72, 153, 0.4) 50%, 
              rgba(6, 182, 212, 0.3) 100%)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(6, 182, 212, 0.3) 100%)`,
              `linear-gradient(225deg, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)`,
              `linear-gradient(315deg, rgba(6, 182, 212, 0.3) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(139, 92, 246, 0.3) 100%)`,
              `linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(6, 182, 212, 0.3) 100%)`,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Mouse-following radial gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 110, 199, 0.5) 0%, 
              rgba(168, 85, 247, 0.4) 30%, 
              rgba(20, 184, 166, 0.3) 60%, 
              transparent 100%)`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Animated wave patterns */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 30, 50 50 T100 50' stroke='%23ff6ec7' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Flowing gradient orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: i % 2 === 0 
                ? `radial-gradient(circle, rgba(255, 110, 199, 0.4), transparent)`
                : `radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)`,
            }}
            animate={{
              x: [
                `${20 + i * 15}%`,
                `${60 + i * 10}%`,
                `${20 + i * 15}%`,
              ],
              y: [
                `${30 + i * 10}%`,
                `${70 + i * 15}%`,
                `${30 + i * 10}%`,
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endY = Math.random() * 100
          const size = Math.random() * 3 + 1
          const colors = ['bg-neon-pink', 'bg-neon-purple', 'bg-neon-teal']
          const color = colors[Math.floor(Math.random() * colors.length)]
          
          return (
            <motion.div
              key={i}
              className={`absolute ${color} rounded-full`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                y: `${endY}%`,
                x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 20}%`, `${startX}%`],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const isCircle = i % 2 === 0
          return (
            <motion.div
              key={i}
              className={`absolute ${isCircle ? 'rounded-full' : ''} border-2`}
              style={{
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                borderColor: i % 3 === 0 
                  ? 'rgba(255, 110, 199, 0.3)'
                  : i % 3 === 1
                  ? 'rgba(168, 85, 247, 0.3)'
                  : 'rgba(20, 184, 166, 0.3)',
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5,
              }}
            />
          )
        })}
      </div>

      {/* Main content with enhanced effects */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Glowing background behind text */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle, 
              rgba(255, 110, 199, 0.2) 0%, 
              rgba(168, 85, 247, 0.15) 50%, 
              transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.h1
          className="text-7xl md:text-9xl font-serif font-bold mb-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {/* Gradient text with animated glow */}
          <span className="text-gradient relative">
            Artifitti
            {/* Animated glow effect */}
            <motion.span
              className="absolute inset-0 text-gradient blur-2xl opacity-50"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Artifitti
            </motion.span>
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-pink-200/80 font-light mb-12 max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 110, 199, 0.5)',
                '0 0 20px rgba(168, 85, 247, 0.5)',
                '0 0 10px rgba(255, 110, 199, 0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Where colors speak and emotions bloom
          </motion.span>
        </motion.p>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex flex-col items-center">
            <motion.span 
              className="text-sm text-pink-300/60 mb-2"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center relative"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-pink-400/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Parallax effect on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, 
            transparent 0%, 
            rgba(139, 92, 246, 0.1) 50%, 
            transparent 100%)`,
        }}
        animate={{
          y: scrollY * 0.5,
          scale: 1 + scrollY * 0.0001,
        }}
      />
    </section>
  )
}

export default Hero
