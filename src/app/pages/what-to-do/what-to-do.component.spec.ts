import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatToDoComponent } from './what-to-do.component';

describe('WhatToDoComponent', () => {
  let component: WhatToDoComponent;
  let fixture: ComponentFixture<WhatToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatToDoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the What To Do component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tasks for the roulette', () => {
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('should calculate total weight and wheel slices', () => {
    component.slices = [];
    component.setupSlices();

    expect(component.totalWeight).toBeGreaterThan(0);
    expect(component.slices.length).toBe(component.tasks.length);
  });

  it('should return true when tasks are available', () => {
    expect(component.hasTasks).toBeTrue();
  });

  it('should create confetti particles', () => {
    const particles = component.createConfettiParticles(10);

    expect(particles.length).toBe(10);
    expect(particles[0].size).toBeGreaterThan(0);
  });

  it('should create rain particles', () => {
    const particles = component.createRainParticles(10);

    expect(particles.length).toBe(10);
    expect(particles[0].dy).toBeGreaterThan(0);
  });
});
