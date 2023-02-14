import UserApi from '../apis/UserApi';

const MyReviewsViewModel = () => {
  const { getMyReviewsApi } = UserApi();
  const getMyReviews = async (email: string, limit: number, offset: number) => {
    const res = getMyReviewsApi(email, limit, offset);
    return res;
  };
  return {
    getMyReviews,
  };
};

export default MyReviewsViewModel;
