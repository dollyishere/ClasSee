import axios, { AxiosResponse } from 'axios';
import { LessonsResponse } from '../types/LessonsType';

const LessonsApi = () => {
  // 내가 개설한 강의 2개 불러오는 함수
  const MyCreatedLessonsMainpageApi = async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/mycreatedlessonsmainpage/${userId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const MyAppliedLessonsMainpageApi = async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/myappliedlessonsmainpage/${userId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  const deleteMyAppliedLessonsMainpageApi = async (
    userId: string,
    lessonId: number,
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/myappliedlessonsmainpage/${userId}/${lessonId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }
    return null;
  };
  return {
    MyCreatedLessonsMainpageApi,
    MyAppliedLessonsMainpageApi,
    deleteMyAppliedLessonsMainpageApi,
  };
};

export default LessonsApi;
