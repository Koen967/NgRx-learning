import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromQuestionFlow from './question-flow.reducer';

export interface QuestionFlowAppState {
  questionFlow: fromQuestionFlow.QuestionFlowState;
}

export const reducers: ActionReducerMap<QuestionFlowAppState> = {
  questionFlow: fromQuestionFlow.questionFlowReducer
};

export const getquestionFlowAppState = createFeatureSelector<
  QuestionFlowAppState
>('questionFlow');
