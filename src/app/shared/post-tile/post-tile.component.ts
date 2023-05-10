import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent {

  @Input() post!: Post;

  constructor(private router: Router) {}

  goToPost(id: number) : void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
