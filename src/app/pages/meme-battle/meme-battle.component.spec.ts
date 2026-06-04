import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeBattleComponent } from './meme-battle.component';

describe('MemeBattleComponent', () => {
  let component: MemeBattleComponent;
  let fixture: ComponentFixture<MemeBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeBattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemeBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
