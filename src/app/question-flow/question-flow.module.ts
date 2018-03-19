import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { QuestionFlowRoutingModule } from './question-flow-routing.module';

import { QuestionFlowComponent } from './question-flow.component';

import { reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    QuestionFlowRoutingModule,
    StoreModule.forFeature('questionFlow', reducers)
  ],
  declarations: [QuestionFlowComponent]
})
export class QuestionFlowModule {}
