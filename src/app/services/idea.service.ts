import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { delay } from 'rxjs/operators';

@Injectable()
export class IdeaService {

  // api url
  private API_URL = environment.ideaApiUrl;

  constructor(private http: HttpClient) { }

  getIdeas(): Observable<Idea[]> {

    // simulate api call
    return this.http.get<Idea[]>('assets/ideas.json')
      .pipe(
        delay(2000)
      )
  }

  updateIdea(idea: Idea) {
    // return this.http.post<Idea>(`${this.API_URL}/idea/${idea.id}`, idea);
  }

  createIdea(idea: Idea) {
    // return this.http.post<Idea>(`${this.API_URL}/idea/${idea.id}`, idea);
  }

  deleteIdea(idea: Idea) {
    // return this.http.delete<Idea>(`${this.API_URL}/idea/${idea.id}`);
  }
}
