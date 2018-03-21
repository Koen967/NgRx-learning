import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';
import {
  ContractDetail,
  QuestionFlow,
  Section
} from './contract-details.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-question-flow',
  templateUrl: './question-flow.component.html',
  styleUrls: ['./question-flow.component.css']
})
export class QuestionFlowComponent implements OnInit {
  contractDetails$: Observable<ContractDetail>;
  questionFlows$: Observable<QuestionFlow[]>;
  questionFlow$: Observable<QuestionFlow>;

  constructor(private store: Store<fromStore.ContractDetailsAppState>) {}

  ngOnInit() {
    this.contractDetails$ = this.store.select(fromStore.getContractDetails);
  }

  onQuestionFlowOpen(section: Section) {
    this.questionFlows$ = of(section.questionFlows);
  }

  onQuestionFlowFormOpen(questionFlow: QuestionFlow) {
    this.questionFlow$ = of(questionFlow);
    console.log(questionFlow);
  }

  onSetQuestionFlowAnswer(answer: any) {
    this.store.dispatch(new fromStore.UpdateQuestionFlow(answer));
  }
}
