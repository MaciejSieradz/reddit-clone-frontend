import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { Vote } from 'src/app/models/vote';
import { PostService } from 'src/app/services/post.service';
import { VoteService } from 'src/app/services/vote.service';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit{

  @Input() post!: Post;
  votePayload!: Vote;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;

  constructor(private voteService: VoteService, private authService: AuthService,
  private postService: PostService, private toastr: ToastrService) {

    this.votePayload = new Vote(VoteType.UPVOTE, 0);

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe({
      next: () => this.updateVoteDetails(),
      error: error => throwError(() => new Error(error)),
    });
  }

  upvotePost() {
    console.log(this.votePayload);
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  downvotePost() {
    console.log(this.votePayload);
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

}
