import axios from 'axios';

import { CreateNoticeRequest } from '../types/NoticeType';

const NoticeApi = () => {
  const accesstoken = localStorage.getItem('accessToken');
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
  };
};

export default NoticeApi;
