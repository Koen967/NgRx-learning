import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as ContractDetailsActions from '../actions';
import * as fromServices from '../../question-flow.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContractDetailsEffects {
  constructor(
    private actions$: Actions,
    private questionFlowService: fromServices.QuestionFlowService
  ) {}

  @Effect()
  contractDetails$: Observable<
    ContractDetailsActions.ContractDetailsActionsAll
  > = this.actions$
    .ofType<ContractDetailsActions.GetContractDetails>(
      ContractDetailsActions.GET_CONTRACT_DETAILS
    )
    .pipe(
      switchMap(() => {
        return this.questionFlowService
          .getContractDetailsFromId(9292)
          .pipe(
            map(
              contractDetails =>
                new ContractDetailsActions.GetContractDetailsSucces(
                  contractDetails
                )
            ),
            catchError(error =>
              of(new ContractDetailsActions.GetContractDetailsFailed(error))
            )
          );
      })
    );
}
