import { Action } from '@ngrx/store';
import { QuestionFlow, Section } from '../../contract-details.model';

export const GET_SECTION = '[SECTION] GET SECTION';
export const GET_SECTION_SUCCES = '[SECTION] GET SECTION SUCCES';
export const GET_SECTION_FAILED = '[SECTION] GET SECTION FAILED';
export const SET_CURRENT_SECTION = '[SECTION] SET CURRENT SECTION';

export class GetSections implements Action {
  readonly type = GET_SECTION;

  constructor(public contractId: number) {}
}

export class GetSectionsSucces implements Action {
  readonly type = GET_SECTION_SUCCES;

  constructor(public sections: Section[]) {}
}

export class GetSectionsFailed implements Action {
  readonly type = GET_SECTION_FAILED;

  constructor(public error: any) {}
}

export class SetCurrentSection implements Action {
  readonly type = SET_CURRENT_SECTION;

  constructor(public section: Section) {}
}

export type SectionActionsAll =
  | GetSections
  | GetSectionsSucces
  | GetSectionsFailed
  | SetCurrentSection;
