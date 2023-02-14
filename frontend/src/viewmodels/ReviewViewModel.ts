import useApi from '../apis/ReviewApi';
import { CreateReviewRequest } from '../types/ReviewType';

const ReviewViewModel = () => {
  const { doGetReview, doCreateReview, doDeleteReview } = useApi();

  const createReview = async (requestBody: CreateReviewRequest) => {
    const response = await doCreateReview(requestBody);
    return response;
  };

  return {
    createReview,
  };
};

export default ReviewViewModel;
