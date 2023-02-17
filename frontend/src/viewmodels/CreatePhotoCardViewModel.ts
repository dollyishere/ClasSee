import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';

import { CreatePhotoCardRequest } from '../types/PhotoCardType';
import useApi from '../apis/PhotoCardApi';
import { storage } from '../utils/Firebase';

const CreatePhotoCardViewModel = () => {
  const { doCreatePhotoCard } = useApi();

  const createPhotoCard = async (
    data: CreatePhotoCardRequest,
    image: File,
    scheduleId: string,
  ) => {
    const response = await doCreatePhotoCard(data);
    await uploadBytes(
      ref(
        storage,
        `photo-cards/${encodeURI(data.userEmail)}/${encodeURI(
          String(data.lessonId),
        )}/${encodeURI(scheduleId)}/${image.name}`,
      ),
      image,
    );

    return response;
  };

  return {
    createPhotoCard,
  };
};

export default CreatePhotoCardViewModel;
