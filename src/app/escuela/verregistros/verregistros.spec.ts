import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Verregistros } from './verregistros';

describe('Verregistros', () => {
  let component: Verregistros;
  let fixture: ComponentFixture<Verregistros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verregistros],
    }).compileComponents();

    fixture = TestBed.createComponent(Verregistros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
