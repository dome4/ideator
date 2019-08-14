import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Idea } from '../../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../../store/app.states';
import { State } from '../../store/reducers/idea.reducers';
import * as _ from 'lodash';
import { UpdateIdea, DeleteIdea } from '../../store/actions/idea.actions';


@Component({
  selector: 'app-idea-edit',
  templateUrl: './idea-edit.component.html',
  styleUrls: ['./idea-edit.component.scss']
})
export class IdeaEditComponent implements OnInit, OnDestroy {

  // idea data
  getState: Observable<any>;
  ideasLoading: boolean;
  selectedIdea: Idea;

  // subscriptions
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectIdeaState);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.getState.subscribe((state: State) => {
        this.selectedIdea = _.cloneDeep(state.selectedIdea);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /*
  * save edited idea from modal
  */
  saveIdea() {

    // update idea
    this.store.dispatch(new UpdateIdea(this.selectedIdea));
  }

  /*
  * simply closes the modal and does not save the edited idea
  */
  cancelIdeaEditing() {
    // because a copy of the object is made with clonedeep in the subscription,
    // nothing else is necessary here

    // ToDo: reload old object
  }

  /*
   * delete currently edited idea
   */
  onDeleteIdea() {

    if (confirm('Are you sure that you want to delete the selected idea?')) {

      // delete selected idea
      this.store.dispatch(new DeleteIdea(_.cloneDeep(this.selectedIdea).id));
    }
  }

}
