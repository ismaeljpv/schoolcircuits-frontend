import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCircuitComponent } from './update-circuit.component';

describe('UpdateCircuitComponent', () => {
  let component: UpdateCircuitComponent;
  let fixture: ComponentFixture<UpdateCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
