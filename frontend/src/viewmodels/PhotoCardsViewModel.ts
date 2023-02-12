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
  const { doGetPhotoCards } = useApi();

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
  };
};

export default PhotoCardsViewModel;
