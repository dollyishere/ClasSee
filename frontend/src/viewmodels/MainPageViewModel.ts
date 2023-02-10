import axios from 'axios';
import { useRecoilState } from 'recoil';
import useLessonApi from '../apis/LessonsApi';
import authTokenState from '../models/AuthTokenAtom';

const MainPageViewModel = () => {
  const {
    getRecommandLessonsApi,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
  } = useLessonApi();
  const getRecommandLessons = async () => {
    const res = await getRecommandLessonsApi();

    return res;
  };
  const getMyCreatedLessonsMainpage = async (
    email: string,
    limit: number,
    offset: number,
    query: string,
  ) => {
    const res = await MyCreatedLessonsMainpageApi(email, limit, offset, query);
    return res;
  };
  const getMyAppliedLessonsMainpage = async (
    email: string,
    limit: number,
    offset: number,
    query: string,
  ) => {
    const res = await MyAppliedLessonsMainpageApi(email, limit, offset, query);

    return res;
  };
  const deleteMyAppliedLessonsMainpage = async (
    userId: string,
    lessonId: number,
  ) => {
    const res = await deleteMyAppliedLessonsMainpageApi(userId, lessonId);

    return res;
  };
  const deleteBookmark = async (email: string, lessonId: number) => {
    const res = await deleteBookmarkApi(email, lessonId);

    return res;
  };
  const addBookmark = async (email: string, lessonId: number) => {
    const res = await addBookmarkApi(email, lessonId);

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
