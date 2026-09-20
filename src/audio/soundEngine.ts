/**
 * Web Audio Engine:
 * 1. REAL Recorded Mechanical Keyboard Sound Engine (Mechvibes Studio Samples)
 *    - 24 authentic mechanical key recordings + dedicated Enter and Spacebar sounds
 *    - Natural acoustics, realistic tactile feedback, zero harsh synthetic artifacts
 * 2. Polyphonic Generative Ambient Soundtrack that evolves across narrative chapters
 * 3. Cinematic chapter transition impacts & CSS reality-shift whoosh
 */

// Musical Chords for Chapters (Root frequencies in Hz)
// Musical Chords for Chapters (Root frequencies in Hz)
const CHORD_PROGRESSIONS: Record<number, number[][]> = {
  // Ch 0 - 1991 Empty Document: Deep contemplative drone (C2, C3, G3, D4)
  0: [[65.41, 130.81, 196.00, 293.66]],
  // Ch 1 - 1991 The First Idea: Gentle suspended awakening (Cmaj9)
  1: [[65.41, 130.81, 196.00, 329.63], [110.00, 164.81, 220.00, 329.63]],
  // Ch 2 - 1993 Connections: Open interconnected fourths & fifths
  2: [[87.31, 130.81, 174.61, 261.63], [98.00, 146.83, 196.00, 293.66]],
  // Ch 3 - 1993-1995 The Article: Rich narrative editorial depth (Fmaj7 / G)
  3: [[87.31, 130.81, 174.61, 261.63, 349.23], [98.00, 146.83, 196.00, 293.66, 392.00]],
  // Ch 4 - 1993 Image / Figure: Geometric golden ratio clarity
  4: [[110.00, 164.81, 220.00, 329.63], [73.42, 146.83, 220.00, 293.66]],
  // Ch 5 - 1996 Structured Information: Steady cadence of accumulated knowledge
  5: [[87.31, 174.61, 220.00, 349.23], [98.00, 196.00, 246.94, 392.00]],
  // Ch 6 - 1995 The Page Listens: Curious expectant cadence
  6: [[110.00, 164.81, 261.63, 329.63], [73.42, 146.83, 220.00, 293.66]],
  // Ch 7 - 2014 Native Interaction: Playful suspended discovery
  7: [[73.42, 146.83, 220.00, 349.23], [98.00, 146.83, 196.00, 293.66]],
  // Ch 8 - 2001 Vector Graphics: Precise crystal architecture
  8: [[87.31, 130.81, 174.61, 261.63], [110.00, 164.81, 220.00, 329.63]],
  // Ch 9 - CSS Arrives: BRILLIANT HARMONIC SWELL (The transformation payoff)
  9: [[65.41, 130.81, 196.00, 329.63, 493.88], [87.31, 174.61, 261.63, 392.00, 523.25]],
  // Ch 10 - Motion & Micro-Interactions: Fluid shimmer
  10: [[110.00, 220.00, 329.63, 440.00], [73.42, 146.83, 220.00, 349.23]],
  // Ch 11 - JavaScript: Kinetic living DOM dynamic pulse
  11: [[73.42, 146.83, 220.00, 349.23], [58.27, 116.54, 174.61, 293.66]],
  // Ch 12 - The Web Builds Itself: Grand celestial resolution (Full Spectrum Cmaj9)
  12: [[65.41, 130.81, 196.00, 261.63, 329.63, 392.00, 493.88]],
};

export interface AudioStatus {
  isMuted: boolean;
  isSuspended: boolean;
  isRunning: boolean;
  isReady: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private statusListeners: Set<(status: AudioStatus) => void> = new Set();

  // Real Sample Buffers (Mechvibes Soundpack)
  private realKeyBuffers: AudioBuffer[] = [];
  private realEnterBuffer: AudioBuffer | null = null;
  private realSpaceBuffer: AudioBuffer | null = null;
  private isSamplesLoaded: boolean = false;
  private isLoadingSamples: boolean = false;

