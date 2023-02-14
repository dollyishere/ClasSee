export interface CreateReviewRequest {
  content: string;
  score: number;
  lessonId: number;
  img: string;
  userEmail: string;
}

export interface UpdateReviewRequest {
  content: string;
  score: number;
  id: number;
  img: string;
}
