import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';
import { ContractDetail, QuestionFlow } from './contract-details.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-question-flow',
  templateUrl: './question-flow.component.html',
  styleUrls: ['./question-flow.component.css']
})
export class QuestionFlowComponent implements OnInit {
  contractDetails$: Observable<ContractDetail>;
  section$: Observable<QuestionFlow>;

  constructor(private store: Store<fromStore.ContractDetailsAppState>) {}

  ngOnInit() {
    this.contractDetails$ = this.store.select(fromStore.getContractDetails);
  }

  onQuestionFlowOpen(section: Observable<QuestionFlow>) {
    this.section$ = section;
  }
}
