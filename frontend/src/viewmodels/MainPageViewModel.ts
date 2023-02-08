import axios from 'axios';
import { useRecoilState } from 'recoil';
import useLessonApi from '../apis/LessonsApi';
import useUserApi from '../apis/UserApi';
import { LessonsResponse } from '../types/LessonsType';
import { decryptToken, encryptToken } from '../utils/Encrypt';
import authTokenState from '../models/AuthTokenAtom';

const MainPageViewModel = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);

  const {
    getRecommandLessonsApi,
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
    deleteBookmarkApi,
    addBookmarkApi,
  } = useLessonApi();
  const { doGetAccessToken } = useUserApi();
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
    let res = await MyCreatedLessonsMainpageApi(email, limit, offset, query);
    // if (res.statusCode === 403) {
    if (res === null) {
      const hashedRefreshToken = localStorage.getItem('refreshToken');
      // console.log('hashedRefreshToken', hashedRefreshToken);
      if (hashedRefreshToken !== null) {
        const refreshToken = decryptToken(hashedRefreshToken, email);
        console.log('refreshToken', refreshToken);
        const response = await doGetAccessToken(email, refreshToken);

        console.log('response', response);
        if (response) {
          const encryptedToken = encryptToken(
            response.headers.refreshtoken,
            email,
          );
          console.log('encryptedToken', encryptedToken);
          console.log('accesstoken', response.headers.accesstoken);
          const accessToken = response.headers.accesstoken;
          localStorage.setItem('refreshToken', encryptedToken);
          setAuthToken(accessToken);
        }
        // console.log('accessToken', accessToken);
        res = await MyCreatedLessonsMainpageApi(email, limit, offset, query);
      }
    }
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
