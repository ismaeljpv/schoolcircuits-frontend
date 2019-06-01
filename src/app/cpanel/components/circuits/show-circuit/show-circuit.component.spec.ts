import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCircuitComponent } from './show-circuit.component';

describe('ShowCircuitComponent', () => {
  let component: ShowCircuitComponent;
  let fixture: ComponentFixture<ShowCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
