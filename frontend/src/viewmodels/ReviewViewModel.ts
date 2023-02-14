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
  const { doGetReview, doCreateReview, doDeleteReview, doUpdateReview } =
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

  return {
    createReview,
  };
};

export default ReviewViewModel;