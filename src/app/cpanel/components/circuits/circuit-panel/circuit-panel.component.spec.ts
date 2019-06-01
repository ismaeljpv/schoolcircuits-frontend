import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitPanelComponent } from './circuit-panel.component';

describe('CircuitPanelComponent', () => {
  let component: CircuitPanelComponent;
  let fixture: ComponentFixture<CircuitPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
