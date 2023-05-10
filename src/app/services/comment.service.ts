import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(comment: Comment) : Observable<any> {
    return this.http.post('http://localhost:8080/api/comments', comment);
  }

  getComments(postId: number) : Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>('http://localhost:8080/api/comments', {
      params: {
        'postId': postId,
      }
    });
  }
}
