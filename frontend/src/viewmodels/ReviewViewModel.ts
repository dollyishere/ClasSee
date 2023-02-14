import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import useApi from '../apis/ReviewApi';
import { CreateReviewRequest } from '../types/ReviewType';
import { storage } from '../utils/Firebase';

const ReviewViewModel = () => {
  const { doGetReviews, doCreateReview, doDeleteReview, doUpdateReview } =
    useApi();

  const createReview = async (
    requestBody: CreateReviewRequest,
    image: File,
  ) => {
    const createResponse = await doCreateReview(requestBody);
    if (createResponse.statusCode === 200) {
      const reviewId = createResponse.id;
      const uploadUrl = `reviews/${encodeURI(
        String(requestBody.lessonId),
      )}/${encodeURI(String(reviewId))}/${requestBody.userEmail}/${image.name}`;
      await uploadBytes(ref(storage, uploadUrl), image);
      const updateResponse = await doUpdateReview({
        content: requestBody.content,
        id: reviewId,
        img: uploadUrl,
        score: requestBody.score,
      });
      if (updateResponse.statusCode === 200) {
        return 200;
      }
    }
    return null;
  };

  const getReviews = async (
    lessonId: number,
    limit: number,
    offset: number,
  ) => {
    const response = await doGetReviews(lessonId, limit, offset);
    return response;
  };

  const getReviewImage = async (imgSrc: string) => {
    const imageRef = ref(storage, imgSrc);
    const ret = await getDownloadURL(imageRef);
    return ret;
  };

  return {
    createReview,
    getReviews,
    getReviewImage,
  };
};

export default ReviewViewModel;
