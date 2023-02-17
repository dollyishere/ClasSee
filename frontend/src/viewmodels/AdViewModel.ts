import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  ListResult,
  StorageReference,
} from 'firebase/storage';

import { storage } from '../utils/Firebase';

const AdViewModel = () => {
  const getAdsRef = async () => {
    const imageRef = ref(storage, `ad-images/`);
    const ads: ListResult = await listAll(imageRef);
    return ads;
  };

  const getAdImage = async (imgRef: StorageReference) => {
    const url = await getDownloadURL(imgRef);
    return url;
  };

  return { getAdsRef, getAdImage };
};

export default AdViewModel;
