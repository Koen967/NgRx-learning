import { Action } from '@ngrx/store';

export const GET_SECTIONS = '[SECTION] GET SECTIONS';

export class GetSections implements Action {
  readonly type = GET_SECTIONS;
}

export type QuestionFlowActionsAll = GetSections;
