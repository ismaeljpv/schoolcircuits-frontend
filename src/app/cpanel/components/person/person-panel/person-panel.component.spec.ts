import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPanelComponent } from './person-panel.component';

describe('PersonPanelComponent', () => {
  let component: PersonPanelComponent;
  let fixture: ComponentFixture<PersonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
