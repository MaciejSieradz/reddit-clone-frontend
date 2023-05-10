import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent {

  subreddit: Subreddit;

  constructor(private router: Router, private subredditService: SubredditService) {
    this.subreddit = new Subreddit('', '');
  }

  createSubreddit() {
    this.subredditService.createSubreddit(this.subreddit).subscribe({
      next: (data) => this.proceedCreation(data),
      error: error => throwError(() => new Error(error)),
      
    })
  }

  proceedCreation(data: Subreddit) {
    this.router.navigateByUrl('');
  }

  discard() {
    this.router.navigateByUrl('/');
  }

}
