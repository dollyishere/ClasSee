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

export interface ReviewType {
  id: number;
  content: string;
  regtime: string;
  score: number;
  img: string;
  userEmail: string;
  userNickname: string;
  userImg: string;
  lessonId: number;
  lessonName: string;
}
