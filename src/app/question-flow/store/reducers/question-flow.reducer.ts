import * as QuestionFlowActions from '../actions/question-flow.actions';

export interface QuestionFlowState {
  loaded: boolean;
  loading: boolean;
}

export const questionFlowInitialState: QuestionFlowState = {
  loaded: false,
  loading: false
};

export function questionFlowReducer(
  state = questionFlowInitialState,
  action: QuestionFlowActions.QuestionFlowActionsAll
): QuestionFlowState {
  switch (action.type) {
    default:
      return state;
  }
}
