import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCircuitComponent } from './view-circuit.component';

describe('ViewCircuitComponent', () => {
  let component: ViewCircuitComponent;
  let fixture: ComponentFixture<ViewCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
