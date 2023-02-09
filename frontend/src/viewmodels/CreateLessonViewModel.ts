import CreateLessonApi from '../apis/CreateLessonApi';

import { LessonRequest } from '../types/CreateLessonType';

const CreateLessonViewModel = () => {
  const { doCreateLesson, doUpdateLesson } = CreateLessonApi();

  const createLesson = async (data: LessonRequest, accessToken: string) => {
    const res = await doCreateLesson(data, accessToken);
    return res;
  };
  const updateLesson = async (data: LessonRequest, lessonId: number) => {
    const res = await doUpdateLesson(data, lessonId);
    return res;
  };

  return {
    createLesson,
    updateLesson,
  };
};

export default CreateLessonViewModel;
