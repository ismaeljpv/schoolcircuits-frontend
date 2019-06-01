import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeparmentComponent } from './add-deparment.component';

describe('AddDeparmentComponent', () => {
  let component: AddDeparmentComponent;
  let fixture: ComponentFixture<AddDeparmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeparmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
