import CreateLessonApi from '../apis/CreateLessonApi';

import { CreateLessonRequest } from '../types/CreateLessonType';

const CreateLessonViewModel = () => {
  const { DoCreateLesson } = CreateLessonApi();

  const createLesson = async (data: CreateLessonRequest) => {
    const res = await DoCreateLesson(data);
    return res;
  };

  return {
    createLesson,
  };
};

export default CreateLessonViewModel;
