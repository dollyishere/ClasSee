import CreateScheduleApi from '../apis/CreateScheduleApi';

import { CreateScheduleRequest } from '../types/ScheduleType';

const CreateScheduleViewModel = () => {
  const { DoCreateSchedule } = CreateScheduleApi();

  const createSchedule = async (data: CreateScheduleRequest) => {
    const res = await DoCreateSchedule(data);
    return res;
  };

  return {
    createSchedule,
  };
};

export default CreateScheduleViewModel;
