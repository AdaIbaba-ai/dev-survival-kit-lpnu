import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlibiGeneratorComponent } from './alibi-generator.component';

describe('AlibiGeneratorComponent', () => {
  let component: AlibiGeneratorComponent;
  let fixture: ComponentFixture<AlibiGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlibiGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlibiGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
