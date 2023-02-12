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
  OpenLessonResponse,
  LessonEnrollRequest,
  ReviewRequest,
  ReviewResponse,
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
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/${lessonId}`,
        updateLessonRequestBody,
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

  const doDeleteLesson = async (email: string, lessonId: number) => {
    try {
      const response = await axios.delete<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/teachers/${email}/lessons/${lessonId}`,
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

  const getRecommandLessonsApi = async (email: string | null) => {
    try {
      let response;
      if (email) {
        response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/recommands?email=${email}`,
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/lessons/recommands`,
        );
      }
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
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/teachers/${email}/lessons?limit=${limit}&offset=${offset}`,
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
      if (getScheduleRequestBody.regDate !== '') {
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

  const doDeleteSchedule = async (
    email: string,
    lessonId: number,
    openLessonId: number,
  ) => {
    console.log(email, lessonId, openLessonId);
    try {
      const response = await axios.delete<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/teachers/${email}/lessons/${lessonId}/${openLessonId}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  // 후기 데이터 받아오는 api
  const getReviewDataApi = async (
    lessonId: number,
    limit: number,
    offset: number,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review/list/${lessonId}?limit=${limit}&offset=${offset}`,
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  // TODO: 상태코드값 돌려받고 싶어요오
  // 후기 작성하는 api
  const doCreateReviewApi = async (createReviewRequestBody: ReviewRequest) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review/`,
        createReviewRequestBody,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  // 후기 삭제하는 api, id는 후기 id
  const doDeleteReviewApi = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  const doGetOpenLessonDetail = async (email: string, openLessonId: number) => {
    try {
      const response = await axios.get<OpenLessonResponse>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/orders?email=${email}&openLessonId=${openLessonId}`,
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
  const doEnrollLessonSchedule = async (
    LessonEnrollRequestBody: LessonEnrollRequest,
  ) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/orders`,
        LessonEnrollRequestBody,
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
  return {
    doCreateLesson,
    doUpdateLesson,
    doDeleteLesson,
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
    doDeleteSchedule,
    doGetBookmark,
    doGetOpenLessonDetail,
    doEnrollLessonSchedule,
    getReviewDataApi,
    doCreateReviewApi,
    doDeleteReviewApi,
  };
};

export default LessonsApi;
