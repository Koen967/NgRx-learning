import { ContractDetailsEffects } from './contract-details.effects';
import { SectionEffects } from './section.effects';
import { QuestionFlowEffects } from './question-flow.effects';

export const effects: any[] = [
  ContractDetailsEffects,
  SectionEffects,
  QuestionFlowEffects
];

export * from './contract-details.effects';
export * from './section.effects';
export * from './question-flow.effects';
