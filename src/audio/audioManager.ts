import { Howl, Howler } from 'howler'

let isMuted = false

export const sounds = {
  bgAmbient: new Howl({
    src: ['/audio/cyberpunk-ambient.mp3'],
    loop: true,
    volume: 0.15,
  }),
  hoverTick: new Howl({
    src: ['/audio/tick.mp3'],
    volume: 0.3,
  }),
  click: new Howl({
    src: ['/audio/whoosh.mp3'],
    volume: 0.4,
  }),
  radarPing: new Howl({
    src: ['/audio/ping.mp3'],
    volume: 0.6,
  }),
  transmit: new Howl({
    src: ['/audio/transmit.mp3'],
    volume: 0.5,
  }),
}

export const audioManager = {
  play: (key: keyof typeof sounds) => {
    if (!isMuted) {
      const sound = sounds[key]
      if (key === 'bgAmbient' && sound.playing()) return
      sound.play()
    }
  },
  pause: (key: keyof typeof sounds) => {
    sounds[key].pause()
  },
  toggleMute: () => {
    isMuted = !isMuted
    if (isMuted) {
      Howler.volume(0)
    } else {
      Howler.volume(1)
      if (!sounds.bgAmbient.playing()) {
        sounds.bgAmbient.play()
      }
    }
    return isMuted
  },
  setVelocityRate: (velocity: number) => {
    if (isMuted) return;
    // Base pitch is 1.0. Increasing velocity increases pitch up to 1.5
    const clampedVelocity = Math.min(Math.abs(velocity) * 0.02, 0.5);
    sounds.bgAmbient.rate(1.0 + clampedVelocity);
  },
  getIsMuted: () => isMuted
}
