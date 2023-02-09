import axios, { AxiosResponse } from 'axios';
import {
  LessonRequest,
  CreateLessonResponse,
  LessonDetailRequest,
  LessonDetailResponse,
  LessonsResponse,
  LessonSearchOption,
  ScheduleRequest,
  GetScheduleResponse,
  GetScheduleRequest,
} from '../types/LessonsType';
import { Response } from '../types/BaseType';

const LessonsApi = () => {
  const doCreateLesson = async (createLessonRequestBody: LessonRequest) => {
    try {
      const response = await axios.post<CreateLessonResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons`,
        createLessonRequestBody,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const doUpdateLesson = async (
    updateLessonRequestBody: LessonRequest,
    lessonId: number,
  ) => {
    try {
      console.log(lessonId);
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${lessonId}`,
        updateLessonRequestBody,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      console.log(updateLessonRequestBody);
    }
    return null;
  };
  const doGetLessonDetail = async (
    getLessonDetailRequestBody: LessonDetailRequest,
  ) => {
    try {
      const response = await axios.get<LessonDetailResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${getLessonDetailRequestBody.lessonId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };

  const doSearchLessons = async (searchOption: LessonSearchOption) => {
    let query = `limit=${searchOption.limit}&offset=${searchOption.offset}`;
    if (searchOption.category) {
      query += `&category=${searchOption.category}`;
    }
    if (searchOption.dayOfWeek) {
      query += `&dayofWeek=${searchOption.dayOfWeek}`;
    }
    if (searchOption.minPrice) {
      query += `&minPrice=${searchOption.minPrice}`;
    }

    if (searchOption.maxPrice) {
      query += `&maxPrice=${searchOption.maxPrice}`;
    }
    if (searchOption.minStartTime) {
      query += `&minStartTime=${searchOption.minStartTime}`;
    }
    if (searchOption.maxStartTime) {
      query += `&maxStartTime=${searchOption.maxStartTime}`;
    }
    if (searchOption.name) {
      query += `&name=${searchOption.name}`;
    }
    if (searchOption.email) {
      query += `&email=${searchOption.email}`;
    }

    try {
      const response = await axios.get<LessonsResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/search?${query}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const getRecommandLessonsApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/recommands`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  // 내가 개설한 강의 2개 불러오는 함수
  const MyCreatedLessonsMainpageApi = async (
    email: string,
    limit: number,
    offset: number,
    query: string,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/teachers/${email}/lessons?limit=${limit}&offset=${offset}&query=${query}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const MyAppliedLessonsMainpageApi = async (
    email: string,
    limit: number,
    offset: number,
    query: string,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/students${email}/lessons?limit=${limit}&offset=${offset}&query=${query}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const deleteMyAppliedLessonsMainpageApi = async (
    userId: string,
    lessonId: number,
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/myappliedlessonsmainpage/${userId}/${lessonId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const deleteBookmarkApi = async (userId: string, lessonId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/deleteBookmark/${userId}/${lessonId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const addBookmarkApi = async (userId: string, lessonId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/addBookmark/${userId}/${lessonId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const doCreateSchedule = async (
    createScheduleRequestBody: ScheduleRequest,
    lessonId: number,
  ) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${lessonId}/schedules`,
        createScheduleRequestBody,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const doGetSchedule = async (getScheduleRequestBody: GetScheduleRequest) => {
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
    doCreateLesson,
    doUpdateLesson,
    doGetLessonDetail,
    getRecommandLessonsApi,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
    doSearchLessons,
    doCreateSchedule,
    doGetSchedule,
  };
};

export default LessonsApi;
