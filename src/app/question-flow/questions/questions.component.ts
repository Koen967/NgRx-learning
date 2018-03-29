import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Section, QuestionFlow } from '../contract-details.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit {
  @Input() questionFlows: QuestionFlow[];
  @Input() parentFlows: QuestionFlow[];
  @Input() currentQuestionFlow: QuestionFlow;

  @Output() questionFlowFormOpen = new EventEmitter<QuestionFlow>();

  constructor() {}

  ngOnInit() {}

  openQuestionFlowForm(questionFlow: QuestionFlow) {
    this.questionFlowFormOpen.emit(questionFlow);
  }

  childQuestionFlows(questionFlow: QuestionFlow) {
    return this.questionFlows.filter(flow => flow.parentId === questionFlow.id);
  }
}
