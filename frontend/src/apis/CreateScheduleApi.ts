import axios from 'axios';

import {
  CreateScheduleRequest,
  CreateScheduleResponse,
} from '../types/ScheduleType';

const CreateScheduleApi = () => {
  const DoCreateSchedule = async (
    CreateScheduleRequestBody: CreateScheduleRequest,
  ) => {
    try {
      const response = await axios.post<CreateScheduleResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/schedules`,
        CreateScheduleRequestBody,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  return {
    DoCreateSchedule,
  };
};

export default CreateScheduleApi;
