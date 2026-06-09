import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemeBattleComponent } from './meme-battle.component';

describe('MemeBattleComponent', () => {
  let component: MemeBattleComponent;
  let fixture: ComponentFixture<MemeBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeBattleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemeBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Meme Battle component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize meme list', () => {
    expect(component.memes.length).toBe(25);
  });

  it('should create shuffled indices for all memes', () => {
    expect(component.shuffledIndices.length).toBe(component.memes.length);
  });

  it('should increase round after voting', () => {
    const initialRound = component.round;

    component.vote(component.currentChampion);

    expect(component.round).toBe(initialRound + 1);
  });

  it('should show champion when final round is reached', () => {
    component.currentIndex = component.shuffledIndices.length;

    component.vote(component.currentChampion);

    expect(component.showChampion).toBeTrue();
  });
});
