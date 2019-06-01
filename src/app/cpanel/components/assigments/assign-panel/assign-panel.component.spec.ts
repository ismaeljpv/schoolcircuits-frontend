import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPanelComponent } from './assign-panel.component';

describe('AssignPanelComponent', () => {
  let component: AssignPanelComponent;
  let fixture: ComponentFixture<AssignPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
