import { Action } from '@ngrx/store';
import { ContractDetail } from '../../contract-details.model';

export const GET_CONTRACT_DETAILS = '[CONTRACT_DETAILS] GET CONTRACT DETAILS';
export const GET_CONTRACT_DETAILS_SUCCES =
  '[CONTRACT_DETAILS] GET CONTRACT DETAILS SUCCES';
export const GET_CONTRACT_DETAILS_FAILED =
  '[CONTRACT_DETAILS] GET CONTRACT DETAILS FAILED';
export const GET_CONTRACT_DETAIL = '[CONTRACT_DETAIL] GET CONTRACT DETAIL';
export const GET_CONTRACT_DETAIL_SUCCES =
  '[CONTRACT DETAIL] GET CONTRACT DETAIL SUCCES';
export const GET_CONTRACT_DETAIL_FAILED =
  '[CONTRACT DETAIL] GET CONTRACT DETAIL FAILED';

export class GetContractDetails implements Action {
  readonly type = GET_CONTRACT_DETAILS;
}

export class GetContractDetailsSucces implements Action {
  readonly type = GET_CONTRACT_DETAILS_SUCCES;

  constructor(public contractDetails: ContractDetail[]) {}
}

export class GetContractDetailsFailed implements Action {
  readonly type = GET_CONTRACT_DETAILS_FAILED;

  constructor(public error: any) {}
}

export class GetContractDetail implements Action {
  readonly type = GET_CONTRACT_DETAILS;
}

export class GetContractDetailSucces implements Action {
  readonly type = GET_CONTRACT_DETAILS_SUCCES;

  constructor(public contractDetail: ContractDetail) {}
}

export class GetContractDetailFailed implements Action {
  readonly type = GET_CONTRACT_DETAILS_FAILED;

  constructor(public error: any) {}
}

export type QuestionFlowActionsAll =
  | GetContractDetails
  | GetContractDetailsSucces
  | GetContractDetailsFailed
  | GetContractDetail
  | GetContractDetailSucces
  | GetContractDetailFailed;
