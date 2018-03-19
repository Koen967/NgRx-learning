import * as QuestionFlowActions from '../actions/question-flow.actions';
import { ContractDetail } from '../../contract-details.model';

export interface QuestionFlowState {
  contractDetails: ContractDetail[];
  loaded: boolean;
  loading: boolean;
}

export const questionFlowInitialState: QuestionFlowState = {
  contractDetails: [],
  loaded: false,
  loading: false
};

export function questionFlowReducer(
  state = questionFlowInitialState,
  action: QuestionFlowActions.QuestionFlowActionsAll
): QuestionFlowState {
  switch (action.type) {
    case QuestionFlowActions.GET_CONTRACT_DETAILS: {
      return {
        ...state,
        loading: true
      };
    }
    case QuestionFlowActions.GET_CONTRACT_DETAILS_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case QuestionFlowActions.GET_CONTRACT_DETAILS_SUCCES: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export const getContractDetails = (state: QuestionFlowState) =>
  state.contractDetails;
export const getLoaded = (state: QuestionFlowState) => state.loaded;
export const getLoading = (state: QuestionFlowState) => state.loading;
