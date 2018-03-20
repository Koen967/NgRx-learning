import * as SectionActions from '../actions/section.actions';
import { ContractDetail, QuestionFlow } from '../../contract-details.model';

export interface SectionState {
  section: { [key: string]: QuestionFlow };
}

export const sectionInitialState: SectionState = {
  section: {}
};

export function sectionReducer(
  state = sectionInitialState,
  action: SectionActions.SectionActionsAll
): SectionState {
  switch (action.type) {
    default:
      return state;
  }
}

export const getSections = (state: SectionState) => state.section;
