import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { CreatePostPayload } from '../models/create-post-payload';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>('http://localhost:8080/api/posts');
  }

  public createPost(createPostPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/posts', createPostPayload);
  }

  public getPost(id: number) : Observable<Post> {
    return this.http.get<Post>('http://localhost:8080/api/posts/' + id);
  }

  public getAllPostsByUser(name: string) : Observable<Array<Post>> {
    return this.http.get<Array<Post>>('http://localhost:8080/api/posts', {
      params: {
        'username': name,
      }
    })
  }
}
