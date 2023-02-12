import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import { Email } from '@mui/icons-material';
import { storage } from '../utils/Firebase';

import useApi from '../apis/UserApi';
import authTokenState from '../models/AuthTokenAtom';
import useInfoState from '../models/PrivateInfoAtom';
import {
  createHashedPassword,
  decryptToken,
  encryptToken,
} from '../utils/Encrypt';

const ProfileViewModel = () => {
  const [userInfo, setUserInfo] = useRecoilState(useInfoState);
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const {
    doUpdateProfileImage,
    doUpdateNickName,
    doUpdatePhone,
    doUpdateAddress,
    doUpdateDescription,
    doUpdatePassword,
    doGetSalt,
    doWithdrawl,
    doGetAccessToken,
  } = useApi();

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

      await doUpdateProfileImage(userInfo.email, uploadedImage);
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

  const updateAddress = async (address: string) => {
    if (userInfo !== null) {
      const response = await doUpdateAddress(userInfo.email, address);
      if (response === 200) {
        setUserInfo({
          ...userInfo,
          address,
        });
      }
    }
  };

  const updateDescription = async (description: string) => {
    if (userInfo !== null) {
      const response = await doUpdateDescription(userInfo.email, description);
      if (response === 200) {
        setUserInfo({
          ...userInfo,
          description,
        });
      }
    }
  };

  const updatePassword = async (password: string) => {
    if (userInfo !== null) {
      const salt = await doGetSalt(userInfo.email);
      if (salt !== null) {
        const hashedPassword = createHashedPassword(password, salt);
        const response = await doUpdatePassword(userInfo.email, hashedPassword);
        return response;
      }
    }
    return null;
  };

  const withdrawl = async () => {
    if (userInfo !== null) {
      const response = await doWithdrawl(userInfo.email);
      if (response === 200) {
        const imageRef = ref(storage, `profiles/${encodeURI(userInfo.email)}/`);
        await listAll(imageRef).then((res: any) => {
          res.items.forEach((item: any) => {
            deleteObject(item);
          });
        });
        setUserInfo(null);
      }
      return response;
    }
    return 400;
  };

  return {
    updateNickName,
    uploadProfileImage,
    getProfileImage,
    updatePhone,
    updateAddress,
    updateDescription,
    updatePassword,
    withdrawl,
  };
};

export default ProfileViewModel;
