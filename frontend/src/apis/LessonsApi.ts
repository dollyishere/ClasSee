import axios, { AxiosResponse } from 'axios';

import { useRecoilValue } from 'recoil';
import AuthTokenState from '../models/AuthTokenAtom';
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
  SearchResponse,
} from '../types/LessonsType';
import { Response } from '../types/BaseType';

const LessonsApi = () => {
  const accesstoken = localStorage.getItem('accessToken');

  const doCreateLesson = async (createLessonRequestBody: LessonRequest) => {
    try {
      const response = await axios.post<CreateLessonResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons`,
        createLessonRequestBody,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
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
    if (searchOption.keyword) {
      query += `&keyword=${searchOption.keyword}`;
    }
    if (searchOption.email) {
      query += `&email=${searchOption.email}`;
    }

    try {
      const response = await axios.get<SearchResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/search?${query}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const getRecommandLessonsApi1 = async () => {
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
  const getRecommandLessonsApi2 = async (email: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/recommands?email=${email}`,
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
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
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
        `${process.env.REACT_APP_SERVER_URI}/api/v1/students/${email}/lessons?limit=${limit}&offset=${offset}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
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
  const deleteBookmarkApi = async (email: string, lessonId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/bookmarks/${email}/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const addBookmarkApi = async (email: string, lessonId: number) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/bookmarks/${email}/${lessonId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const doGetBookmark = async (
    email: string,
    limit: number,
    offset: number,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/bookmarks/${email}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      console.log(response);
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
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
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
    getRecommandLessonsApi1,
    getRecommandLessonsApi2,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
    doSearchLessons,
    doCreateSchedule,
    doGetSchedule,
    doGetBookmark,
  };
};

export default LessonsApi;
