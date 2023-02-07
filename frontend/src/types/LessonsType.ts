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

export interface BookMarkedResponse extends Response {
  lessonInfoList: Array<number>;
}
