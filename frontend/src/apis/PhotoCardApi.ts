import axios from 'axios';

import { Response } from '../types/BaseType';
import { CreatePhotoCardRequest } from '../types/PhotoCardType';

const PhotoCardApi = () => {
  const accesstoken = localStorage.getItem('accessToken');

  const doCreatePhotoCard = async (requestBody: CreatePhotoCardRequest) => {
    try {
      const response = await axios.post<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard`,
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
    doCreatePhotoCard,
  };
};

export default PhotoCardApi;
