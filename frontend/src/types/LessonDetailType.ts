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
  teacherEmail: string;
  lessonName: string;
  cklsDescription: string;
  lessonDescription: string;
  kitPrice: number;
  kitDescription: string;
  category: string;
  runningTime: number;
  maximum: number;
  userName: string;
  userDesciption: string | null;
  teacherImage: string | null;
  curriculums: CurriculumsType[];
  checkLists: CheckListsType[];
  pamphlets: PamphletsType[];
  score: number;
  bookMarked: boolean;
}

export interface LessonDetailProps {
  lessonId: number;
  lessonDetailState: LessonDetailResponse;
  setLessonDetailState: React.Dispatch<
    React.SetStateAction<LessonDetailResponse>
  >;
  pamphletsImgState: any;
  setPamphletsImgState: React.Dispatch<React.SetStateAction<any>>;
  checkListImgState: any;
  setCheckListImgState: React.Dispatch<React.SetStateAction<any>>;
  teacherImgState: any;
  setTeacherImgState: React.Dispatch<React.SetStateAction<any>>;
  schedulesListState: any;
  setScheduleListState: React.Dispatch<React.SetStateAction<any>>;
  scheduleInputState: boolean;
  setScheduleInputState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RatingProps {
  ratingValue: number | null;
  setRatingValue: React.Dispatch<React.SetStateAction<number | null>>;
  disableValue: boolean;
}
