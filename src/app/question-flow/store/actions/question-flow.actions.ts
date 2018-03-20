import { Action } from '@ngrx/store';
import { QuestionFlow } from '../../contract-details.model';

export const GET_QUESTION_FLOW = '[QUESTION_FLOW] GET QUESTION_FLOW';
export const GET_QUESTION_FLOW_SUCCES =
  '[QUESTION_FLOW] GET QUESTION_FLOW SUCCES';
export const GET_QUESTION_FLOW_FAILED =
  '[QUESTION_FLOW] GET QUESTION_FLOW FAILED';

export class GetQuestionFlows implements Action {
  readonly type = GET_QUESTION_FLOW;

  constructor(public questionFlowId: number) {}
}

export class GetQuestionFlowsSucces implements Action {
  readonly type = GET_QUESTION_FLOW_SUCCES;

  constructor(public sections: QuestionFlow[]) {}
}

export class GetQuestionFlowsFailed implements Action {
  readonly type = GET_QUESTION_FLOW_FAILED;

  constructor(public error: any) {}
}

export type QuestionFlowActionsAll =
  | GetQuestionFlows
  | GetQuestionFlowsSucces
  | GetQuestionFlowsFailed;
