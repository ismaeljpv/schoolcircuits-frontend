import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatriculaComponent } from './update-matricula.component';

describe('UpdateMatriculaComponent', () => {
  let component: UpdateMatriculaComponent;
  let fixture: ComponentFixture<UpdateMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
