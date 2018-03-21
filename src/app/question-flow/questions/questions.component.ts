import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Section, QuestionFlow } from '../contract-details.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() questionFlows: QuestionFlow[];

  @Output() questionFlowFormOpen = new EventEmitter<QuestionFlow>();

  constructor() {}

  ngOnInit() {}

  openQuestionFlowForm(questionFlow: QuestionFlow) {
    this.questionFlowFormOpen.emit(questionFlow);
  }
}
