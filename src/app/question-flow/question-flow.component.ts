import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

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
  styleUrls: ['./question-flow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFlowComponent implements OnInit {
  sections$: Observable<Section[]>;
  questionFlows$: Observable<QuestionFlow[]>;
  parentFlows$: Observable<QuestionFlow[]>;
  questionFlow$: Observable<QuestionFlow>;

  currentSection: Section;
  currentQuestionFlow: QuestionFlow;

  constructor(private store: Store<fromStore.ContractDetailsAppState>) {}

  ngOnInit() {
    this.sections$ = this.store.select(
      fromStore.getSectionsFromCurrentContractDetails
    );

    this.store.select(fromStore.getCurrentSection).subscribe(section => {
      this.currentSection = section;
    });

    this.store
      .select(fromStore.getCurrentQuestionFlow)
      .subscribe(questionFlow => {
        this.currentQuestionFlow = questionFlow;
      });
  }

  onQuestionFlowOpen(section: Section) {
    this.store.dispatch(new fromStore.SetCurrentSection(section));
    this.questionFlows$ = this.store.select(
      fromStore.getQuestionFlowsFromSection
    );
    this.parentFlows$ = this.store.select(fromStore.getParentFlowsFromSection);
  }

  onQuestionFlowFormOpen(questionFlow: QuestionFlow) {
    this.store.dispatch(new fromStore.SetCurrentQuestionFlow(questionFlow));
    this.questionFlow$ = of(questionFlow);
    console.log(questionFlow);
  }

  onSetQuestionFlowAnswer(answer: any) {
    this.store.dispatch(new fromStore.SetAnswer(answer));
  }

  previousQuestion(event) {
    this.setInitialSelection();
  }

  nextQuestion(event) {
    if (!this.currentSection || !this.currentQuestionFlow) {
      this.setInitialSelection();
    } else {
      let allSectionsFromContractDetails: Section[];
      let allQuestionFlowsFromSection: QuestionFlow[];
      this.sections$.subscribe(sections => {
        allSectionsFromContractDetails = sections;
      });
      this.questionFlows$.subscribe(questionFlows => {
        allQuestionFlowsFromSection = questionFlows;
      });

      // Set current to first child
      if (this.currentQuestionFlow.questionFlows.length > 0) {
        const nextQuestionFlow = allQuestionFlowsFromSection.find(
          flow => flow.path === this.currentQuestionFlow.path.concat('.1')
        );
        this.onQuestionFlowFormOpen(nextQuestionFlow);
        // Set current to next child
      } else if (
        allQuestionFlowsFromSection.find(
          flow =>
            flow.parentId === this.currentQuestionFlow.parentId &&
            flow.parentId !== 0 &&
            +flow.path > +this.currentQuestionFlow.path
        )
      ) {
        const nextQuestionFlow = allQuestionFlowsFromSection.find(
          flow =>
            flow.parentId === this.currentQuestionFlow.parentId &&
            flow.parentId !== 0 &&
            +flow.path > +this.currentQuestionFlow.path
        );
        this.onQuestionFlowFormOpen(nextQuestionFlow);
        // Set current to next parent
      } else if (
        allQuestionFlowsFromSection.find(
          flow =>
            flow.sequenceNumber ===
            allQuestionFlowsFromSection.find(
              flow2 => flow2.id === this.currentQuestionFlow.parentId
            ).sequenceNumber +
              1
        )
      ) {
        const nextQuestionFlow = allQuestionFlowsFromSection.find(
          flow =>
            flow.sequenceNumber ===
            allQuestionFlowsFromSection.find(
              flow2 => flow2.id === this.currentQuestionFlow.parentId
            ).sequenceNumber +
              1
        );
        this.onQuestionFlowFormOpen(nextQuestionFlow);
        // Set next current section
      } else {
        const nextSection = allSectionsFromContractDetails.find(
          section => section.sequence === this.currentSection.sequence + 1
        );
        this.onQuestionFlowOpen(nextSection);
      }
    }
  }

  setInitialSelection() {
    if (!this.currentSection) {
      this.sections$.subscribe(sections => {
        this.onQuestionFlowOpen(sections[0]);
      });
    }
    if (!this.currentQuestionFlow) {
      this.questionFlows$.subscribe(questionFlows => {
        this.onQuestionFlowFormOpen(questionFlows[0]);
      });
    }
  }
}
