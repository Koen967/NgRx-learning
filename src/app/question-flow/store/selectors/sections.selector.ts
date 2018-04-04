import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSections from '../reducers/section.reducer';

import * as fromContractDetails from './contract-details.selector';
import { denormalize, schema } from 'normalizr';
import {
  sectionsSchema,
  Section,
  contractDetailsSchema
} from '../../contract-details.model';
import { getQuestionFlows } from '../reducers/question-flow.reducer';

export const getSectionsState = createSelector(
  fromFeature.getContractDetailsAppState,
  (state: fromFeature.ContractDetailsAppState) => state.section
);

export const getSections = createSelector(
  getSectionsState,
  fromSections.getSections
);

export const getSectionsFromCurrentContractDetails = createSelector(
  fromContractDetails.getCurrentContractDetails,
  getSections,
  (contractDetails, sections) => {
    const arr: Section[] = [];
    contractDetails.sections.forEach(section => {
      arr.push(sections[section.toString()]);
    });
    return arr;
  }
);

export const getSectionsArray = createSelector(getSections, sections => {
  return Object.keys(sections).map(id => sections[id]);
});

export const getCurrentSection = createSelector(
  getSectionsState,
  fromSections.getCurrentSection
);
