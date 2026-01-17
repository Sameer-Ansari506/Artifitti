import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const VideoPage = ({ onComplete }) => {
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoading(false)
      video.play().catch((error) => {
        console.error('Error playing video:', error)
      })
    }

    const handleEnded = () => {
      // Video completed, return to main page
      setTimeout(() => {
        onComplete()
      }, 500)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete, isMobile])

  const videoSource = isMobile ? '/mobile.mp4' : '/desktop.mp4'

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
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
                `linear-gradient(135deg, rgba(255, 110, 199, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(20, 184, 166, 0.2) 100%)`,
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Video container */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 border-4 border-neon-pink border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <p className="text-pink-200/80 text-lg">Loading video...</p>
              </div>
            </motion.div>
          )}

          <video
            ref={videoRef}
            src={videoSource}
            className="w-full h-full object-contain"
            playsInline
            muted={false}
            autoPlay
            preload="auto"
          />
        </motion.div>

        {/* Birthday message at bottom */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold"
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 110, 199, 0.6)',
                '0 0 30px rgba(168, 85, 247, 0.6)',
                '0 0 20px rgba(20, 184, 166, 0.6)',
                '0 0 20px rgba(255, 110, 199, 0.6)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink via-neon-purple via-neon-teal to-neon-pink">
              Happy Birthday Neha ✨
            </span>
          </motion.h2>
        </motion.div>

        {/* Close button (optional - in case user wants to skip) */}
        <motion.button
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          aria-label="Close video"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}

export default VideoPage

