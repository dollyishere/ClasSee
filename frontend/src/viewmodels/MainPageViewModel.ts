import axios from 'axios';
import useApi from '../apis/LessonsApi';
import { LessonsResponse } from '../types/LessonsType';

const MainPageViewModel = () => {
  const {
    getRecommandLessonsApi,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
  } = useApi();
  const getRecommandLessons = async () => {
    const res = await getRecommandLessonsApi();

    return res;
  };
  const getMyCreatedLessonsMainpage = async (userId: string) => {
    const res = await MyCreatedLessonsMainpageApi(userId);

    return res;
  };
  const getMyAppliedLessonsMainpage = async (userId: string) => {
    const res = await MyAppliedLessonsMainpageApi(userId);

    return res;
  };
  const deleteMyAppliedLessonsMainpage = async (
    userId: string,
    lessonId: number,
  ) => {
    const res = await deleteMyAppliedLessonsMainpageApi(userId, lessonId);

    return res;
  };
  const deleteBookmark = async (userId: string, lessonId: number) => {
    const res = await deleteBookmarkApi(userId, lessonId);

    return res;
  };
  const addBookmark = async (userId: string, lessonId: number) => {
    const res = await addBookmarkApi(userId, lessonId);

    return res;
  };
  return {
    getRecommandLessons,
    getMyCreatedLessonsMainpage,
    getMyAppliedLessonsMainpage,
    deleteMyAppliedLessonsMainpage,
    deleteBookmark,
    addBookmark,
  };
};

export default MainPageViewModel;
