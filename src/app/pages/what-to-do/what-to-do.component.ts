import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

/** Each wheel slice. */
interface Task {
  label: string;
  emoji: string;
  weight: number;
  color: string;
}


/** Particle for either confetti or rain. */
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
  rotate: number;
  dRotate: number;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-what-to-do',
  templateUrl: './what-to-do.component.html',
  styleUrls: ['./what-to-do.component.css'],
})
export class WhatToDoComponent implements AfterViewInit {
  @ViewChild('wheelCanvas') wheelCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('effectCanvas') effectCanvas!: ElementRef<HTMLCanvasElement>;

  tasks: Task[] = [
    { label: 'Coffee Break', emoji: '☕', weight: 8, color: '#fed7aa' },
    { label: 'Snack Attack', emoji: '🍿', weight: 8, color: '#fde68a' },
    { label: 'Cat Videos', emoji: '🐱', weight: 8, color: '#a5f3fc' },
    { label: 'Fix a Bug', emoji: '🐛', weight: 1, color: '#000000' },

    { label: 'Stretch It Out', emoji: '🧘', weight: 8, color: '#fbcfe8' },
    { label: 'Water Refill', emoji: '💧', weight: 8, color: '#c7d2fe' },
    { label: 'Office Gossip', emoji: '🙊', weight: 8, color: '#f9a8d4' },
    { label: 'Code Review', emoji: '🛠', weight: 1, color: '#000000' },

    { label: 'Mindful Meditation', emoji: '🧠', weight: 8, color: '#fde68a' },
    { label: 'Watch YouTube', emoji: '📺', weight: 8, color: '#fecaca' },
    { label: 'Check Socials', emoji: '📱', weight: 8, color: '#bbf7d0' },
    { label: 'Refactor Legacy Code', emoji: '🔧', weight: 1, color: '#000000' },
  ];

  config = {
    spinDuration: 4,
    effectDuration: 3,
    effectCount: 150,
    maxHistory: 5,
  };

  slices: {
    startAngle: number;
    endAngle: number;
    label: string;
    emoji: string;
    color: string;
  }[] = [];

  totalWeight = 0;
  currentRotation = 0;
  isSpinning = false;
  selectedTask: Task | null = null;

  spinHistory: Task[] = [];

  effectParticles: Particle[] = [];
  effectActive = false;
  effectTimer: any = null;

  ngAfterViewInit() {
    this.setupSlices();
    this.drawWheel();
  }

  setupSlices() {
    this.totalWeight = this.tasks.reduce((sum, t) => sum + t.weight, 0);

    let startAngle = 0;
    for (const task of this.tasks) {
      const sliceAngle = 360 * (task.weight / this.totalWeight);
      const endAngle = startAngle + sliceAngle;
      this.slices.push({
        startAngle,
        endAngle,
        label: task.label,
        emoji: task.emoji,
        color: task.color,
      });
      startAngle = endAngle;
    }
  }

  drawWheel() {
    const canvas = this.wheelCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    ctx.clearRect(0, 0, size, size);

    for (const slice of this.slices) {
      const startRadians = (slice.startAngle * Math.PI) / 180;
      const endRadians = (slice.endAngle * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, center, startRadians, endRadians);
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.closePath();

      const midAngle = (startRadians + endRadians) / 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = slice.color === '#000000' ? '#ffffff' : '#1f2937';
      ctx.font = 'bold 20px "Quicksand", sans-serif';

      const text = `${slice.emoji} ${slice.label}`;
      ctx.fillText(text, center * 0.55, 0);
      ctx.restore();
    }
  }

