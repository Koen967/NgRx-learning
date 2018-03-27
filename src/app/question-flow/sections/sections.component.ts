import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Section, ContractDetail } from '../contract-details.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionsComponent implements OnInit {
  @Input() sections: Section[];

  @Output() questionFlowsOpen = new EventEmitter<Section>();

  constructor() {}

  ngOnInit() {}

  openQuestionFlows(section: Section) {
    this.questionFlowsOpen.emit(section);
  }
}
