import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionFlow } from '../contract-details.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @Input() questionFlow: QuestionFlow;

  @Output() setQuestionFlowAnswer = new EventEmitter<Object>();

  constructor() {}

  ngOnInit() {}

  setAnswer(form: any) {
    const answer = {
      id: this.questionFlow.id,
      answer: form.choice
    };
    console.log(answer);
    /* const newQuestionFlow: QuestionFlow = Object.assign({}, this.questionFlow);
    newQuestionFlow.answer = form.choice; */
    this.setQuestionFlowAnswer.emit(answer);
  }
}
