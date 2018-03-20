import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ContractDetail } from './contract-details.model';
import { ContractDetailState } from './store/reducers/contract-detail.reducer';

import { Observable } from 'rxjs/Observable';
import { error } from 'util';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QuestionFlowService {
  url = 'http://accountmanagement.tf2.inforit.local/api/contracts/ng2';

  constructor(private http: HttpClient) {}

  getContractDetailsFromId(id: number): Observable<ContractDetail> {
    return this.http.get<ContractDetail>(this.url + '/contract-details/' + id);
  }
}
