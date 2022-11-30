import { Review } from 'src/app/models';

export interface OneReviewResponse {
  code: string;
  message: string;
  data: Review;
}
