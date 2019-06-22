import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../store/app.states';
import { State } from '../store/reducers/idea.reducers';
import { FetchIdeasBegin } from '../store/actions/idea.actions';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  openModal: boolean = false;

  selectedIdea: Idea;

  // idea data
  getState: Observable<any>;
  ideasLoading: boolean;
  ideas: Idea[] = [];
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectIdeaState);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.getState.subscribe((state: State) => {
        this.ideasLoading = state.loading;
        this.ideas = state.ideas;
        this.errorMessage = state.errorMessage;
      })
    );

    // dispatch idea data
    this.store.dispatch(new FetchIdeasBegin());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openIdeaModal(idea: Idea) {

    // open modal in SevenWsComponent
    this.openModal = true;

    // set selected idea
    this.selectedIdea = idea;
  }

  modalClosed(event) {

    // close modal
    this.openModal = false;
  }
}
