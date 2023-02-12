import axios from 'axios';

import { Response } from '../types/BaseType';
import { CreatePhotoCardRequest } from '../types/PhotoCardType';

const PhotoCardApi = () => {
  const accesstoken = localStorage.getItem('accessToken');
  const doDeletePhotoCard = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard?id=${id}`,
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
  const doLikePhotoCard = async (email: string, id: number) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard/likes?email=${email}&id=${id}`,
        {},
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

  const doDislikePhotoCard = async (email: string, id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard/likes?email=${email}&id=${id}`,
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

  const doGetPhotoCards = async (
    email: string | null,
    limit: number,
    offset: number,
  ) => {
    try {
      if (email === null) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard/list?limit=${limit}&offset=${offset}`,
        );
        return response.data;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/photocard/list/${email}?limit=${limit}&offset=${offset}`,
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
    doGetPhotoCards,
    doLikePhotoCard,
    doDislikePhotoCard,
    doDeletePhotoCard,
  };
};

export default PhotoCardApi;
