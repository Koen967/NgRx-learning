import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
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

export const getCurrentContractDetails = createSelector(
  getContractDetails,
  fromRoot.getRouterState,
  (contractDetails, router) => {
    return contractDetails[router.state.params.id];
  }
);

export const getContractDetailsArray = createSelector(
  getContractDetails,
  contractDetails => {
    return Object.keys(contractDetails).map(id => contractDetails[id]);
  }
);

export const getContractDetailsLoaded = createSelector(
  getContractsState,
  fromContractDetails.getLoaded
);

export const getContractDetailsLoading = createSelector(
  getContractsState,
  fromContractDetails.getLoading
);
