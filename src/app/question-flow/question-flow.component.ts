import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';
import { ContractDetail } from './contract-details.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-question-flow',
  templateUrl: './question-flow.component.html',
  styleUrls: ['./question-flow.component.css']
})
export class QuestionFlowComponent implements OnInit {
  contractDetails$: Observable<ContractDetail[]>;

  constructor(private store: Store<fromStore.QuestionFlowAppState>) {}

  ngOnInit() {
    this.contractDetails$ = this.store.select(fromStore.getContractsEntities);
  }
}
