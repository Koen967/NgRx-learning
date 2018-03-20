import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromContractDetails from '../reducers/contract-detail.reducer';

export const getContractsState = createSelector(
  fromFeature.getContractDetailsAppState,
  (state: fromFeature.ContractDetailsAppState) => state.contractDetails
);

export const getContractDetails = createSelector(
  getContractsState,
  fromContractDetails.getContractDetails
);

export const getContractDetailsLoaded = createSelector(
  getContractsState,
  fromContractDetails.getLoaded
);

export const getContractDetailsLoading = createSelector(
  getContractsState,
  fromContractDetails.getLoading
);

export const getSectionsFromContractDetails = createSelector(
  getContractDetails,
  contractDetails => {
    return contractDetails.sections;
  }
);
