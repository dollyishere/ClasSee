export interface Lesson {
  id: number;
  lessonImage: string;
  teacher: string;
  teacherImage: string;
  name: string;
  runningTime: string;
  category: string;
  rating: number;
  isBookMarked: boolean;
  startTime: string;
  endTime: string;
}

export interface LessonsResponse {
  lessons: Array<Lesson>;
}

export type MyAppliedHover = boolean;
