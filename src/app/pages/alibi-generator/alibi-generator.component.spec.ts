import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlibiGeneratorComponent } from './alibi-generator.component';

describe('AlibiGeneratorComponent', () => {
  let component: AlibiGeneratorComponent;
  let fixture: ComponentFixture<AlibiGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlibiGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlibiGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Alibi Generator component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of excuses', () => {
    expect(component.excuses.length).toBeGreaterThan(0);
  });

  it('should generate an excuse from the excuses list', () => {
    spyOn(Math, 'random').and.returnValue(0);

    component.generateExcuse();

    expect(component.excuse).toBe(component.excuses[0]);
  });

  it('should copy generated excuse to clipboard', () => {
    component.excuse = 'My Git forgot how to push. Relatable.';

    const writeTextSpy = jasmine.createSpy('writeText');
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({
      writeText: writeTextSpy,
    } as unknown as Clipboard);

    spyOn(window, 'alert');

    component.copyExcuse();

    expect(writeTextSpy).toHaveBeenCalledWith(
      'My Git forgot how to push. Relatable.'
    );
    expect(window.alert).toHaveBeenCalledWith('Copied excuse to clipboard!');
  });
});
