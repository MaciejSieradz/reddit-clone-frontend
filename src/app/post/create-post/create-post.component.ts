import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CreatePostPayload } from 'src/app/models/create-post-payload';
import { Subreddit } from 'src/app/models/subreddit';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<Subreddit>;

  constructor(
    private router: Router,
    private postService: PostService,
    private subredditService: SubredditService
  ) {
    this.postPayload = new CreatePostPayload('', '');
    this.subreddits = [];
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.subredditService.getSubreddits().subscribe({
      next: (data) => (this.subreddits = data),
      error: (error) => throwError(() => new Error(error)),
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName =
      this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => throwError(() => new Error(error)),
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
