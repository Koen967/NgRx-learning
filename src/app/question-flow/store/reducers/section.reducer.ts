import * as SectionActions from '../actions/section.actions';
import * as ContractDetailsActions from '../actions/contract-details.actions';
import { Section, contractDetailsSchema } from '../../contract-details.model';
import { normalize } from 'normalizr';

export interface SectionState {
  sections: { [key: number]: Section };
  currentSection: Section;
  questionFlows: number[];
}

export const sectionInitialState: SectionState = {
  sections: {},
  currentSection: null,
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
    case SectionActions.SET_CURRENT_SECTION: {
      return {
        ...state,
        currentSection: action.section
      };
    }
    case SectionActions.UPDATE_COMPLETED_QUESTIONS: {
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.section.id]: {
            ...state.sections[action.section.id],
            totalQuestions: action.total,
            completedQuestions: action.completed
          }
        },
        currentSection: {
          ...action.section,
          totalQuestions: action.total,
          completedQuestions: action.completed
        }
      };
    }
    default:
      return state;
  }
}

export const getSections = (state: SectionState) => state.sections;
export const getCurrentSection = (state: SectionState) => state.currentSection;
export const getQuestionFlows = (state: SectionState) => state.questionFlows;
