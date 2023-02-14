import { Response } from './BaseType';

export interface Lesson {
  lessonId: number;
  openLessonId: number;
  lessonImage: string;
  teacher: string;
  teacherImage: string;
  name: string;
  runningTime: number;
  category: string;
  score: number;
  bookMarked: boolean;
  startTime: string;
  endTime: string;
}

export interface LessonsResponse extends Response {
  lessonInfoList: Array<Lesson>;
}

export interface LessonSearchOption {
  category: string | undefined;
  dayOfWeek: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minStartTime: number | undefined;
  maxStartTime: number | undefined;
  keyword: string | undefined;
  email: string | undefined;
  limit: number;
  offset: number;
}

// 강의 개설&수정 페이지 각각 개별 component에 전달할 props type
export interface StepOneProps {
  lessonNameState: string;
  setLessonNameState: React.Dispatch<React.SetStateAction<string>>;
  categorySelectState: string;
  setCategorySelectState: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepThreeProps {
  lessonDescState: string;
  setLessonDescState: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepFiveProps {
  curriListState: string[];
  setCurriListState: React.Dispatch<React.SetStateAction<string[]>>;
  maximumState: number;
  setMaximumState: React.Dispatch<React.SetStateAction<number>>;
  runningtimeState: number;
  setRunningtimeState: React.Dispatch<React.SetStateAction<number>>;
}

export interface StepSixProps {
  basicPriceState: number;
  setBasicPriceState: React.Dispatch<React.SetStateAction<number>>;
  kitDescState: string;
  setKitDescState: React.Dispatch<React.SetStateAction<string>>;
  kitPriceState: number;
  setKitPriceState: React.Dispatch<React.SetStateAction<number>>;
}

export interface ImageUploadProps {
  limitNumber: number;
  imgSrcListState: string[];
  setImgSrcListState: React.Dispatch<React.SetStateAction<string[]>>;
  imgFileListState: object[];
  setImgFileListState: React.Dispatch<React.SetStateAction<object[]>>;
  deleteImgList: any[];
  setDeleteImgList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface MaterialDescProps {
  materialDescState: string;
  setMaterialDescState: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoryProps {
  categorySelectState: string;
  setCategorySelectState: React.Dispatch<React.SetStateAction<string>>;
}

export interface ChangeComponentProps {
  selectedComponentState: number;
  setSelectedComponentState: React.Dispatch<React.SetStateAction<number>>;
  handleCreateLessonSubmit: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export interface ImageType {
  img: string;
}

export interface CurriculumType {
  stage: number;
  description: string;
}

export interface CurriculumsType extends CurriculumType {
  id: number;
  lessonId: number;
}

export interface ImageListType extends ImageType {
  id: number;
  lessonId: number;
}

export interface LessonRequest {
  category: string;
  checkList: ImageType[];
  cklsDescription: string;
  curriculumList: CurriculumType[];
  description: string;
  email: string | undefined;
  kitDescription: string;
  kitPrice: number;
  maximum: number;
  name: string;
  pamphletList: ImageType[];
  price: number;
  runningtime: number;
}

export interface CreateLessonResponse extends Response {
  lessonId: number;
}

export interface LessonDetailRequest {
  lessonId: number;
}

export interface LessonDetailResponse extends Response {
  teacher: string;
  lessonName: string;
  lessonId: number;
  price: number;
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
  curriculums: CurriculumType[];
  checkLists: ImageListType[];
  pamphlets: ImageListType[];
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

export interface CreateScheduleProps {
  runningtime: number;
  lessonId: number;
  scheduleInputState: boolean;
  setScheduleInputState: React.Dispatch<React.SetStateAction<boolean>>;
  schedulesListState: any[];
  rerenderSchedule: boolean;
  setRerenderSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ScheduleRequest {
  endTime: string;
  startTime: string;
}

export interface ScheduleDetailProps {
  schedulesListState: any;
  setSchedulesListState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LessonSchedulesType extends ScheduleRequest {
  openLessonId: number;
  lessonId: number;
  rerenderSchedule: boolean;
  setRerenderSchedule: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GetScheduleResponse extends Response {
  lessonSchedules: LessonSchedulesType[];
}

export interface GetScheduleRequest {
  regDate: string | null;
  lessonId: number;
}

export interface SearchResponse extends LessonsResponse {
  count: number;
}

export interface OpenLessonResponse extends Response {
  kitPrice: number;
  lessonImg: string;
  lessonName: string;
  lessonPrice: number;
  lessonStartTime: string;
  lessonTeacherName: string;
  userAddress: string;
  userEmail: string;
  userName: string;
  userNickname: string;
  userPhone: string;
  userPoint: number;
}

export interface LessonEnrollRequest {
  email: string;
  openLessonId: number;
  phone: string;
  price: number;
}
