export class Comment {
  constructor(
    public postId: number,
    public createdDate: Date,
    public text: string,
    public userName: string
  ) { }
}
