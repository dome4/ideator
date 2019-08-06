import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers/idea.reducers';
import { AppState, selectIdeaState } from '../store/app.states';
import { GetIdeas } from '../store/actions/idea.actions';
import * as _ from 'lodash';


@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {

  searchString: string = '';

  subscriptions: Subscription[] = [];

  // selected items of datagrid
  selectedItems: Idea[] = [];

  // idea data
  getState: Observable<any>;
  ideasLoading: boolean;
  ideas: Idea[] = [];
  error: Error | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectIdeaState);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.getState.subscribe((state: State) => {
        this.ideasLoading = state.loading;
        this.ideas = _.cloneDeep(state.ideas);
        this.error = state.error;
      })
    );

    // dispatch idea data
    this.store.dispatch(new GetIdeas());
  }
}
