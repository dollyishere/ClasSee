export interface CreateReviewRequest {
  content: string;
  score: number;
  lessonId: number;
  img: string;
  userEmail: string;
}
