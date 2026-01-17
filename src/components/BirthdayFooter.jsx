import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const BirthdayFooter = ({ onBirthdayClick }) => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <footer
      ref={footerRef}
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 110, 199, 0.2) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              rgba(20, 184, 166, 0.2) 100%)`,
          }}
          animate={{
            background: [
              `linear-gradient(135deg, rgba(255, 110, 199, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(20, 184, 166, 0.2) 100%)`,
              `linear-gradient(225deg, rgba(168, 85, 247, 0.3) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(255, 110, 199, 0.2) 100%)`,
              `linear-gradient(315deg, rgba(20, 184, 166, 0.2) 0%, rgba(255, 110, 199, 0.2) 50%, rgba(168, 85, 247, 0.3) 100%)`,
              `linear-gradient(135deg, rgba(255, 110, 199, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(20, 184, 166, 0.2) 100%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Flowing orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${180 + i * 80}px`,
              height: `${180 + i * 80}px`,
              background: i % 3 === 0
                ? `radial-gradient(circle, rgba(255, 110, 199, 0.3), transparent)`
                : i % 3 === 1
                ? `radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)`
                : `radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent)`,
            }}
            animate={{
              x: [
                `${20 + i * 15}%`,
                `${70 + i * 10}%`,
                `${20 + i * 15}%`,
              ],
              y: [
                `${30 + i * 12}%`,
                `${75 + i * 15}%`,
                `${30 + i * 12}%`,
              ],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => {
          const colors = ['bg-neon-pink', 'bg-neon-purple', 'bg-neon-teal']
          const color = colors[Math.floor(Math.random() * colors.length)]
          const size = Math.random() * 3 + 1
          
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
                scale: [1, 1.5, 1],
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

      {/* Content */}
      <div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            filter: isHovered ? 'blur(0px)' : 'blur(8px)',
          } : { 
            opacity: 0, 
            y: 30,
            filter: 'blur(8px)',
          }}
          transition={{ 
            duration: 0.8,
            filter: { duration: 0.5, ease: 'easeInOut' }
          }}
        >
          {/* Birthday Message */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              filter: isHovered ? 'blur(0px)' : 'blur(8px)',
            } : { 
              opacity: 0, 
              scale: 0.9,
              filter: 'blur(8px)',
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              filter: { duration: 0.5, ease: 'easeInOut' }
            }}
            onClick={onBirthdayClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-pink via-neon-purple via-neon-teal to-neon-pink">
              Happy Birthday to the soul behind{' '}
              {/* <motion.span
                className="inline-block"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 110, 199, 0.5)',
                    '0 0 30px rgba(168, 85, 247, 0.5)',
                    '0 0 20px rgba(20, 184, 166, 0.5)',
                    '0 0 20px rgba(255, 110, 199, 0.5)',
                  ],
                //   filter: isHovered ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  filter: { duration: 0.5, ease: 'easeInOut' }
                }}
              > */}
                nw_artyme
              {/* </motion.span> */}
              !
            </span>
          </motion.h2>

          {/* Date */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-light text-pink-200/80"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              filter: isHovered ? 'blur(0px)' : 'blur(8px)',
            } : { 
              opacity: 0, 
              y: 20,
              filter: 'blur(8px)',
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              filter: { duration: 0.5, ease: 'easeInOut' }
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 10px rgba(255, 110, 199, 0.4)',
                  '0 0 15px rgba(168, 85, 247, 0.4)',
                  '0 0 10px rgba(255, 110, 199, 0.4)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              18 January 2026
            </motion.span>
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 md:mt-12 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: '200px', opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-neon-pink via-neon-purple via-neon-teal to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default BirthdayFooter

