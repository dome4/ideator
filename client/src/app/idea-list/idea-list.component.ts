import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../store/app.states';
import { State } from '../store/reducers/idea.reducers';
import { GetIdeas, GetIdea, CreateIdea } from '../store/actions/idea.actions';
import { ClrLoadingState } from '@clr/angular';

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
  error: Error | null;

  // variable for button animation
  createIdeaBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectIdeaState);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.getState.subscribe((state: State) => {
        this.ideasLoading = state.loading;
        this.ideas = state.ideas;
        this.error = state.error;
      })
    );

    // dispatch idea data
    this.store.dispatch(new GetIdeas());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openIdeaModal(idea: Idea) {

    // open modal in SevenWsComponent
    this.openModal = true;

    // set selected idea
    this.selectedIdea = idea;

    // ToDo: modal needs id of the selected id, not the whole id -> alternative to routing params

    this.store.dispatch(new GetIdea(this.selectedIdea.id));
  }

  modalClosed(event) {

    // close modal
    this.openModal = false;
  }

  createIdea() {
    this.createIdeaBtnState = ClrLoadingState.LOADING;

    // create new dummy idea
    const idea: Idea = {
      id: 99, // is ignored by api
      title: 'new idea successfully created',
      businessIdea: '',
      usp: '',
      customers: '',
      businessModel: '',
      competitors: '',
      team: '',
      marketBarriers: ''
    };
    this.store.dispatch(new CreateIdea(idea));

    // open modal
    this.openModal = true;

    // ToDo -> show success on creation completed
    setTimeout(() => {
      this.createIdeaBtnState = ClrLoadingState.SUCCESS;

      setTimeout(() => {
        this.createIdeaBtnState = ClrLoadingState.DEFAULT;
      }, 500)
    }, 1000)



  }
}
