import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../shared/models/idea.model';

@Component({
  selector: 'app-idea-seven-ws',
  templateUrl: './idea-seven-ws.component.html',
  styleUrls: ['./idea-seven-ws.component.scss']
})
export class IdeaSevenWsComponent implements OnInit {

  @Input() modalOpen: boolean;
  @Input() idea: Idea;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeModal() {

    // Issue: two events are emitted when closing modal
    // (see https://github.com/vmware/clarity/issues/3149)

    // close modal in this component
    this.modalOpen = false;

    // emit modal closed event
    this.modalClosed.emit(true);
  }
}
