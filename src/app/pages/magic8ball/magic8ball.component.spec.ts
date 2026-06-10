import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Magic8ballComponent } from './magic8ball.component';

describe('Magic8ballComponent', () => {
  let component: Magic8ballComponent;
  let fixture: ComponentFixture<Magic8ballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Magic8ballComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Magic8ballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
