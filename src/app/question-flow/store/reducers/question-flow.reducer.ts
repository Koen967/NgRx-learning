import * as QuestionFlowActions from '../actions/section.actions';
import { ContractDetail, QuestionFlow } from '../../contract-details.model';

export interface QuestionFlowState {
  questionFlow: { [key: string]: QuestionFlow };
  childQuestionFlows: number[];
}

export const questionFlowInitialState: QuestionFlowState = {
  questionFlow: {},
  childQuestionFlows: []
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
export const getChildQuestionFlows = (state: QuestionFlowState) =>
  state.childQuestionFlows;
