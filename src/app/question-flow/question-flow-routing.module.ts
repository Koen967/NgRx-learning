import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionFlowComponent } from './question-flow.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuestionFlowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionFlowRoutingModule {}
