import { useState } from 'react'
import Hero from './components/Hero'
import PaintingsSection from './components/PaintingsSection'
import FreeHandsSection from './components/FreeHandsSection'
import InstaStoriesSection from './components/InstaStoriesSection'
import InstaDPSection from './components/InstaDPSection'
import SectionDivider from './components/SectionDivider'
import ArtworkModal from './components/ArtworkModal'
import CursorGlow from './components/CursorGlow'
import IntroFlow from './components/IntroFlow'
import BirthdayFooter from './components/BirthdayFooter'
import VideoPage from './components/VideoPage'
import { sections } from './data/artworks'

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedArtwork(null)
      document.body.style.overflow = 'auto'
    }, 300)
  }

  const handleIntroComplete = () => {
    setIntroComplete(true)
  }

  const handleBirthdayClick = () => {
    setShowVideo(true)
    document.body.style.overflow = 'hidden'
  }

  const handleVideoComplete = () => {
    setShowVideo(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="min-h-screen">
      {!introComplete ? (
        <IntroFlow onComplete={handleIntroComplete} />
      ) : showVideo ? (
        <VideoPage onComplete={handleVideoComplete} />
      ) : (
        <>
          <CursorGlow />
          <Hero />
      
      {/* Paintings Section */}
      <PaintingsSection
        artworks={sections[0].artworks}
        onArtworkClick={handleArtworkClick}
        sectionIndex={0}
      />
      
      <SectionDivider color="pink" />
      
      {/* Free Hands Section */}
      <FreeHandsSection
        artworks={sections[1].artworks}
        onArtworkClick={handleArtworkClick}
        sectionIndex={1}
      />
      
      <SectionDivider color="teal" />
      
      {/* Instagram Stories Section */}
      <InstaStoriesSection
        artworks={sections[2].artworks}
        onArtworkClick={handleArtworkClick}
        sectionIndex={2}
      />
      
      <SectionDivider color="purple" />
      
      {/* Instagram DP Section */}
      <InstaDPSection
        artworks={sections[3].artworks}
        onArtworkClick={handleArtworkClick}
        sectionIndex={3}
      />
      
      {/* Birthday Footer */}
      <BirthdayFooter onBirthdayClick={handleBirthdayClick} />
      
          {isModalOpen && selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App

