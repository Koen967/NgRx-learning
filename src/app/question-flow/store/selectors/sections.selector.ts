import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSections from '../reducers/section.reducer';

import * as fromContractDetails from './contract-details.selector';
import { normalize } from 'normalizr';
import { contractDetailsSchema, Section } from '../../contract-details.model';

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
    contractDetails.sections.forEach((sectionId: number) => {
      arr.push(sections[sectionId]);
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
