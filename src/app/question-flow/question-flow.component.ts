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
  sectionQuestionFlows$: Observable<QuestionFlow[]>;
  parentFlows$: Observable<QuestionFlow[]>;
  currentSection$: Observable<Section>;
  currentQuestionFlow$: Observable<QuestionFlow>;

  currentSection: Section;
  currentQuestionFlow: QuestionFlow;

  constructor(private store: Store<fromStore.ContractDetailsAppState>) {}

  ngOnInit() {
    this.sections$ = this.store.select(
      fromStore.getSectionsFromCurrentContractDetails
    );

    this.questionFlows$ = this.store.select(fromStore.getQuestionFlowsArray);

    this.currentSection$ = this.store.select(fromStore.getCurrentSection);

    this.currentSection$.subscribe(section => {
      this.currentSection = section;
    });

    this.currentQuestionFlow$ = this.store.select(
      fromStore.getCurrentQuestionFlow
    );

    this.currentQuestionFlow$.subscribe(questionFlow => {
      this.currentQuestionFlow = questionFlow;
    });

    this.setInitialSelection();
  }

  onQuestionFlowOpen(section: Section) {
    this.store.dispatch(new fromStore.SetCurrentSection(section));
    this.sectionQuestionFlows$ = this.store.select(
      fromStore.getQuestionFlowsFromSection
    );
    this.parentFlows$ = this.store.select(fromStore.getParentFlowsFromSection);
  }

  onQuestionFlowFormOpen(questionFlow: QuestionFlow) {
    this.store.dispatch(new fromStore.SetCurrentQuestionFlow(questionFlow));
  }

  onSetQuestionFlowAnswer(answer: any) {
    let allQuestionFlowsFromSection: QuestionFlow[];
    this.sectionQuestionFlows$.subscribe(questionFlows => {
      allQuestionFlowsFromSection = questionFlows;
    });
    this.store.dispatch(
      new fromStore.SetAnswer(
        answer,
        this.currentSection,
        allQuestionFlowsFromSection
      )
    );
  }

  previousQuestion(event) {
    let allSectionsFromContractDetails: Section[];
    let allQuestionFlowsFromSection: QuestionFlow[];
    this.sections$.subscribe(sections => {
      allSectionsFromContractDetails = sections;
    });
    this.sectionQuestionFlows$.subscribe(questionFlows => {
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
          ).showSubQuestionOn ===
            allQuestionFlowsFromSection.find(
              flow => +flow.path === +this.currentQuestionFlow.path - 1
            ).answer
        ) {
          let highestPath = 0;
          allQuestionFlowsFromSection
            .find(flow => +flow.path === +this.currentQuestionFlow.path - 1)
            .questionFlows.forEach(questionFlow => {
              if (
                +allQuestionFlowsFromSection.find(
                  flow => flow.id === +questionFlow
                ).path > highestPath
              ) {
                highestPath = +allQuestionFlowsFromSection.find(
                  flow => flow.id === +questionFlow
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

        let nextQuestionFlow =
          allQuestionFlowsFromSection[allQuestionFlowsFromSection.length - 1];
        if (nextQuestionFlow.parentId !== 0) {
          const parentFlow = allQuestionFlowsFromSection.find(
            flow => flow.id === nextQuestionFlow.parentId
          );
          if (parentFlow.showSubQuestionOn === parentFlow.answer) {
            allQuestionFlowsFromSection.forEach(questionFlow => {
              if (+questionFlow.path > +nextQuestionFlow.path) {
                nextQuestionFlow = questionFlow;
              }
            });
          } else {
            nextQuestionFlow = parentFlow;
          }
        }
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

  nextQuestion(event) {
    let allSectionsFromContractDetails: Section[];
    let allQuestionFlowsFromSection: QuestionFlow[];
    this.sections$.subscribe(sections => {
      allSectionsFromContractDetails = sections;
    });
    this.sectionQuestionFlows$.subscribe(questionFlows => {
      allQuestionFlowsFromSection = questionFlows;
    });

    // Set current to first child
    if (
      this.currentQuestionFlow.questionFlows.length > 0 &&
      this.currentQuestionFlow.showSubQuestionOn ===
        this.currentQuestionFlow.answer
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
        flow => +flow.path === +this.currentQuestionFlow.path + 1
      )
    ) {
      const nextQuestionFlow =
        this.currentQuestionFlow.parentId === 0 &&
        allQuestionFlowsFromSection.find(
          flow => +flow.path === +this.currentQuestionFlow.path + 1
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
    } else if (
      allSectionsFromContractDetails.find(
        section => section.sequence === this.currentSection.sequence + 1
      )
    ) {
      const nextSection = allSectionsFromContractDetails.find(
        section => section.sequence === this.currentSection.sequence + 1
      );
      this.onQuestionFlowOpen(nextSection);
      this.onQuestionFlowFormOpen(allQuestionFlowsFromSection[0]);
    }
  }

  setInitialSelection() {
    if (!this.currentSection) {
      let section: Section;
      this.sections$.subscribe(sections => {
        section = sections[0];
      });
      this.onQuestionFlowOpen(section);
    } else {
      this.onQuestionFlowOpen(this.currentSection);
    }
    if (!this.currentQuestionFlow) {
      let questionFlow: QuestionFlow;
      this.sectionQuestionFlows$.subscribe(questionFlows => {
        questionFlow = questionFlows[0];
      });
      this.onQuestionFlowFormOpen(questionFlow);
    } else {
      this.onQuestionFlowFormOpen(this.currentQuestionFlow);
    }
  }
}
