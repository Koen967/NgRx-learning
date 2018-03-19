import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFlowComponent } from './question-flow.component';

describe('QuestionFlowComponent', () => {
  let component: QuestionFlowComponent;
  let fixture: ComponentFixture<QuestionFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
