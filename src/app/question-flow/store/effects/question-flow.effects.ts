import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as AllActions from '../actions';
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
  setAnswer$: Observable<AllActions.SectionActionsAll> = this.actions$
    .ofType<AllActions.SetAnswer>(AllActions.SET_ANSWER)
    .pipe(
      switchMap(payload => {
        const totalQuestions = payload.questionFlows.length;
        let completedQuestions = 0;
        // Count all completed questionFlows
        payload.section.questionFlows.forEach(questionFlow => {
          const flow = payload.questionFlows.find(
            qflow => qflow.id === +questionFlow
          );
          if (flow.completed) {
            completedQuestions++;
            if (flow.questionFlows.length > 0) {
              if (flow.showSubQuestionOn === flow.answer) {
                flow.questionFlows.forEach(cFlow => {
                  const childFlow = payload.questionFlows.find(
                    qFlow => qFlow.id === +cFlow
                  );
                  if (childFlow.completed) {
                    completedQuestions++;
                  }
                });
              } else {
                completedQuestions =
                  completedQuestions + flow.questionFlows.length;
              }
            }
          }
        });
        // Process updated questionFlow
        if (!payload.answer.questionFlow.completed) {
          completedQuestions++;
        }
        if (payload.answer.questionFlow.questionFlows.lenght > 0) {
          if (
            payload.answer.questionFlow.showSubQuestionOn ===
              payload.answer.answer &&
            payload.answer.questionFlow.answer !== payload.answer.answer
          ) {
            payload.answer.questionFlow.questionFlows.forEach(cFlow => {
              const childFlow = payload.questionFlows.find(
                qFlow => qFlow.id === cFlow
              );
              if (!childFlow.completed) {
                completedQuestions--;
              }
            });
          } else if (
            payload.answer.questionFlow.showSubQuestionOn !==
              payload.answer.answer &&
            payload.answer.questionFlow.answer !== payload.answer.answer
          ) {
            payload.answer.questionFlow.questionFlows.forEach(cFlow => {
              const childFlow = payload.questionFlows.find(
                qFlow => qFlow.id === cFlow
              );
              if (!childFlow.completed) {
                completedQuestions++;
              }
            });
          }
        }
        return of(
          new AllActions.UpdateCompletedQuestions(
            payload.section,
            completedQuestions,
            totalQuestions
          )
        );
      })
    );
}
