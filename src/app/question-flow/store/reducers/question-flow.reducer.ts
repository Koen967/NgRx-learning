import * as QuestionFlowActions from '../actions/question-flow.actions';
import * as ContractDetailActions from '../actions/contract-details.actions';
import {
  ContractDetail,
  QuestionFlow,
  contractDetailsSchema
} from '../../contract-details.model';
import { normalize } from 'normalizr';

export interface QuestionFlowState {
  questionFlows: { [key: number]: QuestionFlow };
  currentQuestionFlow: QuestionFlow;
  childQuestionFlows: number[];
}

export const questionFlowInitialState: QuestionFlowState = {
  questionFlows: {},
  currentQuestionFlow: null,
  childQuestionFlows: []
};

export function questionFlowReducer(
  state = questionFlowInitialState,
  action:
    | QuestionFlowActions.QuestionFlowActionsAll
    | ContractDetailActions.ContractDetailsActionsAll
): QuestionFlowState {
  switch (action.type) {
    case ContractDetailActions.GET_CONTRACT_DETAILS_SUCCES: {
      const normalizedData = normalize(
        action.contractDetails,
        contractDetailsSchema
      );
      return {
        ...state,
        questionFlows: normalizedData.entities.questionFlows
      };
    }
    case QuestionFlowActions.SET_CURRENT_QUESTION_FLOW: {
      return {
        ...state,
        currentQuestionFlow: action.questionFlow
      };
    }
    case QuestionFlowActions.SET_ANSWER: {
      return {
        ...state,
        questionFlows: {
          ...state.questionFlows,
          [action.answer.questionFlow.id]: {
            ...state.questionFlows[action.answer.questionFlow.id],
            answer: action.answer.answer,
            completed: true
          }
        },
        currentQuestionFlow: {
          ...state.currentQuestionFlow,
          answer: action.answer.answer,
          completed: true
        }
      };
    }
    default:
      return state;
  }
}

export const getQuestionFlows = (state: QuestionFlowState) =>
  state.questionFlows;
export const getCurrentQuestionFlow = (state: QuestionFlowState) =>
  state.currentQuestionFlow;
export const getChildQuestionFlows = (state: QuestionFlowState) =>
  state.childQuestionFlows;
