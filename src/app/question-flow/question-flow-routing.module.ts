import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromGuard from './store/guards';

import { QuestionFlowComponent } from './question-flow.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuestionFlowComponent,
    canActivate: [fromGuard.QuestionFlowGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [fromGuard.QuestionFlowGuard]
})
export class QuestionFlowRoutingModule {}
