import axios from 'axios';
import useApi from '../apis/LessonsApi';
import { LessonsResponse } from '../types/LessonsType';

const MainPageViewModel = () => {
  const { MyCreatedLessonsMainpageApi, MyAppliedLessonsMainpageApi } = useApi();

  const getMyCreatedLessonsMainpage = async (userId: string) => {
    const res = await MyCreatedLessonsMainpageApi(userId);

    return res;
  };
  const getMyAppliedLessonsMainpage = async (userId: string) => {
    const res = await MyAppliedLessonsMainpageApi(userId);

    return res;
  };
  return {
    getMyCreatedLessonsMainpage,
    getMyAppliedLessonsMainpage,
  };
};

export default MainPageViewModel;
