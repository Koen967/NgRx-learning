import { Action } from '@ngrx/store';
import { QuestionFlow } from '../../contract-details.model';

export const GET_SECTION = '[SECTION] GET SECTION';
export const GET_SECTION_SUCCES = '[SECTION] GET SECTION SUCCES';
export const GET_SECTION_FAILED = '[SECTION] GET SECTION FAILED';

export class GetSections implements Action {
  readonly type = GET_SECTION;

  constructor(public contractId: number) {}
}

export class GetSectionsSucces implements Action {
  readonly type = GET_SECTION_SUCCES;

  constructor(public sections: QuestionFlow[]) {}
}

export class GetSectionsFailed implements Action {
  readonly type = GET_SECTION_FAILED;

  constructor(public error: any) {}
}

export type SectionActionsAll =
  | GetSections
  | GetSectionsSucces
  | GetSectionsFailed;
