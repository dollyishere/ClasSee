import { useRecoilValue } from 'recoil';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  listAll,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../utils/Firebase';

import LessonsApi from '../apis/LessonsApi';

import { LessonDetailRequest, LessonEnrollRequest } from '../types/LessonsType';
import PrivateInfoState from '../models/PrivateInfoAtom';

const LessonDetailViewModel = () => {
  const {
    doDeleteLesson,
    doGetLessonDetail,
    doGetOpenLessonDetail,
    doEnrollLessonSchedule,
  } = LessonsApi();
  const userInfo = useRecoilValue(PrivateInfoState);

  const getLessonDetail = async (data: LessonDetailRequest) => {
    const res = await doGetLessonDetail(data);
    return res;
  };

  const getPamphletImgUrls = async (pamphlets: any[], lessonId: any) => {
    const promises = pamphlets.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/pamphlet_images/${imageName}`,
      );
      const url = await getDownloadURL(imgRef);
      return url;
    });
    return Promise.all(promises);
  };

  const getCheckImgUrls = async (checkLists: any[], lessonId: any) => {
    const promises = checkLists.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/checklist_images/${imageName}`,
      );
      const url = await getDownloadURL(imgRef);
      return url;
    });
    return Promise.all(promises);
  };
  const getPamphletImgFiles = async (pamphlets: any[], lessonId: any) => {
    const promises = pamphlets.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/pamphlet_images/${imageName}`,
      );
      return imgRef;
    });
    return Promise.all(promises);
  };

  const getCheckImgFiles = async (checkLists: any[], lessonId: any) => {
    const promises = checkLists.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/checklist_images/${imageName}`,
      );
      return imgRef;
    });
    return Promise.all(promises);
  };

  const doUploadImage = async (
    imgLists: any[],
    lessonId: any,
    folderName: string,
  ) => {
    imgLists.forEach(async (image: any) => {
      const imageName = image.name;
      if (image instanceof Blob) {
        const upLoadedImage = await uploadBytes(
          ref(storage, `lessons/${lessonId}/${folderName}/${imageName}`),
          image,
        );
      }
    });
  };

  const doDeleteImageFiles = async (deleteImgList: any[]) => {
    deleteImgList.forEach(async (deletedImg: any) => {
      const imageRef = ref(storage, `${encodeURI(deletedImg.fullPath)}`);
      const goDeleteImg = await deleteObject(imageRef);
    });
  };

  const getReviewImage = async (lessonId: number, email: string) => {
    const imageRef = ref(storage, `reviews/${lessonId}/${email}/`);
    const res = await listAll(imageRef);
    const ret = await getDownloadURL(res.items[0]);
    return ret;
  };
  const uploadReviewImage = async (lessonId: number, image: File) => {
    if (userInfo !== null) {
      const imageRef = ref(storage, `reviews/${lessonId}/${userInfo.email}/`);
      await listAll(imageRef).then((response: any) => {
        response.items.forEach((item: any) => {
          deleteObject(item);
        });
      });

      await uploadBytes(
        ref(storage, `reviews/${lessonId}/${userInfo.email}/${image.name}`),
        image,
      );
      const res = await getReviewImage(lessonId, userInfo.email);
      if (res) {
        return res;
      }
    }
    return null;
  };
  const doDeleteselectedLesson = async (email: string, lessonId: number) => {
    const res = await doDeleteLesson(email, lessonId);
    return res;
  };

  const getOpenLessonDetail = async (email: string, openLessonId: number) => {
    const res = await doGetOpenLessonDetail(email, openLessonId);
    return res;
  };

  const doLessonEnroll = async (data: LessonEnrollRequest) => {
    const res = await doEnrollLessonSchedule(data);
    return res;
  };
  return {
    getLessonDetail,
    getPamphletImgUrls,
    getCheckImgUrls,
    getPamphletImgFiles,
    getCheckImgFiles,
    doUploadImage,
    doDeleteImageFiles,
    uploadReviewImage,
    getReviewImage,
    doDeleteselectedLesson,
    getOpenLessonDetail,
    doLessonEnroll,
  };
};

export default LessonDetailViewModel;
