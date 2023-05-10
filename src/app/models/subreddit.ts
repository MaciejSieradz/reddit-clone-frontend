export class Subreddit {
  constructor(
    public name: string,
    public description: string,
    numerOfPosts?: number,
    public id?: string
  ) { }
}
