import * as QuestionFlowActions from '../actions/section.actions';
import { ContractDetail, QuestionFlow } from '../../contract-details.model';

export interface QuestionFlowState {
  questionFlow: { [key: string]: QuestionFlow };
}

export const questionFlowInitialState: QuestionFlowState = {
  questionFlow: {}
};

export function questionFlowReducer(
  state = questionFlowInitialState,
  action: QuestionFlowActions.SectionActionsAll
): QuestionFlowState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getQuestionFlow = (state: QuestionFlowState) => state.questionFlow;
