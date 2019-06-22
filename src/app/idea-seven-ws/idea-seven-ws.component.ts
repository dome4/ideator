import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../store/app.states';
import { State } from '../store/reducers/idea.reducers';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-idea-seven-ws',
  templateUrl: './idea-seven-ws.component.html',
  styleUrls: ['./idea-seven-ws.component.scss']
})
export class IdeaSevenWsComponent implements OnInit, OnDestroy {

  @Input() modalOpen: boolean;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  // idea data
  getState: Observable<any>;
  ideasLoading: boolean;
  idea: Idea;

  // subscriptions
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectIdeaState);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.getState.subscribe((state: State) => {
        this.idea = _.cloneDeep(state.selectedIdea);
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  closeModal() {

    // Issue: two events are emitted when closing modal
    // (see https://github.com/vmware/clarity/issues/3149)

    // close modal in this component
    this.modalOpen = false;

    // emit modal closed event
    this.modalClosed.emit(true);
  }

  /*
  * save edited idea from modal
  */
  saveIdea() {

    // ToDo: ideaService.save(this.user)
    this.closeModal();
  }

  /*
  * simly closes the modal and does not save the edited idea
  */
  cancelIdeaEditing() {

    // ToDo: doesn't work yet due to the reference of the user in the modal and the database
    this.closeModal();
  }
}
