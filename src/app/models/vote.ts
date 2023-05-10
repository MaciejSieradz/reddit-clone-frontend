import { VoteType } from '../shared/vote-button/vote-type';

export class Vote {
  constructor(public voteType: VoteType, public postId: number) {}
}
