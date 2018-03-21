import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { QuestionFlowRoutingModule } from './question-flow-routing.module';
import { QuestionFlowComponent } from './question-flow.component';
import { QuestionFlowService } from './question-flow.service';

import { reducers } from './store';
import { effects } from './store/effects';

import { SectionsComponent } from './sections/sections.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ContractDetailStoreModule } from './store/store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    QuestionFlowRoutingModule,
    ContractDetailStoreModule
  ],
  declarations: [
    QuestionFlowComponent,
    SectionsComponent,
    QuestionsComponent,
    QuestionFormComponent
  ],
  providers: [QuestionFlowService]
})
export class QuestionFlowModule {}
