import { constSelector } from 'recoil';
import useApi from '../apis/LessonsApi';

const BookmarkViewModel = () => {
  const { doGetBookmark } = useApi();
  const getBookmark = async (email: string, limit: number, offset: number) => {
    const response = await doGetBookmark(email, limit, offset);

    return { lessonInfoList: response.lessonInfoList, count: response.count };
  };
  return {
    getBookmark,
  };
};

export default BookmarkViewModel;
