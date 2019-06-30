import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { Store } from '@ngrx/store';
import { AppState, selectIdeaState } from '../store/app.states';
import { State } from '../store/reducers/idea.reducers';
import { GetIdeas, GetIdea, CreateIdea, DeleteIdea } from '../store/actions/idea.actions';
import { ClrLoadingState } from '@clr/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  openModal: boolean = false;

  // selected items of datagrid
  selectedItems: Idea[] = [];

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
        this.ideas = _.cloneDeep(state.ideas);
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

    // get selected idea from api
    this.store.dispatch(new GetIdea(idea.id));
  }

  modalClosed(event) {

    // close modal
    this.openModal = false;
  }

  onCreateIdea() {
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

  onDeleteIdeas() {
    // method is only executable if more than one idea is selected
    const selectIdeas = _.cloneDeep(this.selectedItems);

    if (confirm('Are you sure that you want to delete the selected ideas?')) {

      // delete all selected ideas
      selectIdeas.forEach(idea => {
        this.store.dispatch(new DeleteIdea(idea.id));
      });
    }
  }

  onEditIdea() {
    // method is only executable if exactly one idea is selected
    const selectIdea = _.cloneDeep(this.selectedItems[0]);

    if (selectIdea) {
      // open idea modal
      this.openIdeaModal(selectIdea);
    }
  }
}
