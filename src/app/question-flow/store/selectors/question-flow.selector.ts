import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromQuestionFlows from '../reducers/question-flow.reducer';

import * as fromSections from './sections.selector';
import { Section, QuestionFlow } from '../../contract-details.model';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export const getQuestionFlowsState = createSelector(
  fromFeature.getContractDetailsAppState,
  (state: fromFeature.ContractDetailsAppState) => state.questionFlow
);

export const getQuestionFlows = createSelector(
  getQuestionFlowsState,
  fromQuestionFlows.getQuestionFlows
);

export const getCurrentQuestionFlow = createSelector(
  getQuestionFlowsState,
  fromQuestionFlows.getCurrentQuestionFlow
);

export const getQuestionFlowsFromQuestionFlow = createSelector(
  getCurrentQuestionFlow,
  getQuestionFlows,
  (questionFlow, questionFlows) => {
    const arr: QuestionFlow[] = [];
    questionFlow.questionFlows.forEach((questionFlowId: number) => {
      arr.push(questionFlows[questionFlowId]);
    });
    return arr;
  }
);

export const getQuestionFlowsFromSection = createSelector(
  fromSections.getCurrentSection,
  getQuestionFlows,
  (section, questionFlows) => {
    const arr: QuestionFlow[] = [];
    section.questionFlows.forEach((questionFlowId: number) => {
      arr.push(questionFlows[questionFlowId]);
    });
    arr.forEach(questionFlow => {
      questionFlow.questionFlows.forEach(child => {
        arr.push(questionFlows[child]);
      });
    });
    return arr;
  }
);

export const getParentFlowsFromSection = createSelector(
  fromSections.getCurrentSection,
  getQuestionFlows,
  (section, questionFlows) => {
    const arr: QuestionFlow[] = [];
    section.questionFlows.forEach((questionFlowId: number) => {
      arr.push(questionFlows[questionFlowId]);
    });
    return arr;
  }
);
