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

  openModal: boolean = false;

  selectedIdea: Idea;

  constructor(public ideaService: IdeaService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.ideaService.getIdeas().subscribe(ideas => this.ideas = ideas));
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
