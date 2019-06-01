import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMatriculaComponent } from './view-matricula.component';

describe('ViewMatriculaComponent', () => {
  let component: ViewMatriculaComponent;
  let fixture: ComponentFixture<ViewMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
