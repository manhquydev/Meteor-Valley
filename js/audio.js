/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v8.0 - STAR-FORGE +15 & GEM SOCKETING EDITION)
 * js/audio.js - Bộ tổng hợp âm thanh 8-Bit Chiptune + Âm thanh Đập Đồ Lò Rèn (Anvil Strike,
 *               Enhance Success Fanfare, Fail-Stack Pity Charge & Gem Socket Chime)
 * ============================================================================
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.noteIndex = 0;

    this.melody = [
      { f: 523.25, d: 0.35 },
      { f: 659.25, d: 0.35 },
      { f: 783.99, d: 0.50 },
      { f: 659.25, d: 0.35 },
      { f: 587.33, d: 0.35 },
      { f: 523.25, d: 0.50 },
      { f: 440.00, d: 0.35 },
      { f: 392.00, d: 0.65 },
      { f: 440.00, d: 0.35 },
      { f: 523.25, d: 0.35 },
      { f: 587.33, d: 0.45 },
      { f: 659.25, d: 0.45 },
      { f: 783.99, d: 0.35 },
      { f: 880.00, d: 0.55 },
      { f: 783.99, d: 0.70 },
      { f: 0,      d: 0.35 }
    ];

    this.comboScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.muted;
  }

  playTone(freq, duration = 0.12, type = 'triangle', volume = 0.12, slideTo = null) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playHoe() {
    this.playTone(150, 0.09, 'square', 0.10, 85);
  }

  playPlant() {
    this.playTone(340, 0.08, 'sine', 0.12, 520);
  }

  playWater() {
    this.playTone(480, 0.11, 'sine', 0.10, 260);
    setTimeout(() => this.playTone(620, 0.09, 'sine', 0.08, 340), 50);
  }

  playHarvestCombo(comboCount = 1, isCritical = false) {
    const idx = Math.min(this.comboScale.length - 1, Math.max(0, comboCount - 1));
    const baseFreq = this.comboScale[idx];
    this.playTone(baseFreq, 0.10, 'triangle', 0.16, baseFreq * 1.25);
    setTimeout(() => this.playTone(baseFreq * 1.25, 0.14, 'triangle', 0.16, baseFreq * 1.5), 60);
    if (isCritical) {
      setTimeout(() => this.playTone(baseFreq * 2.0, 0.22, 'sine', 0.18), 110);
    }
  }

  playHarvest() {
    this.playHarvestCombo(1, false);
  }

  // Âm thanh Búa Rèn nện xuống đe sắt ("KENG!") và Nổ Cường Hóa Thành Công!
  playAnvilStrike() {
    this.playTone(880, 0.06, 'square', 0.15, 440);
    setTimeout(() => this.playTone(1320, 0.08, 'triangle', 0.14, 660), 70);
  }

  playEnhanceSuccess(plusLevel = 1) {
    this.playAnvilStrike();
    const base = 523.25 * Math.pow(1.04, Math.min(15, plusLevel));
    const notes = [base, base * 1.25, base * 1.5, base * 2.0];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'triangle', 0.18), 120 + idx * 65);
    });
  }

  // Âm thanh khi Đập Xịt nhưng tích tụ năng lượng Chúc Phúc (không gây chán nản)
  playEnhanceFailPity() {
    this.playAnvilStrike();
    setTimeout(() => this.playTone(320, 0.14, 'sawtooth', 0.10, 240), 110);
    setTimeout(() => this.playTone(520, 0.12, 'sine', 0.12, 680), 230);
  }

  playGemSocket() {
    const notes = [783.99, 1046.50, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.15, 'sine', 0.16), idx * 55);
    });
  }

  playFeverTrigger() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.20, 'triangle', 0.16), idx * 60);
    });
  }

  playChestOpen() {
    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'square', 0.12), idx * 70);
    });
  }

  playWheelTick(step = 0) {
    const freq = 420 + (step % 8) * 65;
    this.playTone(freq, 0.055, 'triangle', 0.12);
  }

  playJackpot() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'triangle', 0.17), idx * 65);
    });
  }

  playCoin() {
    this.playTone(987.77, 0.07, 'square', 0.09);
    setTimeout(() => this.playTone(1318.51, 0.18, 'square', 0.10), 70);
  }

  playStar() {
    const notes = [587.33, 783.99, 987.77, 1174.66, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'sine', 0.11), idx * 55);
    });
  }

  playLevelUp() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.22, 'triangle', 0.16), idx * 95);
    });
  }

  playPet() {
    this.playTone(620, 0.10, 'sine', 0.12, 880);
    setTimeout(() => this.playTone(880, 0.14, 'sine', 0.12, 740), 100);
  }

  startBGM() {
    if (this.muted || this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    const step = () => {
      if (!this.bgmPlaying || this.muted) return;
      const item = this.melody[this.noteIndex % this.melody.length];
      this.noteIndex++;
      if (item.f > 0) {
        this.playTone(item.f, item.d * 0.9, 'sine', 0.035);
        if (this.noteIndex % 4 === 1) {
          this.playTone(item.f / 2, item.d * 1.4, 'triangle', 0.025);
        }
      }
      this.bgmTimer = setTimeout(step, item.d * 1000);
    };
    step();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

window.SFX = new SoundSystem();
