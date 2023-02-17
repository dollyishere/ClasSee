import { Schedule } from '@mui/icons-material';
import LessonsApi from '../apis/LessonsApi';

import { ScheduleRequest, GetScheduleRequest } from '../types/LessonsType';

const ScheduleViewModel = () => {
  const { doCreateSchedule, doGetSchedule, doDeleteSchedule } = LessonsApi();

  const createSchedule = async (data: ScheduleRequest, lessonId: number) => {
    const res = await doCreateSchedule(data, lessonId);
    return res;
  };
  const getSchedule = async (data: GetScheduleRequest) => {
    const res = await doGetSchedule(data);
    return res;
  };
  const deleteSchedule = async (
    email: string,
    lessonId: number,
    openLessonId: number,
  ) => {
    const res = await doDeleteSchedule(email, lessonId, openLessonId);
    return res;
  };
  return {
    createSchedule,
    getSchedule,
    deleteSchedule,
  };
};

export default ScheduleViewModel;
