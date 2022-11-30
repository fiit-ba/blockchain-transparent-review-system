import { ReviewHistory } from 'src/app/models';

export interface ReviewHistoryResponse {
  code: string;
  message: string;
  data: ReviewHistory[];
}
