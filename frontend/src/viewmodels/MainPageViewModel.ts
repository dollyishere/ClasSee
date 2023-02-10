import axios from 'axios';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import useLessonApi from '../apis/LessonsApi';
import { storage } from '../utils/Firebase';

const MainPageViewModel = () => {
  const {
    getRecommandLessonsApi1,
    getRecommandLessonsApi2,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
  } = useLessonApi();
  const getRecommandLessons1 = async () => {
    const res = await getRecommandLessonsApi1();
    return res;
  };
  const getRecommandLessons2 = async (email: string) => {
    const res = await getRecommandLessonsApi2(email);
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
  const getLessonImage = async (lessonId: number) => {
    const imageRef = ref(storage, `lessons/${lessonId}/pamphlet_images/`);
    const response = await listAll(imageRef);
    const ret = await getDownloadURL(response.items[0]);
    return ret;
  };
  return {
    getRecommandLessons1,
    getRecommandLessons2,
    getMyCreatedLessonsMainpage,
    getMyAppliedLessonsMainpage,
    deleteMyAppliedLessonsMainpage,
    deleteBookmark,
    addBookmark,
    getLessonImage,
  };
};

export default MainPageViewModel;
