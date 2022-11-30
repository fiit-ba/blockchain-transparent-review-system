import { Review } from 'src/app/models';

export interface ReviewResponse {
  code: string;
  message: string;
  data: Review;
}
