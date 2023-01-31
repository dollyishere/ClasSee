import axios from 'axios';
import { MyCreatedLessonsMainpageResponse } from '../types/LessonsType';

const LessonsApi = () => {
  // 내가 개설한 강의 2개 불러오는 함수
  const MyCreatedLessonsMainpageApi = async (userId: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/mycreatedlessonsmainpage/${userId}`,
      );
      return response;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  return {
    MyCreatedLessonsMainpageApi,
  };
};

export default LessonsApi;
