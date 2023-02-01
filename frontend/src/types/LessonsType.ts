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
}

export interface LessonsResponse {
  lessons: Array<Lesson>;
}
