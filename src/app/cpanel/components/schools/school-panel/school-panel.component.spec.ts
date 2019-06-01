import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPanelComponent } from './school-panel.component';

describe('SchoolPanelComponent', () => {
  let component: SchoolPanelComponent;
  let fixture: ComponentFixture<SchoolPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
