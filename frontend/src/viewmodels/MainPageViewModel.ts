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
    getRecommandLessonsApi,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
  } = useLessonApi();
  const getRecommandLessons = async (email: string | null) => {
    const res = await getRecommandLessonsApi(email);
    return res;
  };

  const getMyCreatedLessonsMainpage = async (
    email: string,
    limit: number,
    offset: number,
  ) => {
    const res = await MyCreatedLessonsMainpageApi(email, limit, offset);
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
    email: string,
    openLessonId: number,
  ) => {
    const res = await deleteMyAppliedLessonsMainpageApi(email, openLessonId);

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
    getRecommandLessons,
    getMyCreatedLessonsMainpage,
    getMyAppliedLessonsMainpage,
    deleteMyAppliedLessonsMainpage,
    deleteBookmark,
    addBookmark,
    getLessonImage,
  };
};

export default MainPageViewModel;
