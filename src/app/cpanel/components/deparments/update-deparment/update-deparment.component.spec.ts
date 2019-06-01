import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeparmentComponent } from './update-deparment.component';

describe('UpdateDeparmentComponent', () => {
  let component: UpdateDeparmentComponent;
  let fixture: ComponentFixture<UpdateDeparmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeparmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
