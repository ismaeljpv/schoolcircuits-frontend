import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpanelDataComponent } from './cpanel-data.component';

describe('CpanelDataComponent', () => {
  let component: CpanelDataComponent;
  let fixture: ComponentFixture<CpanelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpanelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpanelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
