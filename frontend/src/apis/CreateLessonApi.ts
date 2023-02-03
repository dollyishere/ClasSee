import axios from 'axios';

import {
  CreateLessonRequest,
  CreateLessonResponse,
} from '../types/CreateLessonType';

const CreateLessonApi = () => {
  const doCreateLesson = async (
    createLessonRequestBody: CreateLessonRequest,
  ) => {
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
  return {
    doCreateLesson,
  };
};

export default CreateLessonApi;
