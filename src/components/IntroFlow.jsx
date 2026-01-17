import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const IntroFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      // Position it initially next to where the "Yes" button would be
      return { x: window.innerWidth / 2 + 150, y: window.innerHeight / 2 + 100 }
    }
    return { x: 0, y: 0 }
  })
  const [hasMoved, setHasMoved] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-advance on step 4
  useEffect(() => {
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        onComplete()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, onComplete])

  const handleNoButtonHover = () => {
    if (currentStep === 2) {
      setHasMoved(true)
      const buttonWidth = 200
      const buttonHeight = 60
      const maxX = window.innerWidth - buttonWidth - 20
      const maxY = window.innerHeight - buttonHeight - 20
      const newX = Math.max(20, Math.min(maxX, Math.random() * maxX))
      const newY = Math.max(20, Math.min(maxY, Math.random() * maxY))
      setNoButtonPosition({ x: newX, y: newY })
    }
  }

  // Reset button position when step changes to 2
  useEffect(() => {
    if (currentStep === 2) {
      // Position it initially visible next to the Yes button area (centered horizontally, below text)
      const initialX = window.innerWidth / 2 + 120
      const initialY = window.innerHeight / 2 + 120
      setNoButtonPosition({ x: initialX, y: initialY })
      setHasMoved(false)
    } else {
      setHasMoved(false)
    }
  }, [currentStep])

  const handleNoClick = (step) => {
    if (step === 0) {
      setShowPopup(true)
    } else if (step === 1) {
      setShowPopup(true)
    } else if (step === 2) {
      // Button will move on hover, so this won't be easily clickable
    }
  }

  const stepConfigs = [
    {
      text: "Are you an artist? Cause this page belongs to an artist, who pours her heart into the art she follows",
      yesText: "I am an artist 🤍",
      noText: "No I am not an artist",
      popupText: "Why did you say that 🥺, go select I am an artist",
      colors: {
        primary: 'from-neon-pink via-neon-purple to-neon-pink',
        secondary: 'from-purple-600 via-pink-600 to-purple-600',
        accent: 'rgba(255, 110, 199, 0.3)',
        accent2: 'rgba(168, 85, 247, 0.3)',
      }
    },
    {
      text: "This website was built with a lot of dedication and weeks of hardwork by someone",
      yesText: "Yes I know 😊",
      noText: "I don't know 😑",
      popupText: "It took me a lot of hard work and creativity to make it look this good , Here , Now you know , now select yes,I know 😑",
      colors: {
        primary: 'from-neon-teal via-neon-teal-light to-neon-teal',
        secondary: 'from-teal-600 via-cyan-600 to-teal-600',
        accent: 'rgba(20, 184, 166, 0.3)',
        accent2: 'rgba(6, 182, 212, 0.3)',
      }
    },
    {
      text: "Things you are going to see on this website are not going to be made again by anyone (unless the artist decides to make them again). Will you make art pieces again? 🥹",
      yesText: "Yes I will 🥹",
      noText: "No I won't 😑",
      popupText: "",
      colors: {
        primary: 'from-neon-purple via-neon-pink to-neon-purple',
        secondary: 'from-purple-600 via-pink-600 to-purple-600',
        accent: 'rgba(168, 85, 247, 0.3)',
        accent2: 'rgba(255, 110, 199, 0.3)',
      }
    },
    {
      text: "Behold the beauty in what is about to appear in next page, made by someone who means someone to someone",
      yesText: "",
      noText: "",
      popupText: "",
      colors: {
        primary: 'from-neon-pink via-neon-purple via-neon-teal to-neon-pink',
        secondary: 'from-pink-600 via-purple-600 via-teal-600 to-pink-600',
        accent: 'rgba(255, 110, 199, 0.3)',
        accent2: 'rgba(168, 85, 247, 0.3)',
        accent3: 'rgba(20, 184, 166, 0.3)',
      }
    }
  ]

  const currentConfig = stepConfigs[currentStep]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${currentConfig.colors.primary} opacity-40`}
            animate={{
              background: [
                `linear-gradient(135deg, ${currentConfig.colors.accent}, ${currentConfig.colors.accent2})`,
                `linear-gradient(225deg, ${currentConfig.colors.accent2}, ${currentConfig.colors.accent})`,
                `linear-gradient(135deg, ${currentConfig.colors.accent}, ${currentConfig.colors.accent2})`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Mouse-following gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                ${currentConfig.colors.accent} 0%, 
                ${currentConfig.colors.accent2} 50%, 
                transparent 100%)`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Flowing orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                background: `radial-gradient(circle, ${currentConfig.colors.accent}, transparent)`,
              }}
              animate={{
                x: [
                  `${20 + i * 12}%`,
                  `${70 + i * 10}%`,
                  `${20 + i * 12}%`,
                ],
                y: [
                  `${30 + i * 10}%`,
                  `${70 + i * 15}%`,
                  `${30 + i * 10}%`,
                ],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2,
              }}
            />
          ))}

          {/* Floating particles */}
          {[...Array(25)].map((_, i) => {
            const colors = currentStep === 0 
              ? ['bg-neon-pink', 'bg-neon-purple']
              : currentStep === 1
              ? ['bg-neon-teal', 'bg-neon-teal-light']
              : currentStep === 2
              ? ['bg-neon-purple', 'bg-neon-pink']
              : ['bg-neon-pink', 'bg-neon-purple', 'bg-neon-teal']
            const color = colors[Math.floor(Math.random() * colors.length)]
            const size = Math.random() * 3 + 1
            
            return (
              <motion.div
                key={i}
                className={`absolute ${color} rounded-full opacity-40`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
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

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          {/* Text */}
          <motion.p
            className={`text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-12 md:mb-16 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r ${currentConfig.colors.primary}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentConfig.text}
          </motion.p>

          {/* Buttons */}
          {currentStep < 3 && (
            <div className="relative">
              <motion.div
                className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Yes Button */}
                <motion.button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className={`px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-lg md:text-xl bg-gradient-to-r ${currentConfig.colors.primary} text-white shadow-lg relative overflow-hidden group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{currentConfig.yesText}</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>

                {/* No Button - Regular */}
                {currentStep !== 2 && (
                  <motion.button
                    onClick={() => handleNoClick(currentStep)}
                    className={`px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-lg md:text-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg relative overflow-hidden group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{currentConfig.noText}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                )}
              </motion.div>

              {/* No Button - Moving (Step 2) */}
              {currentStep === 2 && (
                <motion.button
                  onMouseEnter={handleNoButtonHover}
                  onClick={() => handleNoClick(currentStep)}
                  className={`px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-lg md:text-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg relative overflow-hidden z-20 cursor-pointer`}
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: hasMoved ? 400 : 1000,
                    damping: hasMoved ? 25 : 30,
                  }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                  }}
                >
                  {currentConfig.noText}
                </motion.button>
              )}
            </div>
          )}

          {/* Step 4 auto-fade indicator */}
          {currentStep === 3 && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="w-64 h-1 bg-white/30 rounded-full mx-auto overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-teal"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Popup Content */}
              <motion.div
                className="relative z-10 bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-md mx-auto border border-white/20 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.p
                  className="text-2xl md:text-3xl font-serif font-bold text-center text-white mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentConfig.popupText}
                </motion.p>

                <motion.button
                  onClick={() => setShowPopup(false)}
                  className="w-full px-6 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default IntroFlow

