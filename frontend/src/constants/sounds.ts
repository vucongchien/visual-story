export const SoundEffects = {
    BACKGROUND_MUSIC: '/sounds/background-music.mp3',
    HOVER_SESSION: '/sounds/sound-hover-session.mp3',
    CLICK_SESSION: '/sounds/sound-click-session.mp3',
  // Thêm các âm thanh khác ở đây
} as const; 

export type SoundEffect = keyof typeof SoundEffects;