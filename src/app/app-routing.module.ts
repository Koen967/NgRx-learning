import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'contractDetails/:id',
    loadChildren: './question-flow/question-flow.module#QuestionFlowModule'
  },
  {
    path: '**',
    redirectTo: '/contractDetails/9292'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
