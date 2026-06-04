import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meme-battle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meme-battle.component.html',
  styleUrls: ['./meme-battle.component.css'],
})
export class MemeBattleComponent {
  memes = [
    'meme1.jpg',
    'meme2.jpg',
    'meme3.jpg',
    'meme4.jpg',
    'meme5.jpg',
    'meme6.jpg',
    'meme7.jpg',
    'meme8.jpg',
    'meme9.jpg',
    'meme10.jpg',
    'meme11.jpg',
    'meme12.jpg',
    'meme13.jpg',
    'meme14.jpg',
    'meme15.jpg',
    'meme16.jpg',
    'meme17.jpg',
    'meme18.jpg',
    'meme19.jpg',
    'meme20.jpg',
    'meme21.jpg',
    'meme22.jpg',
    'meme23.jpg',
    'meme24.jpg',
    'meme25.jpg',
  ];

  shuffledIndices: number[] = [];
  currentChampion = 0;
  nextChallenger = 1;
  currentIndex = 2;
  round = 0;
  showChampion = false;

  constructor() {
    this.shuffleMemes();
  }

  shuffleMemes() {
    const indices = Array.from(this.memes.keys()); // [0, 1, 2, ..., 24]
    this.shuffledIndices = this.shuffleArray(indices);
    this.currentChampion = this.shuffledIndices[0];
    this.nextChallenger = this.shuffledIndices[1];
    this.currentIndex = 2;
  }

  shuffleArray(array: number[]): number[] {
    return array.sort(() => Math.random() - 0.5); // Simple shuffle
  }

  vote(winner: number) {
    this.round++;

    // Final round
    if (this.currentIndex >= this.shuffledIndices.length) {
      this.currentChampion = winner;
      this.showChampion = true;
      return;
    }

    // Winner becomes champion
    this.currentChampion = winner;

    // Load next challenger from shuffled list
    this.nextChallenger = this.shuffledIndices[this.currentIndex];
    this.currentIndex++;
  }
}
