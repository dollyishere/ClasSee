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

  const getUserInfo = async (email: string) => {
    const response = await doGetUserInfo(email);
    if (response.statusCode === 200) {
      setUserInfo({ ...response, email });
    }
    return response;
  };

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

  const updateNickName = async (nickname: string) => {
    if (userInfo !== null) {
      const response = await doUpdateNickName(userInfo.email, nickname);
      if (response.statusCode === 200) {
        setUserInfo({
          ...userInfo,
          nickname,
        });
      }
      return response;
    }
    return { statusCode: 401 };
  };

  const updatePhone = async (phone: string) => {
    if (userInfo !== null) {
      const response = await doUpdatePhone(userInfo.email, phone);
      console.log(response);
      if (response.statusCode === 200) {
        setUserInfo({
          ...userInfo,
          phone,
        });
      }
      return response;
    }
    return { statusCode: 401 };
  };

  const updateAddress = async (address: string) => {
    if (userInfo !== null) {
      const response = await doUpdateAddress(userInfo.email, address);
      if (response.statusCode === 200) {
        setUserInfo({
          ...userInfo,
          address,
        });
      }
      return response;
    }
    return { statusCode: 401 };
  };

  const updateDescription = async (description: string) => {
    if (userInfo !== null) {
      const response = await doUpdateDescription(userInfo.email, description);
      if (response.statusCode === 200) {
        setUserInfo({
          ...userInfo,
          description,
        });
      }
      return response;
    }
    return { statusCode: 401 };
  };

  const updatePassword = async (password: string) => {
    if (userInfo !== null) {
      const saltResponse = await doGetSalt(userInfo.email);
      if (saltResponse.statusCode === 200) {
        const hashedPassword = createHashedPassword(
          password,
          saltResponse.salt,
        );
        const response = await doUpdatePassword(userInfo.email, hashedPassword);
        return response;
      }
      return saltResponse;
    }
    return { statusCode: 401 };
  };

  const withdrawl = async () => {
    if (userInfo !== null) {
      const response = await doWithdrawl(userInfo.email);
      if (response.statusCode === 200) {
        const imageRef = ref(storage, `profiles/${encodeURI(userInfo.email)}/`);
        await listAll(imageRef).then((res: any) => {
          res.items.forEach((item: any) => {
            deleteObject(item);
          });
        });
        setUserInfo(null);
        localStorage.clear();
        sessionStorage.clear();
      }
      return response;
    }
    return { statusCode: 401 };
  };

  return {
    getUserInfo,
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
