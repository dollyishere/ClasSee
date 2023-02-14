import useApi from '../apis/ReviewApi';
import { ReviewRequest } from '../types/LessonsType';

const ReviewViewModel = () => {
  const { doGetReview, doCreateReview, doDeleteReview } = useApi();

  const createReview = async (requestBody: ReviewRequest) => {
    const response = await doCreateReview(requestBody);
    return response;
  };

  return {
    createReview,
  };
};

export default ReviewViewModel;
