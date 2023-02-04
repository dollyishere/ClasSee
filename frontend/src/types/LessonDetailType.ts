export interface LessonDetailRequest {
  lessonId: number;
}

export interface CurriculumsType {
  id: number;
  stage: number;
  description: string;
  lessonId: number;
}

export interface CheckListsType {
  id: number;
  img: string;
  lessonId: number;
}

export interface PamphletsType {
  id: number;
  img: string;
  lessonId: number;
}

export interface LessonDetailResponse {
  message: string;
  statusCode: number;
  lessonName: string;
  cklsDescription: string;
  kitPrice: number;
  kitDescription: string;
  category: string;
  runningtime: number;
  userName: string;
  userDesciption: string | null;
  profileImg: string | null;
  curriculums: CurriculumsType[];
  checkLists: CheckListsType[];
  pamphlets: PamphletsType[];
  score: number;
  isBookmarked: number;
}
