import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchoolComponent } from './show-school.component';

describe('ShowSchoolComponent', () => {
  let component: ShowSchoolComponent;
  let fixture: ComponentFixture<ShowSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
