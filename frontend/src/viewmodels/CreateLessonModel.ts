import CreateLessonApi from '../apis/CreateLessonApi';

import { CreateLessonRequest } from '../types/CreateLessonType';

const CreateLessonModel = () => {
  const { doCreateLesson } = CreateLessonApi();

  const createLesson = async (data: CreateLessonRequest) => {
    const res = await doCreateLesson(data);
    console.log('MODEL');
    console.log(res);
    return res;
  };

  return {
    createLesson,
  };
};

export default CreateLessonModel;
