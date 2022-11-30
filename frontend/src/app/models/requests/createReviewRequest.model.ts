export interface CreateReviewRequest {
  reviewAuthorID: number;
  reviewSubjectID: number;
  reviewTitle: string;
  reviewText: string;
  isPublic: boolean;
}
