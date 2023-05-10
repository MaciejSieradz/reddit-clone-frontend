import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subreddit } from '../models/subreddit';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) { }

  getSubreddits() : Observable<Array<Subreddit>>{
    return this.http.get<Array<Subreddit>>('http://localhost:8080/api/subreddit');
  }

  createSubreddit(subreddit: Subreddit) : Observable<Subreddit> {
    return this.http.post<Subreddit>('http://localhost:8080/api/subreddit', subreddit);
  }

}
