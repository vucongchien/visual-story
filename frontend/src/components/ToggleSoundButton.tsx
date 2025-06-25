import React from 'react'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'
import { useSound } from '../contexts/SoundContext'

export const ToggleSoundButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound()

  return (
    <Button
      variant="circle"
      aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
      onClick={toggleMute}
    >
      {isMuted ? <SpeakerXMarkIcon className="h-6 w-6" /> : <SpeakerWaveIcon className="h-6 w-6" />}
    </Button>
  )
}
