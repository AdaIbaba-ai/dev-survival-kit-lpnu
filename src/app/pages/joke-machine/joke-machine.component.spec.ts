import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { JokeMachineComponent } from './joke-machine.component';

describe('JokeMachineComponent', () => {
  let component: JokeMachineComponent;
  let fixture: ComponentFixture<JokeMachineComponent>;

  const fakeHttpClient = {
    get: jasmine.createSpy('get').and.returnValue(
      of({
        type: 'single',
        joke: 'Mock joke from fake API',
      })
    ),
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [JokeMachineComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: fakeHttpClient,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    fakeHttpClient.get.calls.reset();
  });

  it('should create the Joke Machine component', () => {
    expect(component).toBeTruthy();
  });

  it('should have joke categories', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories).toContain('Programming');
  });

  it('should use Programming as default category', () => {
    expect(component.selectedCategory).toBe('Programming');
  });

  it('should have an empty or loaded joke state', () => {
    expect(component.joke === null || typeof component.joke === 'string').toBeTrue();
  });

  it('should update joke rating', () => {
    component.rateJoke(4);

    expect(component.rating).toBe(4);
  });

  it('should save current joke as favorite', () => {
    component.joke = 'My test joke';
    component.rating = 5;

    component.saveFavorite();

    expect(component.favorites.length).toBe(1);
    expect(component.favorites[0].text).toBe('My test joke');
    expect(component.favorites[0].rating).toBe(5);
  });

  it('should not save duplicate favorite jokes', () => {
    component.joke = 'Duplicate joke';

    component.saveFavorite();
    component.saveFavorite();

    expect(component.favorites.length).toBe(1);
  });

  it('should clear favorite jokes', () => {
    component.joke = 'Favorite joke';
    component.saveFavorite();

    component.clearFavorites();

    expect(component.favorites.length).toBe(0);
    expect(localStorage.getItem('favoriteJokes')).toBeNull();
  });
});
