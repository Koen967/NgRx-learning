import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRouterState } from '../../../store';
import { ContractDetailsAppState, getContractDetailsLoaded } from '..';
import { getLoaded } from '../reducers/contract-detail.reducer';
import { tap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import * as fromStore from '../../store';

@Injectable()
export class QuestionFlowGuard implements CanActivate {
  routerState: any;

  constructor(private store: Store<ContractDetailsAppState>) {
    this.store.select(getRouterState).subscribe(routerState => {
      if (routerState) {
        this.routerState = routerState.state;
      }
    });
  }

  getContractDetails() {
    return this.store.select(getContractDetailsLoaded).pipe(
      tap((loaded: any) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.GetContractDetails(9292));
        }
      }),
      filter((loaded: any) => {
        return loaded;
      }),
      take(1)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getContractDetails()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}
