import GetLessonDetailApi from '../apis/GetLessonDetailApi';

import { LessonDetailRequest } from '../types/LessonDetailType';

const LessonDetailViewModel = () => {
  const { DoGetLessonDetail } = GetLessonDetailApi();

  const getLessonDetail = async (data: LessonDetailRequest) => {
    const res = await DoGetLessonDetail(data);
    return res;
  };

  return {
    getLessonDetail,
  };
};

export default LessonDetailViewModel;
