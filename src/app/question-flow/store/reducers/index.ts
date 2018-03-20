import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromContractDetails from './contract-detail.reducer';
import * as fromSection from './section.reducer';
import * as fromQuestionFlow from './question-flow.reducer';

export interface ContractDetailsAppState {
  contractDetails: fromContractDetails.ContractDetailState;
  section: fromSection.SectionState;
  questionFlow: fromQuestionFlow.QuestionFlowState;
}

export const reducers: ActionReducerMap<ContractDetailsAppState> = {
  contractDetails: fromContractDetails.contractDetailReducer,
  section: fromSection.sectionReducer,
  questionFlow: fromQuestionFlow.questionFlowReducer
};

export const getContractDetailsAppState = createFeatureSelector<
  ContractDetailsAppState
>('contract-detail');
