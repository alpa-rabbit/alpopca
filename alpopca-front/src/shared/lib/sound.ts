// 전역 사운드 활성화 상태 (localStorage 연동)
const STORAGE_KEY = 'alpopca_sound_enabled';
let _soundEnabled: boolean = (() => {
  try { return localStorage.getItem(STORAGE_KEY) !== 'false'; } catch { return true; }
})();

export function isSoundEnabled() { return _soundEnabled; }
export function setSoundEnabled(enabled: boolean) {
  _soundEnabled = enabled;
  try { localStorage.setItem(STORAGE_KEY, String(enabled)); } catch { /* ignore */ }
}

// Web Audio API 기반 팝 효과음 (외부 파일 없이 생성)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function playPopSound(volume = 0.3) {
  if (!_soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // 팝 소리: 높은 주파수에서 빠르게 낮아짐
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  } catch {
    // AudioContext 미지원 환경 무시
  }
}
