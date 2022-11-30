import { Review } from 'src/app/models';

export interface ReviewHistory {
  timestamp: {
    seconds: string;
    nanos: number;
  };
  txid: string;
  data: Review;
}
