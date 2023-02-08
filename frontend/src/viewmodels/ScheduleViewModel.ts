import { Schedule } from '@mui/icons-material';
import ScheduleApi from '../apis/ScheduleApi';

import {
  CreateScheduleRequest,
  GetScheduleRequest,
} from '../types/ScheduleType';

const ScheduleViewModel = () => {
  const { DoCreateSchedule, DoGetSchedule } = ScheduleApi();

  const createSchedule = async (
    data: CreateScheduleRequest,
    lessonId: number,
  ) => {
    const res = await DoCreateSchedule(data, lessonId);
    return res;
  };
  const getSchedule = async (data: GetScheduleRequest) => {
    const res = await DoGetSchedule(data);
    return res;
  };
  return {
    createSchedule,
    getSchedule,
  };
};

export default ScheduleViewModel;
