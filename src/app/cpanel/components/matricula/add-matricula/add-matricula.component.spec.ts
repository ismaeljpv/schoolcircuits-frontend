import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatriculaComponent } from './add-matricula.component';

describe('AddMatriculaComponent', () => {
  let component: AddMatriculaComponent;
  let fixture: ComponentFixture<AddMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
