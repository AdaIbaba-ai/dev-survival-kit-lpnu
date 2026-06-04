import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-joke-machine',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './joke-machine.component.html',
  styleUrls: ['./joke-machine.component.css'],
})
export class JokeMachineComponent {
  categories = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  selectedCategory = 'Programming';
  joke: string | null = null;
  favorites: { text: string; date: string; rating?: number }[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
    this.fetchJoke();
  }

  loadFavorites() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteJokes');
      if (saved) {
        this.favorites = JSON.parse(saved);
      }
    }
  }

  saveFavorite() {
    if (this.joke && !this.favorites.some((f) => f.text === this.joke)) {
      this.favorites.unshift({
        text: this.joke,
        date: new Date().toLocaleDateString(),
        rating: this.rating,
      });
      localStorage.setItem('favoriteJokes', JSON.stringify(this.favorites));
    }
  }

  clearFavorites() {
    if (typeof window !== 'undefined') {
      this.favorites = [];
      localStorage.removeItem('favoriteJokes');
    }
  }

  rating: number = 0;

  rateJoke(value: number) {
    this.rating = value;
  }
  fetchJoke() {
    //const url = `https://v2.jokeapi.dev/joke/${this.selectedCategory}`; //unsafe mode
    const url = `https://v2.jokeapi.dev/joke/${this.selectedCategory}?type=single,twopart&safe-mode`; //safe mode

    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (res.type === 'single') {
          this.joke = res.joke;
        } else {
          this.joke = `${res.setup}\n\n${res.delivery}`;
        }
        this.rating = 0; // Reset rating for new joke
      },
      error: () => {
        this.joke = 'Oops. No joke today. The server might be sad.';
      },
    });
  }
}
