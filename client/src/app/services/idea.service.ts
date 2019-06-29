import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Idea } from '../models/idea.model';
import { delay } from 'rxjs/operators';

@Injectable()
export class IdeaService {

  // api url
  private BASE_URL = environment.apiUrl + 'api';

  constructor(private http: HttpClient) { }

  getIdeas(): Observable<Idea[]> {

    // simulate api call delay
    return this.http.get<Idea[]>(`${this.BASE_URL}/ideas`)
      .pipe(
        delay(2000)
      );
  }

  updateIdea(idea: Idea) {
    return this.http.post<Idea>(`${this.BASE_URL}/ideas/${idea.id}`, idea);
  }

  createIdea(idea: Idea) {
    // return this.http.post<Idea>(`${this.BASE_URL}/ideas/${idea.id}`, idea);
  }

  deleteIdea(idea: Idea) {
    // return this.http.delete<Idea>(`${this.BASE_URL}/ideas/${idea.id}`);
  }
}
