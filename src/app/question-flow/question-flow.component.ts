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
  currentSection$: Observable<Section>;
  currentQuestionFlow$: Observable<QuestionFlow>;

  currentSection: Section;
  currentQuestionFlow: QuestionFlow;

  constructor(private store: Store<fromStore.ContractDetailsAppState>) {}

  ngOnInit() {
    this.sections$ = this.store.select(
      fromStore.getSectionsFromCurrentContractDetails
    );

    this.currentSection$ = this.store.select(fromStore.getCurrentSection);

    this.currentSection$.subscribe(section => {
      this.currentSection = section;
      console.log('Subscription', section);
    });

    this.currentQuestionFlow$ = this.store.select(
      fromStore.getCurrentQuestionFlow
    );

    this.currentQuestionFlow$.subscribe(questionFlow => {
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
    console.log('QuestionFormOpen', questionFlow);
  }

  onSetQuestionFlowAnswer(answer: any) {
    console.log('Dispatch', this.currentSection);
    this.store.dispatch(new fromStore.SetAnswer(answer, this.currentSection));
  }

  previousQuestion(event) {
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

      if (this.currentQuestionFlow.parentId === 0) {
        if (
          allQuestionFlowsFromSection.find(
            flow => +flow.path === +this.currentQuestionFlow.path - 1
          )
        ) {
          if (
            allQuestionFlowsFromSection.find(
              flow => +flow.path === +this.currentQuestionFlow.path - 1
            ).questionFlows.length > 0 &&
            allQuestionFlowsFromSection.find(
              flow => +flow.path === +this.currentQuestionFlow.path - 1
            ).showSubQuestionOn === 'true'
          ) {
            let highestPath = 0;
            allQuestionFlowsFromSection
              .find(flow => +flow.path === +this.currentQuestionFlow.path - 1)
              .questionFlows.forEach(questionFlow => {
                if (
                  +allQuestionFlowsFromSection.find(
                    flow => flow.id === questionFlow
                  ).path > highestPath
                ) {
                  highestPath = +allQuestionFlowsFromSection.find(
                    flow => flow.id === questionFlow
                  ).path;
                }
              });
            const nextQuestionFlow = allQuestionFlowsFromSection.find(
              flow => +flow.path === highestPath
            );
            this.onQuestionFlowFormOpen(nextQuestionFlow);
          } else {
            const nextQuestionFlow = allQuestionFlowsFromSection.find(
              flow => +flow.path === +this.currentQuestionFlow.path - 1
            );
            this.onQuestionFlowFormOpen(nextQuestionFlow);
          }
        } else if (
          allSectionsFromContractDetails.find(
            section => section.sequence === this.currentSection.sequence - 1
          )
        ) {
          const nextSection = allSectionsFromContractDetails.find(
            section => section.sequence === this.currentSection.sequence - 1
          );
          this.onQuestionFlowOpen(nextSection);

          let nextQuestionFlow = allQuestionFlowsFromSection[0];
          allQuestionFlowsFromSection.forEach(questionFlow => {
            if (+questionFlow.path > +nextQuestionFlow.path) {
              nextQuestionFlow = questionFlow;
            }
          });
          this.onQuestionFlowFormOpen(nextQuestionFlow);
        }
      } else {
        const nextQuestionFlow = allQuestionFlowsFromSection.find(
          flow =>
            (+flow.path).toFixed(2) ===
            (+this.currentQuestionFlow.path - 0.1).toFixed(2)
        );
        this.onQuestionFlowFormOpen(nextQuestionFlow);
      }
    }
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
      if (
        this.currentQuestionFlow.questionFlows.length > 0 &&
        this.currentQuestionFlow.showSubQuestionOn === 'true'
      ) {
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
        this.currentQuestionFlow.parentId === 0 &&
        allQuestionFlowsFromSection.find(
          flow =>
            flow.sequenceNumber === this.currentQuestionFlow.sequenceNumber + 1
        )
      ) {
        const nextQuestionFlow =
          this.currentQuestionFlow.parentId === 0 &&
          allQuestionFlowsFromSection.find(
            flow =>
              flow.sequenceNumber ===
              this.currentQuestionFlow.sequenceNumber + 1
          );
        this.onQuestionFlowFormOpen(nextQuestionFlow);
      } else if (
        this.currentQuestionFlow.parentId !== 0 &&
        allQuestionFlowsFromSection.find(
          flow =>
            flow.sequenceNumber ===
              allQuestionFlowsFromSection.find(
                flow2 => flow2.id === this.currentQuestionFlow.parentId
              ).sequenceNumber +
                1 && flow.parentId === 0
        )
      ) {
        const nextQuestionFlow =
          this.currentQuestionFlow.parentId !== 0 &&
          allQuestionFlowsFromSection.find(
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
        this.onQuestionFlowFormOpen(allQuestionFlowsFromSection[0]);
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
