import CreateLessonApi from '../apis/CreateLessonApi';

import { CreateLessonRequest } from '../types/CreateLessonType';

const CreateLessonModel = () => {
  const { doCreateLesson } = CreateLessonApi();

  const createLesson = async (data: CreateLessonRequest) => {
    const res = await doCreateLesson(data);
    return res;
  };

  return {
    createLesson,
  };
};

export default CreateLessonModel;
