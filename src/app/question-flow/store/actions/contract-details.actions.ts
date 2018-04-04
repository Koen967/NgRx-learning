import { Action } from '@ngrx/store';
import { ContractDetail } from '../../contract-details.model';

export const GET_CONTRACT_DETAILS = '[CONTRACT_DETAILS] GET CONTRACT DETAILS';
export const GET_CONTRACT_DETAILS_SUCCES =
  '[CONTRACT_DETAILS] GET CONTRACT DETAILS SUCCES';
export const GET_CONTRACT_DETAILS_FAILED =
  '[CONTRACT_DETAILS] GET CONTRACT DETAILS FAILED';
export const UPDATE_QUESTION_FLOW = '[QUESTION_FLOW] UPDATE QUESTION FLOW';

export class GetContractDetails implements Action {
  readonly type = GET_CONTRACT_DETAILS;

  constructor(public contractId: number) {}
}

export class GetContractDetailsSucces implements Action {
  readonly type = GET_CONTRACT_DETAILS_SUCCES;

  constructor(public contractDetails: ContractDetail) {}
}

export class GetContractDetailsFailed implements Action {
  readonly type = GET_CONTRACT_DETAILS_FAILED;

  constructor(public error: any) {}
}

export class UpdateQuestionFlow implements Action {
  readonly type = UPDATE_QUESTION_FLOW;

  constructor(public questionFlow: any) {}
}

export type ContractDetailsActionsAll =
  | GetContractDetails
  | GetContractDetailsSucces
  | GetContractDetailsFailed
  | UpdateQuestionFlow;
