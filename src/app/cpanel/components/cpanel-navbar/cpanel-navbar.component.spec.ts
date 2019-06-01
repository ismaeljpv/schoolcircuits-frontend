import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpanelNavbarComponent } from './cpanel-navbar.component';

describe('CpanelNavbarComponent', () => {
  let component: CpanelNavbarComponent;
  let fixture: ComponentFixture<CpanelNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpanelNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpanelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
