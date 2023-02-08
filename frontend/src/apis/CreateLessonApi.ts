import axios from 'axios';

import { LessonRequest, CreateLessonResponse } from '../types/CreateLessonType';
import { Response } from '../types/BaseType';

const CreateLessonApi = () => {
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
  return {
    doCreateLesson,
    doUpdateLesson,
  };
};

export default CreateLessonApi;
