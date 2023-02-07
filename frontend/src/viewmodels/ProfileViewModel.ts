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

const ProfileViewModel = () => {
  const [userInfo, setUserInfo] = useRecoilState(useInfoState);
  const authToken = useRecoilValue(authTokenState);
  const { doUpdateProfileImage } = useApi();

  const getProfileImage = async (email: string) => {
    const imageRef = ref(storage, `profiles/${encodeURI(email)}/`);
    const response = await listAll(imageRef);
    const ret = await getDownloadURL(response.items[0]);
    return ret;
  };

  const uploadProfileImage = async (image: File) => {
    if (userInfo !== null) {
      const imageRef = ref(storage, `profiles/${encodeURI(userInfo.email)}/`);
      await listAll(imageRef).then((response: any) => {
        response.items.forEach((item: any) => {
          deleteObject(item);
        });
      });

      await uploadBytes(
        ref(
          storage,
          `profiles/${encodeURI(userInfo.email)}/${encodeURI(image.name)}`,
        ),
        image,
      );

      const uploadedImage = await getProfileImage(userInfo.email);

      doUpdateProfileImage(userInfo.email, uploadedImage);
      if (uploadedImage !== undefined)
        setUserInfo({
          ...userInfo,
          img: uploadedImage,
        });
      return uploadedImage;
    }
    return null;
  };

  return {
    uploadProfileImage,
    getProfileImage,
  };
};

export default ProfileViewModel;
