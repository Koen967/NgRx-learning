import { Action } from '@ngrx/store';
import { QuestionFlow, Section } from '../../contract-details.model';

export const GET_QUESTION_FLOW = '[QUESTION_FLOW] GET QUESTION_FLOW';
export const GET_QUESTION_FLOW_SUCCES =
  '[QUESTION_FLOW] GET QUESTION_FLOW SUCCES';
export const GET_QUESTION_FLOW_FAILED =
  '[QUESTION_FLOW] GET QUESTION_FLOW FAILED';
export const SET_CURRENT_QUESTION_FLOW =
  '[QUESTION_FLOW] SET CURRENT QUESTION_FLOW';
export const SET_ANSWER = '[QUESTION_FLOW] SET ANSWER';

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

export class SetCurrentQuestionFlow implements Action {
  readonly type = SET_CURRENT_QUESTION_FLOW;

  constructor(public questionFlow: QuestionFlow) {}
}

export class SetAnswer implements Action {
  readonly type = SET_ANSWER;

  constructor(
    public answer: any,
    public section: Section,
    public questionFlows: QuestionFlow[]
  ) {}
}

export type QuestionFlowActionsAll =
  | GetQuestionFlows
  | GetQuestionFlowsSucces
  | GetQuestionFlowsFailed
  | SetCurrentQuestionFlow
  | SetAnswer;
