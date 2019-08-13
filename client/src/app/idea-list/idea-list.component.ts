import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../store/app.states';
import { State } from '../store/reducers/idea.reducers';
import * as _ from 'lodash';
import { GetIdeas } from '../store/actions/idea.actions';


@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnDestroy {

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

        // debug
        console.log(this.selectedIdea)
      })
    );

    // ToDo dispatch get ideas only in this component, delte dispatch from the others
    // dispatch idea data
    this.store.dispatch(new GetIdeas());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
