import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const SectionDivider = ({ color = 'pink' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const getGradientClass = () => {
    if (color === 'teal') return 'from-neon-teal via-neon-teal-light to-neon-teal'
    if (color === 'purple') return 'from-neon-purple via-neon-purple-light to-neon-purple'
    return 'from-neon-pink via-neon-purple to-neon-pink'
  }

  const getOrbColor = () => {
    if (color === 'teal') return 'bg-neon-teal'
    if (color === 'purple') return 'bg-neon-purple'
    return 'bg-neon-pink'
  }

  return (
    <div ref={ref} className="relative py-12 md:py-20 overflow-hidden">
      {/* Animated line */}
      <motion.div
        className={`h-px bg-gradient-to-r ${getGradientClass()} mx-auto max-w-4xl`}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${getOrbColor()}`}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    x: (i - 1) * 100,
                    y: [0, -20, 0],
                    opacity: [0, 1, 0.5, 1, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default SectionDivider

