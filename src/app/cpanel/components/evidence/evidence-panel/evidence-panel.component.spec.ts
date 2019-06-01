import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencePanelComponent } from './evidence-panel.component';

describe('EvidencePanelComponent', () => {
  let component: EvidencePanelComponent;
  let fixture: ComponentFixture<EvidencePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidencePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidencePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
