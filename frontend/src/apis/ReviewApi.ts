import axios from 'axios';

import { CreateReviewRequest, UpdateReviewRequest } from '../types/ReviewType';

const ReviewApi = () => {
  const accesstoken = localStorage.getItem('accessToken');
  // 후기 데이터 받아오는 api

  const doGetReviews = async (
    lessonId: number,
    limit: number,
    offset: number,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review/list/${lessonId}?limit=${limit}&offset=${offset}`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
    return null;
  };
  const doUpdateReview = async (requestBody: UpdateReviewRequest) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review`,
        requestBody,
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
  // TODO: 상태코드값 돌려받고 싶어요오
  // 후기 작성하는 api
  const doCreateReview = async (requestBody: CreateReviewRequest) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/review`,
        requestBody,
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
  const doDeleteReview = async (id: number) => {
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

  return {
    doCreateReview,
    doGetReviews,
    doDeleteReview,
    doUpdateReview,
  };
};

export default ReviewApi;