  // Ambient Music Nodes
  private musicMasterGain: GainNode | null = null;
  private padFilter: BiquadFilterNode | null = null;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private arpTimer: NodeJS.Timeout | null = null;
  private currentChapter: number = 0;
  private isStoryPlaying: boolean = false;
  private chordIndex: number = 0;
  private musicInterval: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Auto-unlock Web Audio on ANY user interaction (click, touch, key, scroll)
      const autoUnlock = () => {
        this.ensureActive();
      };
      ['pointerdown', 'touchstart', 'keydown', 'click', 'scroll'].forEach((evt) => {
        window.addEventListener(evt, autoUnlock, { passive: true });
      });

      // Eagerly initialize Web Audio pipeline on load
      setTimeout(() => {
        try {
          this.init();
        } catch (e) {}
      }, 50);
    }
  }

  public subscribe(fn: (status: AudioStatus) => void): () => void {
    this.statusListeners.add(fn);
    fn(this.getStatus());
    return () => {
      this.statusListeners.delete(fn);
    };
  }

  private notifyStatus() {
    const status = this.getStatus();
    this.statusListeners.forEach((fn) => fn(status));
  }

  public getStatus(): AudioStatus {
    const isSuspended = !this.ctx || this.ctx.state === 'suspended';
    const isRunning = !!this.ctx && this.ctx.state === 'running';
    return {
      isMuted: this.isMuted,
      isSuspended,
      isRunning,
      isReady: isRunning && !this.isMuted
    };
  }

  public setStoryPlaying(playing: boolean, chapterIndex?: number) {
    this.isStoryPlaying = playing;
    if (chapterIndex !== undefined) {
      this.currentChapter = chapterIndex;
    }
    this.updateMusicGain();
  }

  private updateMusicGain() {
    if (!this.ctx || !this.musicMasterGain) return;
    const t = this.ctx.currentTime;
    this.musicMasterGain.gain.cancelScheduledValues(t);

    // Music ONLY plays when watching the story and before reaching the finished portfolio (Chapter 12)
    const shouldPlayMusic = !this.isMuted && this.isStoryPlaying && this.currentChapter < 12;

    if (shouldPlayMusic) {
      this.musicMasterGain.gain.setValueAtTime(this.musicMasterGain.gain.value, t);
      this.musicMasterGain.gain.linearRampToValueAtTime(0.28, t + 0.4);
    } else {
      this.musicMasterGain.gain.setValueAtTime(this.musicMasterGain.gain.value, t);
      this.musicMasterGain.gain.linearRampToValueAtTime(0.0001, t + 0.3);
      this.activeVoices.forEach((voice) => {
        try {
          voice.gain.gain.cancelScheduledValues(t);
          voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
          voice.gain.gain.linearRampToValueAtTime(0.0001, t + 0.3);
        } catch (e) {}
      });
    }
  }

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this.notifyStatus();
      return;
    }
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isInitialized = true;
        this.setupBackgroundMusic();
        this.loadRealKeySamples();

        this.ctx.onstatechange = () => {
          this.notifyStatus();
          this.updateMusicGain();
        };

        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
    this.notifyStatus();
  }

  public async ensureActive(): Promise<boolean> {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {}
    }
    this.updateMusicGain();
    this.notifyStatus();
    return !!this.ctx && this.ctx.state === 'running';
  }

  /**
   * Progressive preload of real recorded mechanical keyboard samples
   * High-priority key 1 and Enter/Space load in <50ms, while others stream in background
   */
  private async loadRealKeySamples() {
    if (this.isLoadingSamples || this.isSamplesLoaded || !this.ctx) return;
    this.isLoadingSamples = true;

    try {
      const loadSound = async (filename: string): Promise<AudioBuffer | null> => {
        try {
          const baseUrl = import.meta.env.BASE_URL || './';
          const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
          const res = await fetch(`${cleanBase}sounds/keyboard/${filename}`);
          if (!res.ok) return null;
          const arrayBuf = await res.arrayBuffer();
          if (!this.ctx) return null;
          return await this.ctx.decodeAudioData(arrayBuf);
        } catch (e) {
          return null;
        }
      };

      // 1. Immediate fast load for primary key, enter, and space
      const [key1, enterBuf, spaceBuf] = await Promise.all([
        loadSound('1.wav'),
        loadSound('enter.wav'),
        loadSound('space.wav')
      ]);

      if (key1) {
        this.realKeyBuffers.push(key1);
        this.isSamplesLoaded = true;
      }
      this.realEnterBuffer = enterBuf;
      this.realSpaceBuffer = spaceBuf;

      // 2. Stream remaining keys concurrently into pool
      const remainingIndices = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      remainingIndices.forEach(async (idx) => {
        const buf = await loadSound(`${idx}.wav`);
        if (buf) {
          this.realKeyBuffers.push(buf);
          this.isSamplesLoaded = true;
        }
      });
    } catch (err) {
      console.warn('[SoundEngine] Real samples fallback to procedural audio', err);
    } finally {
      this.isLoadingSamples = false;
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isMuted = !this.isMuted;
    this.updateMusicGain();
    this.notifyStatus();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }
    this.updateMusicGain();
    this.notifyStatus();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // =========================================================================
  // 1. REAL MECHANICAL KEYBOARD PLAYBACK (Authentic Studio Samples)
  // =========================================================================
  public playKeyClick(isSpecialKey: boolean = false, isEnter: boolean = false) {
    // Keyboard sounds only play when actively watching story and before portfolio is finished
    if (this.isMuted || !this.isStoryPlaying || this.currentChapter >= 12 || !this.ctx || this.ctx.state === 'suspended') return;

    // A. Use Real Recorded Samples if Loaded
    if (this.isSamplesLoaded && this.realKeyBuffers.length > 0) {
      try {
        let buffer: AudioBuffer;
        if (isEnter && this.realEnterBuffer) {
          buffer = this.realEnterBuffer;
        } else if (isSpecialKey && this.realSpaceBuffer) {
          buffer = this.realSpaceBuffer;
        } else {
          const randIdx = Math.floor(Math.random() * this.realKeyBuffers.length);
          buffer = this.realKeyBuffers[randIdx];
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        // Subtle realistic pitch variance (+/- 3%)
        source.playbackRate.value = 0.97 + Math.random() * 0.06;

        const gain = this.ctx.createGain();
        // Gentle, pleasant, non-intrusive mechanical clack volume
        gain.gain.value = isEnter || isSpecialKey ? 0.15 : 0.11;

        source.connect(gain);
        gain.connect(this.ctx.destination);

        source.start(0);
        return;
      } catch (e) {
        // Fallback to procedural
      }
    }

    // B. Procedural Fallback if samples are still loading
    this.playProceduralKeyClick(isSpecialKey);
  }

  private playProceduralKeyClick(isSpecialKey: boolean = false) {
    if (this.isMuted || !this.isStoryPlaying || this.currentChapter >= 12 || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') return;
      const t = this.ctx.currentTime;

      // Soft natural tactile click
      const clickBufferSize = Math.floor(this.ctx.sampleRate * 0.008);
      const clickBuffer = this.ctx.createBuffer(1, clickBufferSize, this.ctx.sampleRate);
      const clickData = clickBuffer.getChannelData(0);
      for (let i = 0; i < clickBufferSize; i++) {
        clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (clickBufferSize * 0.3));
      }

      const clickSource = this.ctx.createBufferSource();
      clickSource.buffer = clickBuffer;

      const clickFilter = this.ctx.createBiquadFilter();
      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(isSpecialKey ? 2200 : 3000 + (Math.random() * 300 - 150), t);
      clickFilter.Q.setValueAtTime(3.0, t);

      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0.08, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

      clickSource.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(this.ctx.destination);

      clickSource.start(t);
      clickSource.stop(t + 0.012);
    } catch (e) {}
  }

  // =========================================================================
  // 2. PROCEDURAL GENERATIVE AMBIENT MUSIC ENGINE
  // =========================================================================
  private setupBackgroundMusic() {
    if (!this.ctx) return;

    this.musicMasterGain = this.ctx.createGain();
    this.musicMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.padFilter = this.ctx.createBiquadFilter();
    this.padFilter.type = 'lowpass';
    this.padFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    this.padFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.padFilter.connect(this.musicMasterGain);
    this.musicMasterGain.connect(this.ctx.destination);

    this.startChordProgression();
    this.startSubtleArpeggio();
    this.updateMusicGain();
  }

  public setChapter(chapterIndex: number) {
    if (this.currentChapter === chapterIndex) return;
    this.currentChapter = chapterIndex;
    if (chapterIndex >= 12) {
      // Portfolio is finished! Silence music immediately
      this.updateMusicGain();
      return;
    }
    this.transitionToChapterChords(chapterIndex);
    this.playTransitionImpact();
    this.updateMusicGain();
  }

  private startChordProgression() {
    if (this.musicInterval) clearInterval(this.musicInterval);
    this.musicInterval = setInterval(() => {
      this.chordIndex++;
      this.playCurrentChord();
    }, 6000);
    this.playCurrentChord();
  }

  private playCurrentChord() {
    if (!this.ctx || !this.padFilter || !this.isStoryPlaying || this.currentChapter >= 12 || this.isMuted) return;
    const t = this.ctx.currentTime;
    const chords = CHORD_PROGRESSIONS[this.currentChapter] || CHORD_PROGRESSIONS[0];
    const notes = chords[this.chordIndex % chords.length];

    this.activeVoices.forEach((voice) => {
      try {
        voice.gain.gain.cancelScheduledValues(t);
        voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
        voice.gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
        setTimeout(() => {
          try { voice.osc.stop(); } catch (e) {}
        }, 2000);
      } catch (e) {}
    });
    this.activeVoices = [];

    if (this.padFilter) {
      const targetFilter = this.currentChapter >= 10 ? 3200 : (this.currentChapter >= 4 ? 1400 : 750);
      this.padFilter.frequency.cancelScheduledValues(t);
      this.padFilter.frequency.setValueAtTime(this.padFilter.frequency.value, t);
      this.padFilter.frequency.exponentialRampToValueAtTime(targetFilter, t + 2.5);
    }

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.padFilter) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq + (i % 2 === 0 ? 0.35 : -0.35), t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.12 / (notes.length * 0.7), t + 1.5);

      osc.connect(gain);
      gain.connect(this.padFilter);

      osc.start(t);
      this.activeVoices.push({ osc, gain });
    });
  }

  private startSubtleArpeggio() {
    if (this.arpTimer) clearInterval(this.arpTimer);
    let step = 0;
    this.arpTimer = setInterval(() => {
      if (this.isMuted || !this.ctx || this.ctx.state === 'suspended' || !this.isStoryPlaying || this.currentChapter >= 12) return;
      if (this.currentChapter < 3) return;

      const chords = CHORD_PROGRESSIONS[this.currentChapter] || CHORD_PROGRESSIONS[0];
      const notes = chords[this.chordIndex % chords.length];
      const noteFreq = notes[step % notes.length] * 2;
      step++;

      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(noteFreq, t);

        gain.gain.setValueAtTime(0.055, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.musicMasterGain || this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.4);
      } catch (e) {}
    }, 380);
  }

  private transitionToChapterChords(chapter: number) {
    this.chordIndex = 0;
    this.playCurrentChord();
    if (chapter === 3) {
      this.playCssRealityShiftSound();
    }
  }

  // =========================================================================
  // 3. CINEMATIC IMPACTS & TRANSITIONS
  // =========================================================================
  public playTransitionImpact() {
    if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return;
    try {
      const t = this.ctx.currentTime;

      // Sub bass boom
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(80, t);
      sub.frequency.exponentialRampToValueAtTime(35, t + 0.35);

      subGain.gain.setValueAtTime(0.24, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(t);
      sub.stop(t + 0.55);

      // Glass crystal chime
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(1046.5, t);
      chime.frequency.exponentialRampToValueAtTime(1318.5, t + 0.08);

      chimeGain.gain.setValueAtTime(0.1, t);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(t);
      chime.stop(t + 0.35);
    } catch (e) {}
  }

  public playCssRealityShiftSound() {
    if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130.81, t);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, t);
      filter.frequency.exponentialRampToValueAtTime(4500, t + 0.8);
      filter.Q.setValueAtTime(4.0, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.3);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
