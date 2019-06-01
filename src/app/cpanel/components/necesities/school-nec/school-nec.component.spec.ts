import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNecComponent } from './school-nec.component';

describe('SchoolNecComponent', () => {
  let component: SchoolNecComponent;
  let fixture: ComponentFixture<SchoolNecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolNecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
