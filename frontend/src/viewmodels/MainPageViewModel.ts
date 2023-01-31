import axios from 'axios';
import useApi from '../apis/LessonsApi';
import { MyCreatedLessonsMainpageResponse } from '../types/LessonsType';

const MainPageViewModel = () => {
  const { MyCreatedLessonsMainpageApi } = useApi();

  const getMyCreatedLessonsMainpage = async (userId: number) => {
    const res = await MyCreatedLessonsMainpageApi(userId);

    return res;
  };
  return {
    getMyCreatedLessonsMainpage,
  };
};

export default MainPageViewModel;
