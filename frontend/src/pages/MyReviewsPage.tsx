import React, { useEffect, useState, useRef } from 'react';
import { Pagination, Rating } from '@mui/material';
import { useRecoilValue } from 'recoil';
import PrivateInfoState from '../models/PrivateInfoAtom';
import { ReviewType } from '../types/ReviewType';
import ReviewItem from '../components/LessonDetailPage/ReviewItem';
import useViewModel from '../viewmodels/ReviewViewModel';
import useMyReviewViewModel from '../viewmodels/MyReviewsViewModel';

const MyReviewsPage: React.FC = () => {
  const { getMyReviews } = useMyReviewViewModel();

  const userInfo = useRecoilValue(PrivateInfoState);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [reviews, setReviews] = useState<Array<ReviewType>>([]);
  const { deleteReview } = useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  const handleMyReviewData = async () => {
    const limit = 4;
    const offset = (page - 1) * limit;
    if (userInfo) {
      const MyReviewData = await getMyReviews(userInfo.email, limit, offset);
      if (MyReviewData !== null && MyReviewData.count !== undefined) {
        setCount(Math.ceil(MyReviewData.count / limit));
      }
      setReviews(MyReviewData?.page);
    }
  };
  const handleDeleteReview = async (reviewId: number, imgSrc: string) => {
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      const response = await deleteReview(reviewId, imgSrc);
      if (response.statusCode === 200) {
        handleMyReviewData();
      }
    }
  };

  useEffect(() => {
    handleMyReviewData();
  }, [page]);

  return (
    <div className="my-review">
      <div className="my-review__review-list">
        {reviews.map((review: ReviewType) => (
          <ReviewItem
            review={review}
            key={review.id}
            handleDeleteReview={handleDeleteReview}
          />
        ))}
      </div>
      <div className="my-review__pagination">
        <Pagination
          variant="outlined"
          count={count}
          page={page}
          shape="rounded"
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MyReviewsPage;
