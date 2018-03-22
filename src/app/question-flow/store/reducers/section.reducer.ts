import * as SectionActions from '../actions/section.actions';
import * as ContractDetailsActions from '../actions/contract-details.actions';
import { Section, contractDetailsSchema } from '../../contract-details.model';
import { normalize } from 'normalizr';

export interface SectionState {
  sections: { [key: string]: Section };
  questionFlows: string[];
}

export const sectionInitialState: SectionState = {
  sections: {},
  questionFlows: []
};

export function sectionReducer(
  state = sectionInitialState,
  action:
    | SectionActions.SectionActionsAll
    | ContractDetailsActions.ContractDetailsActionsAll
): SectionState {
  switch (action.type) {
    case ContractDetailsActions.GET_CONTRACT_DETAILS_SUCCES: {
      const normalizedData = normalize(
        action.contractDetails,
        contractDetailsSchema
      );
      return {
        ...state,
        sections: normalizedData.entities.sections
      };
    }
    default:
      return state;
  }
}

export const getSections = (state: SectionState) => state.sections;
export const getQuestionFlows = (state: SectionState) => state.questionFlows;
