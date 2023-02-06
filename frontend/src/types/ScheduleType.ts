import { Response } from './BaseType';

export interface RequestInfo {
  endTime: string;
  startTime: string;
}

export interface CreateScheduleProps {
  runningtime: number;
  lessonId: number;
  scheduleInputState: boolean;
  setScheduleInputState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateScheduleRequest {
  endTime: string;
  startTime: string;
}

export interface CreateScheduleResponse {
  message: string;
  statusCode: number;
}

export interface LessonSchedulesType {
  openLessonId: number;
  lessonId: number;
  startTime: string;
  endTime: string;
}

export interface GetScheduleResponse extends Response {
  lessonSchedules: LessonSchedulesType[];
}

export interface GetScheduleRequest {
  regDate: string | null;
  lessonId: number;
}
