import { Component, OnInit, Input } from '@angular/core';
import { Section, QuestionFlow } from '../contract-details.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() section: Section;

  questionFlows: QuestionFlow[];

  constructor() {}

  ngOnInit() {
    if (this.section) {
      this.questionFlows = this.section.questionFlows;
    }
  }
}
