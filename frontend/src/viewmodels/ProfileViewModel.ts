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
  const { doUpdateProfileImage, doUpdateNickName, doUpdatePhone } = useApi();

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

  const updateNickName = async (nickname: string) => {
    if (userInfo !== null) {
      const response = await doUpdateNickName(userInfo.email, nickname);
      if (response === 200) {
        setUserInfo({
          ...userInfo,
          nickname,
        });
      }
    }
  };

  const updatePhone = async (phone: string) => {
    if (userInfo !== null) {
      const response = await doUpdatePhone(userInfo.email, phone);
      if (response === 200) {
        setUserInfo({
          ...userInfo,
          phone,
        });
      }
    }
  };

  return {
    updateNickName,
    uploadProfileImage,
    getProfileImage,
    updatePhone,
  };
};

export default ProfileViewModel;
