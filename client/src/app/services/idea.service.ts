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
    return this.http.get<Idea[]>(`${this.BASE_URL}/ideas`);
  }

  getIdea(id: number): Observable<Idea> {
    return this.http.get<Idea>(`${this.BASE_URL}/ideas/${id}`);
  }

  updateIdea(idea: Idea): Observable<Idea> {
    return this.http.put<Idea>(`${this.BASE_URL}/ideas/${idea.id}`, idea);
  }

  createIdea(idea: Idea): Observable<Idea> {
    return this.http.post<Idea>(`${this.BASE_URL}/ideas`, idea);
  }

  deleteIdea(id: number): Observable<Idea> {
    return this.http.delete<Idea>(`${this.BASE_URL}/ideas/${id}`);
  }
}
