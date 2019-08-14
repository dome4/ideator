import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Idea } from '../../models/idea.model';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/idea.reducers';
import { AppState, selectIdeaState } from '../../store/app.states';
import * as _ from 'lodash';
import { GetIdea, CreateIdea } from '../../store/actions/idea.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-idea-card-list',
  templateUrl: './idea-card-list.component.html',
  styleUrls: ['./idea-card-list.component.scss']
})
export class IdeaCardListComponent implements OnInit {

  searchString: string = '';

  subscriptions: Subscription[] = [];

  // idea data
  getState: Observable<any>;
  ideasLoading: boolean;
  ideas: Idea[] = [];
  error: Error | null;

  constructor(private store: Store<AppState>, private router: Router) {
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
  }

  onClick(idea: Idea) {
    // navigate to url
    this.router.navigate(['idea-list', idea.id]);

    // get selected idea from api
    this.store.dispatch(new GetIdea(idea.id));

  }

  onCreateIdea() {
    // create new dummy idea
    const idea: Idea = {
      id: 99, // is ignored by api
      title: 'new idea',
      businessIdea: '',
      usp: '',
      customers: '',
      businessModel: '',
      competitors: '',
      team: '',
      marketBarriers: ''
    };
    this.store.dispatch(new CreateIdea(idea));


    // ToDo: navigate to new created idea
    // this.router.navigate(['idea-list', this.selec]);

  }
}
