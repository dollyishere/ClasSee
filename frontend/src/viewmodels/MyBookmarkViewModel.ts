import { constSelector } from 'recoil';
import useApi from '../apis/LessonsApi';

const MyBookmarkViewModel = () => {
  const { doGetBookmark } = useApi();
  const getBookmark = async (email: string) => {
    const response = await doGetBookmark(email);

    return response.lessonInfoList;
  };
  return {
    getBookmark,
  };
};

export default MyBookmarkViewModel;
