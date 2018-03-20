import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Section, ContractDetail } from '../contract-details.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  @Input() contractDetails: ContractDetail;

  @Output() questionFlowsOpen = new EventEmitter<Section>();

  sections: Section[];

  constructor() {}

  ngOnInit() {
    this.sections = this.contractDetails.sections;
  }

  openQuestionFlows(section: Section) {
    this.questionFlowsOpen.emit(section);
    console.log(section);
  }
}
