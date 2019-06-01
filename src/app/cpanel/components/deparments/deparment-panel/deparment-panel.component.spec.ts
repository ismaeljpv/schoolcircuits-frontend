import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentPanelComponent } from './deparment-panel.component';

describe('DeparmentPanelComponent', () => {
  let component: DeparmentPanelComponent;
  let fixture: ComponentFixture<DeparmentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparmentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparmentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