  spinWheel() {
    if (this.isSpinning || !this.hasTasks) return;
    this.isSpinning = true;
    this.selectedTask = null;

    const randomIndex = Math.floor(Math.random() * this.slices.length);
    const chosenSlice = this.slices[randomIndex];

    const sliceMid =
      chosenSlice.startAngle +
      (chosenSlice.endAngle - chosenSlice.startAngle) / 2;

    // do 3..5 extra spins from current position
    const extraSpins = Math.floor(Math.random() * 3) + 3; // e.g., 3..5
    const finalAngle =
      this.currentRotation + 360 * extraSpins + (360 - sliceMid);

    // animate spin (4s by default) with CSS transition
    this.currentRotation = finalAngle;

    // after spin finishes, find which slice landed at 0° (the pointer)
    setTimeout(() => {
      const normalized = ((this.currentRotation % 360) + 360) % 360;
      const pointerAngle = (360 - normalized) % 360;

      const winner = this.slices.find(
        (s) => pointerAngle >= s.startAngle && pointerAngle < s.endAngle
      );
      if (winner) {
        // final result
        this.selectedTask =
          this.tasks.find((t) => t.label === winner.label) || null;

        // track spin history
        if (this.selectedTask) {
          this.spinHistory.unshift(this.selectedTask);

          this.analytics.capture('roulette_spun', {
            tool: 'What To Do Roulette',
            result: this.selectedTask.label,
            result_type: this.selectedTask.color === '#000000' ? 'work' : 'chill',
          });

          if (this.spinHistory.length > this.config.maxHistory) {
            this.spinHistory.pop();
          }
        }

        // If it's a chill slice (color != black), show confetti
        // If it's black, show "sad" effect (rain)
        if (winner.color === '#000000') {
          this.startRain();
        } else {
          this.startConfetti();
        }
      }
      this.isSpinning = false;
    }, this.config.spinDuration * 1000);
  }

  /** If tasks array is empty, hide the spin button. */
  get hasTasks(): boolean {
    return this.tasks.length > 0;
  }

  /**************************************************************************
   * CONFETTI or RAIN
   * We'll reuse the same canvas but spawn different
   * color sets + shapes for "confetti" vs "rain".
   **************************************************************************/
  startConfetti() {
    if (this.effectActive) return;
    this.effectActive = true;

    this.effectParticles = this.createConfettiParticles(
      this.config.effectCount
    );
    this.animateEffect();

    // stop after config.effectDuration
    this.effectTimer = setTimeout(() => {
      this.effectActive = false;
    }, this.config.effectDuration * 1000);
  }

  startRain() {
    if (this.effectActive) return;
    this.effectActive = true;

    this.effectParticles = this.createRainParticles(this.config.effectCount);
    this.animateEffect();

    // stop after config.effectDuration
    this.effectTimer = setTimeout(() => {
      this.effectActive = false;
    }, this.config.effectDuration * 1000);
  }

  /**
   * Creates confetti: squares of random pastel color.
   */
  createConfettiParticles(num: number): Particle[] {
    const canvas = this.effectCanvas.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    const colors = [
      '#ffadad',
      '#ffd6a5',
      '#fdffb6',
      '#caffbf',
      '#9bf6ff',
      '#a0c4ff',
      '#bdb2ff',
      '#ffc6ff',
      '#f9c6c9',
      '#f3eac2',
      '#d6f5d6',
    ];
    const parts: Particle[] = [];
    for (let i = 0; i < num; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * h - h, // start above top
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.random() * 6 - 3, // horizontal
        dy: Math.random() * 4 + 2, // vertical
        rotate: Math.random() * 360,
        dRotate: Math.random() * 10 - 5,
      });
    }
    return parts;
  }

  /**
   * Creates "rain": lines or drops in shades of gray/blue.
   */
  createRainParticles(num: number): Particle[] {
    const canvas = this.effectCanvas.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    // greys or blues for a "sad" vibe
    const colors = ['#94a3b8', '#64748b', '#475569', '#1e293b', '#6b7280'];
    const parts: Particle[] = [];
    for (let i = 0; i < num; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * h - h,
        size: Math.random() * 8 + 4, // line length or drop size
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.random() * 1 - 0.5, // slight horizontal drift
        dy: Math.random() * 4 + 3, // faster downward
        rotate: 0,
        dRotate: 0,
      });
    }
    return parts;
  }

  /**
   * animateEffect() is called each frame while effectActive is true.
   * We reuse the same canvas for either confetti or rain.
   */
  animateEffect() {
    if (!this.effectActive) {
      this.clearEffect();
      return;
    }

    const canvas = this.effectCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    this.effectParticles.forEach((p) => {
      // update position
      p.x += p.dx;
      p.y += p.dy;
      p.rotate += p.dRotate;

      // draw
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotate * Math.PI) / 180);

      // If confetti, draw squares
      // If rain, draw lines
      if (p.dRotate !== 0) {
        // confetti
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        // rain
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // draw a short line
        ctx.moveTo(0, 0);
        ctx.lineTo(0, p.size);
        ctx.stroke();
      }
      ctx.restore();

      // if off bottom, reset top
      if (p.y > h) {
        p.y = -10;
      }
    });

    requestAnimationFrame(() => this.animateEffect());
  }

  /** Clear effect canvas + empty array. */
  clearEffect() {
    const canvas = this.effectCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.effectParticles = [];
  }

  constructor(private analytics: AnalyticsService) {}
}
