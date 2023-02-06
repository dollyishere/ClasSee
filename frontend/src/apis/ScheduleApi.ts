import axios from 'axios';

import {
  CreateScheduleRequest,
  CreateScheduleResponse,
  GetScheduleRequest,
  GetScheduleResponse,
} from '../types/ScheduleType';

const ScheduleApi = () => {
  const DoCreateSchedule = async (
    createScheduleRequestBody: CreateScheduleRequest,
    lessonId: number,
  ) => {
    try {
      const response = await axios.post<CreateScheduleResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${lessonId}/schedules`,
        createScheduleRequestBody,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const DoGetSchedule = async (getScheduleRequestBody: GetScheduleRequest) => {
    try {
      let response;
      if (getScheduleRequestBody.regDate) {
        response = await axios.get<GetScheduleResponse>(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${getScheduleRequestBody.lessonId}/schedules?regDate=${getScheduleRequestBody.regDate}`,
        );
      } else {
        response = await axios.get<GetScheduleResponse>(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${getScheduleRequestBody.lessonId}/schedules`,
        );
      }
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  return {
    DoCreateSchedule,
    DoGetSchedule,
  };
};

export default ScheduleApi;
