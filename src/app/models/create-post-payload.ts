export class CreatePostPayload {
  
  constructor(
    public postName: string,
    public description: string,
    public subredditName ?: string,
    public url ?: string
  ) {}
}
