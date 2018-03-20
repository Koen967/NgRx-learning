export class ContractDetail {
  id: number;
  customerId: number;
  number: string;
  company: string;
  description: string;
  validFrom: Date;
  validUntil: Date;
  defaultCurrencyId: number;
  totalQuestions: number;
  completedQuestions: number;
  sections: Section[];
  parentSections: ParentSection[];
  revisions: Revision[];
}

export class Section {
  id: number;
  sequence: number;
  name: string;
  subName: string;
  totalQuestions: number;
  completedQuestions: number;
  selected: boolean;
  questionFlows: QuestionFlow[];
}

export class QuestionFlow {
  id: number;
  contractId: number;
  parentId: number;
  subSectionId: number;
  path: string;
  question: string;
  label: string;
  lookupEntity: string;
  endPoint: string;
  type: string;
  answer: string;
  currencyId: number;
  originalAnswer: string;
  contractLineId: number;
  completed: boolean;
  sequenceNumber: number;
  selected: boolean;
  showSubQuestionOn: string;
  companyDefaultAnswer: any;
  companyDefaultCurrency: any;
  dropdownValues: any;
  unitOfMeasurement: string;
  questionFlows: QuestionFlow[];
  exceptions: Exception[];
  useCompanyDefault: boolean;
  reviewedReason: any;
  disabled: boolean;
  purposeDetail: any;
}

export class Exception {
  id: number;
  contractLineId: number;
  questionFlowId: number;
  description: string;
  text: string;
  label: string;
  endPoint: string;
  answer: string;
  type: string;
  currencyId: number;
  dropdownValues: any;
  validFrom: Date;
  childExceptions: Exception[];
  useCompanyDefault: boolean;
  companyDefaultAnswer: string;
  tenderLanes: number[];
}

export class ParentSection {
  id: number;
  name: string;
  subSections: number[];
}

export class Revision {
  id: number;
  sequence: number;
  validFrom: Date;
  validUntill: Date;
  active: boolean;
}
