import axios from 'axios';
import useApi from '../apis/LessonsApi';
import { LessonsResponse } from '../types/LessonsType';

const MainPageViewModel = () => {
  const { MyCreatedLessonsMainpageApi } = useApi();

  const getMyCreatedLessonsMainpage = async (userId: string) => {
    const res = await MyCreatedLessonsMainpageApi(userId);

    return res;
  };
  return {
    getMyCreatedLessonsMainpage,
  };
};

export default MainPageViewModel;
