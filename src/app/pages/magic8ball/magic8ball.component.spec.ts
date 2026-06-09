import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Magic8ballComponent } from './magic8ball.component';

describe('Magic8ballComponent', () => {
  let component: Magic8ballComponent;
  let fixture: ComponentFixture<Magic8ballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Magic8ballComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Magic8ballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Magic 8-Ball component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of possible answers', () => {
    expect(component.answers.length).toBeGreaterThan(0);
  });

  it('should set currentAnswer when shakeBall is called', () => {
    spyOn(Math, 'random').and.returnValue(0);

    component.shakeBall();

    expect(component.currentAnswer).toBe(component.answers[0]);
  });

  it('should copy current answer to clipboard when answer exists', () => {
    component.currentAnswer = 'Test advice';

    const writeTextSpy = jasmine.createSpy('writeText');
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({
      writeText: writeTextSpy,
    } as unknown as Clipboard);

    spyOn(window, 'alert');

    component.copyAnswer();

    expect(writeTextSpy).toHaveBeenCalledWith('Test advice');
    expect(window.alert).toHaveBeenCalledWith('Copied advice to clipboard!');
  });
});
