import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as QuestionFlowActions from '../actions';
import * as fromServices from '../../question-flow.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionFlowEffects {
  constructor(
    private actions$: Actions,
    private questionFlowService: fromServices.QuestionFlowService
  ) {}

  @Effect()
  setAnswer$: Observable<
    QuestionFlowActions.SectionActionsAll
  > = this.actions$
    .ofType<QuestionFlowActions.SetAnswer>(QuestionFlowActions.SET_ANSWER)
    .pipe(
      switchMap(payload => {
        if (!payload.answer.questionFlow.completed) {
          return of(
            new QuestionFlowActions.UpdateCompletedQuestions(payload.section)
          );
        }
      })
    );
}
