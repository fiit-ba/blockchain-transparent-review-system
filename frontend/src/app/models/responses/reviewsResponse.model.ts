import { LedgerReview } from 'src/app/models';

export interface ReviewsResponse {
  code: string;
  message: string;
  data: LedgerReview[];
}
