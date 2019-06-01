import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaPanelComponent } from './matricula-panel.component';

describe('MatriculaPanelComponent', () => {
  let component: MatriculaPanelComponent;
  let fixture: ComponentFixture<MatriculaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
