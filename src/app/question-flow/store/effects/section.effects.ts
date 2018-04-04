import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as StateActions from '../actions';
import * as fromServices from '../../question-flow.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SectionEffects {
  constructor(
    private actions$: Actions,
    private questionFlowService: fromServices.QuestionFlowService
  ) {}

  /* @Effect()
  setAnswer$: Observable<StateActions.SectionActionsAll> = this.actions$
    .ofType<StateActions.UpdateCompletedQuestions>(
      StateActions.UPDATE_COMPLETED_QUESTIONS
    )
    .pipe(
      switchMap(payload => {
        return of(new StateActions.SetCurrentSection(payload.section));
      })
    ); */
}
