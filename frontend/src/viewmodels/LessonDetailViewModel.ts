import LessonsApi from '../apis/LessonsApi';

import { LessonDetailRequest } from '../types/LessonsType';

const LessonDetailViewModel = () => {
  const { doGetLessonDetail } = LessonsApi();

  const getLessonDetail = async (data: LessonDetailRequest) => {
    const res = await doGetLessonDetail(data);
    return res;
  };

  return {
    getLessonDetail,
  };
};

export default LessonDetailViewModel;
