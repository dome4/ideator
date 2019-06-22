import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Idea } from '../models/idea.model';

@Injectable()
export class IdeaService {

  // api url
  private API_URL = environment.ideaApiUrl;

  constructor(private http: HttpClient) { }

  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>('assets/ideas.json');
  }
}
