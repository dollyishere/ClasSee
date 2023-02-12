import { useRecoilValue } from 'recoil';
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

import { LessonDetailRequest, ReviewRequest } from '../types/LessonsType';
import PrivateInfoState from '../models/PrivateInfoAtom';

const LessonDetailViewModel = () => {
  const {
    doDeleteLesson,
    doGetLessonDetail,
    getReviewDataApi,
    doCreateReviewApi,
    doDeleteReviewApi,
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
  const getReviewData = async (
    lessonId: number,
    limit: number,
    offset: number,
  ) => {
    const res = getReviewDataApi(lessonId, limit, offset);
    return res;
  };
  const doCreateReview = async (data: ReviewRequest) => {
    const res = await doCreateReviewApi(data);
    return res;
  };
  const doDeleteReview = async (id: number) => {
    const res = await doDeleteReviewApi(id);
    return res;
  };
  const getReviewImage = async (email: string) => {
    const imageRef = ref(storage, `review/${email}/`);
    const res = await listAll(imageRef);
    const ret = await getDownloadURL(res.items[0]);
    return ret;
  };
  const uploadReviewImage = async (image: File) => {
    if (userInfo !== null) {
      const imageRef = ref(storage, `reviews/${userInfo.email}/`);
      await listAll(imageRef).then((response: any) => {
        response.items.forEach((item: any) => {
          deleteObject(item);
        });
      });

      await uploadBytes(
        ref(storage, `reviews/${userInfo.email}/${image.name}`),
        image,
      );
      const res = await getReviewImage(userInfo.email);
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
  return {
    getLessonDetail,
    getPamphletImgUrls,
    getCheckImgUrls,
    getPamphletImgFiles,
    getCheckImgFiles,
    doUploadImage,
    doDeleteImageFiles,
    getReviewData,
    doCreateReview,
    doDeleteReview,
    uploadReviewImage,
    getReviewImage,
    doDeleteselectedLesson,
  };
};

export default LessonDetailViewModel;
