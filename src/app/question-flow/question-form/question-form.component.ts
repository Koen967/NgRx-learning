import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { QuestionFlow } from '../contract-details.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFormComponent implements OnInit {
  @Input() questionFlow: QuestionFlow;

  @Output() setQuestionFlowAnswer = new EventEmitter<Object>();

  constructor() {}

  ngOnInit() {}

  setAnswer(form: any) {
    const answer = {
      questionFlow: this.questionFlow,
      answer: form.choice
    };
    this.setQuestionFlowAnswer.emit(answer);
  }
}
