import axios from 'axios';

import {
  LessonDetailRequest,
  LessonDetailResponse,
} from '../types/LessonDetailType';

const GetLessonDetailApi = () => {
  const DoGetLessonDetail = async (
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
  return {
    DoGetLessonDetail,
  };
};

export default GetLessonDetailApi;
