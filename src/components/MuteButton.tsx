import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/audio/audioManager';

export const MuteButton: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Start ambient on mount
    audioManager.play('bgAmbient');
  }, []);

  const toggleMute = () => {
    audioManager.play('click');
    const newMutedState = audioManager.toggleMute();
    setIsMuted(newMutedState);
  };

  return createPortal(
    <button
      onClick={toggleMute}
      onMouseEnter={() => {
        setIsHovered(true);
        audioManager.play('hoverTick');
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-[9900]"
      style={{
        background: 'rgba(10, 15, 30, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isHovered ? 'var(--color-cyber-blue)' : 'var(--color-border)'}`,
        boxShadow: isHovered ? '0 0 20px rgba(0, 212, 255, 0.3)' : '0 0 10px rgba(0, 212, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
    >
      {isMuted ? (
        <VolumeX size={20} color="var(--color-text-dim)" />
      ) : (
        <Volume2 size={20} color="var(--color-cyber-blue)" className="animate-pulse" />
      )}
    </button>,
    document.body
  );
};
