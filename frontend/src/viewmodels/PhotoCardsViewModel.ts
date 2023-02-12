import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';

import { storage } from '../utils/Firebase';
import useApi from '../apis/PhotoCardApi';

const PhotoCardsViewModel = () => {
  const {
    doGetPhotoCards,
    doLikePhotoCard,
    doDislikePhotoCard,
    doDeletePhotoCard,
  } = useApi();

  const deletePhotoCard = async (id: number) => {
    const response = await doDeletePhotoCard(id);
    return response;
  };
  const likePhotoCard = async (email: string, id: number) => {
    const response = await doLikePhotoCard(email, id);
    return response;
  };
  const dislikePhotoCard = async (email: string, id: number) => {
    const response = await doDislikePhotoCard(email, id);
    return response;
  };

  const getPhotoCards = async (
    email: string | null,
    limit: number,
    offset: number,
  ) => {
    const response = await doGetPhotoCards(email, limit, offset);
    return response;
  };

  const getPhotoCardImage = async (imgSrc: string) => {
    const imageRef = ref(storage, imgSrc);
    const ret = await getDownloadURL(imageRef);
    return ret;
  };

  return {
    getPhotoCards,
    getPhotoCardImage,
    likePhotoCard,
    dislikePhotoCard,
    deletePhotoCard,
  };
};

export default PhotoCardsViewModel;
