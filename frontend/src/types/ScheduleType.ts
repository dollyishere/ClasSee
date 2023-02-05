export interface CreateScheduleProps {
  runningtime: number;
  lessonId: number;
  scheduleInputState: boolean;
  setScheduleInputState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateScheduleRequest {
  endTime: string;
  lessonId: number;
  startTime: string;
}

export interface CreateScheduleResponse {
  message: string;
  statusCode: number;
}

export interface CheckScheduleRequest {
  regDate: string;
  lessonId: number;
}
