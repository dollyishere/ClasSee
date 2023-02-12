import {
  ref,
  getDownloadURL,
  uploadBytes,
  getBlob,
  listAll,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../utils/Firebase';

import LessonsApi from '../apis/LessonsApi';

import { LessonDetailRequest, LessonEnrollRequest } from '../types/LessonsType';

const LessonDetailViewModel = () => {
  const {
    doGetLessonDetail,
    doDeleteLesson,
    doGetOpenLessonDetail,
    doEnrollLessonSchedule,
  } = LessonsApi();

  const getLessonDetail = async (data: LessonDetailRequest) => {
    const res = await doGetLessonDetail(data);
    return res;
  };

  const getPamphletImgUrls = async (pamphlets: any[], lessonId: any) => {
    const promises = pamphlets.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/pamphlet_images/${encodeURI(imageName)}`,
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
        `lessons/${lessonId}/checklist_images/${encodeURI(imageName)}`,
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
        `lessons/${lessonId}/pamphlet_images/${encodeURI(imageName)}`,
      );
      // const file = await getBlob(imgRef);
      return imgRef;
    });
    return Promise.all(promises);
  };

  const getCheckImgFiles = async (checkLists: any[], lessonId: any) => {
    const promises = checkLists.map(async (item) => {
      const imageName = item.img as string;
      const imgRef = ref(
        storage,
        `lessons/${lessonId}/checklist_images/${encodeURI(imageName)}`,
      );
      // CORS 오류 발생하기에 일단 막아둠
      // const file = await getBlob(imgRef);
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
    doDeleteselectedLesson,
    getOpenLessonDetail,
    doLessonEnroll,
  };
};

export default LessonDetailViewModel;
