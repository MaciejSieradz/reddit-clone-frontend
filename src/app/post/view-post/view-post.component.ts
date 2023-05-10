import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post!: Post;
  comment!: Comment;

  comments: Array<Comment> = [];

  constructor(
    private postService: PostService,
    private activatedRotue: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.postId = this.activatedRotue.snapshot.params['id'];
    this.postService.getPost(this.postId).subscribe({
      next: (data) => (this.post = data),
      error: (error) => throwError(() => new Error(error)),
    });

    this.comment = new Comment(
      this.postId,
      new Date(),
      '',
      this.authService.getUsername()
    );
  }

  saveComment() {
    this.commentService.postComment(this.comment).subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.commentService.getComments(this.postId).subscribe((data) => {
      this.comments = data;
    });
  }
}
