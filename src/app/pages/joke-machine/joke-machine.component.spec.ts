import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeMachineComponent } from './joke-machine.component';

describe('JokeMachineComponent', () => {
  let component: JokeMachineComponent;
  let fixture: ComponentFixture<JokeMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
