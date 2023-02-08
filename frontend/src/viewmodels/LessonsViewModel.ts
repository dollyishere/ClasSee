import useApi from '../apis/LessonsApi';

import { LessonSearchOption } from '../types/LessonsType';

const LessonsViewModel = () => {
  const { doSearchLessons } = useApi();
  const searchLessons = async (searchOption: LessonSearchOption) => {
    const response = await doSearchLessons(searchOption);
    if (response !== null && response.statusCode === 200) {
      return response?.lessonInfoList;
    }
    return null;
  };

  return {
    searchLessons,
  };
};

export default LessonsViewModel;
