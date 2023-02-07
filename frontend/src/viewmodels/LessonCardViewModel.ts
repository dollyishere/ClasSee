import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../utils/Firebase';

import useApi from '../apis/UserApi';
import authTokenState from '../models/AuthTokenAtom';
import useInfoState from '../models/PrivateInfoAtom';

const LessonCardViewModel = () => {
  const getLessonImage = async (lessonId: number) => {
    const imageRef = ref(storage, `lessons/${lessonId}/pamphlet_images/`);
    const response = await listAll(imageRef);
    const ret = await getDownloadURL(response.items[0]);
    console.log('ret', ret);
    return ret;
  };
  return {
    getLessonImage,
  };
};

export default LessonCardViewModel;
