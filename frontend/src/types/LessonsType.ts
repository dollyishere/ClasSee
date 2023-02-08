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
  name: string | undefined;
  email: string | undefined;
  limit: number;
  offset: number;
}
