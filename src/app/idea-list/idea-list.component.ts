import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdeaService } from '../shared/services/idea.service';
import { Idea } from '../shared/models/idea.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnDestroy {

  ideas: Idea[] = [];

  subscriptions: Subscription[] = [];

  constructor(public ideaService: IdeaService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.ideaService.getIdeas().subscribe(ideas => this.ideas = ideas));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
