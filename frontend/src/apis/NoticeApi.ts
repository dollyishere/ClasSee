import axios from 'axios';

import { CreateNoticeRequest } from '../types/NoticeType';

const NoticeApi = () => {
  const accesstoken = localStorage.getItem('accessToken');
  const doGetNotices = async (limit: number, offset: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/notice?limit=${limit}&offset=${offset}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }

    return null;
  };
  const doCreateNotice = async (requestBody: CreateNoticeRequest) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/notice`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
    }

    return null;
  };
  return {
    doCreateNotice,
    doGetNotices,
  };
};

export default NoticeApi;
