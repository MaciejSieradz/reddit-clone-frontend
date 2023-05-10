import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/models/subreddit';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-browse-reddit',
  templateUrl: './browse-reddit.component.html',
  styleUrls: ['./browse-reddit.component.css']
})
export class BrowseRedditComponent implements OnInit{

  subreddits: Array<Subreddit> = [];

  constructor(private subredditService: SubredditService) {}

  ngOnInit(): void {
      this.subredditService.getSubreddits().subscribe(data => {
      this.subreddits = data.slice(0,3);
    });
  }

}
