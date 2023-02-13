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
import { createHashedPassword } from '../utils/Encrypt';

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
    doGetUserInfo,
  } = useApi();

  const getProfileImage = async (imgSrc: string) => {
    const imageRef = ref(storage, imgSrc);
    const ret = await getDownloadURL(imageRef);
    return ret;
  };

  const uploadProfileImage = async (image: File, email: string) => {
    const imgSrc = `profiles/${encodeURI(email)}`;
    const imageRef = ref(storage, imgSrc);
    await listAll(imageRef).then((response: any) => {
      response.items.forEach((item: any) => {
        deleteObject(item);
      });
    });
    await uploadBytes(ref(storage, `${imgSrc}/${image.name}`), image);

    const response = await doUpdateProfileImage(
      email,
      `${imgSrc}/${image.name}`,
    );
    if (response === 200) {
      const newUserInfo = await doGetUserInfo(email);
      setUserInfo({ ...newUserInfo, email });
    }
    const uploadedImage = await getProfileImage(`${imgSrc}/${image.name}`);
    return uploadedImage;
  };

  const updateNickName = async (email: string, nickname: string) => {
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
