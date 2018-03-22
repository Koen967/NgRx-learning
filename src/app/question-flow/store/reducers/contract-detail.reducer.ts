import * as ContractDetailsActions from '../actions/contract-details.actions';
import {
  ContractDetail,
  QuestionFlow,
  contractDetailsSchema
} from '../../contract-details.model';
import { normalize } from 'normalizr';

export interface ContractDetailState {
  contractDetails: { [id: number]: ContractDetail };
  sections: string[];
  loaded: boolean;
  loading: boolean;
}

export const contractDetailsInitialState: ContractDetailState = {
  contractDetails: {},
  sections: [],
  loaded: false,
  loading: false
};

export function contractDetailReducer(
  state = contractDetailsInitialState,
  action: ContractDetailsActions.ContractDetailsActionsAll
): ContractDetailState {
  switch (action.type) {
    case ContractDetailsActions.GET_CONTRACT_DETAILS: {
      return {
        ...state,
        loading: true
      };
    }
    case ContractDetailsActions.GET_CONTRACT_DETAILS_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case ContractDetailsActions.GET_CONTRACT_DETAILS_SUCCES: {
      const normalizedData = normalize(
        action.contractDetails,
        contractDetailsSchema
      );
      return {
        ...state,
        contractDetails: normalizedData.entities.contractDetails,
        loaded: true,
        loading: false
      };
    }
    default:
      return state;
  }
}

export const getContractDetails = (state: ContractDetailState) =>
  state.contractDetails;
export const getLoaded = (state: ContractDetailState) => state.loaded;
export const getLoading = (state: ContractDetailState) => state.loading;
