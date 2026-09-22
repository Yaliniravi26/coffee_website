// Procedural ambient café sound generator using Web Audio API
class CafeSoundscape {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private oscWarm: OscillatorNode | null = null;

  start() {
    if (this.isRunning) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // 1. Soft warm low drone / acoustic cafe resonance
      this.oscWarm = this.ctx.createOscillator();
      this.oscWarm.type = 'sine';
      this.oscWarm.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 warm wood resonance

      const warmFilter = this.ctx.createBiquadFilter();
      warmFilter.type = 'lowpass';
      warmFilter.frequency.setValueAtTime(240, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.oscWarm.connect(warmFilter);
      warmFilter.connect(oscGain);
      oscGain.connect(this.masterGain);
      this.oscWarm.start();

      // 2. Gentle vinyl / room texture
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(this.masterGain);
      this.noiseNode.start();

      this.isRunning = true;
    } catch {
      // AudioContext may be restricted by browser until user gesture
      this.isRunning = false;
    }
  }

  stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.oscWarm?.stop();
        this.noiseNode?.stop();
        this.ctx?.close();
        this.isRunning = false;
      }, 900);
    } catch {
      this.isRunning = false;
    }
  }

  toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const cafeSoundscape = new CafeSoundscape();
