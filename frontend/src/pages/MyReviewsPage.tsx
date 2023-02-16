import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      if (MyReviewData.statusCode === 200) {
        setCount(Math.ceil(MyReviewData.count / limit));
        setReviews(MyReviewData?.page);
      } else if (MyReviewData.statusCode === 401) {
        alert('로그인 후 이용 바랍니다');
        navigate('/login');
      } else if (MyReviewData.statusCode === 404) {
        alert('유효하지 않은 접근입니다');
      } else if (MyReviewData.statusCode === 500) {
        alert('서버오류 입니다');
      } else {
        alert('알 수 없는 오류입니다');
      }
    }
  };
  const handleDeleteReview = async (reviewId: number, imgSrc: string) => {
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      const response = await deleteReview(reviewId, imgSrc);
      if (response.statusCode === 200) {
        handleMyReviewData();
      } else if (response.statusCode === 401) {
        alert('로그인 후 이용 바랍니다');
        navigate('/login');
      } else if (response.statusCode === 404) {
        alert('유효하지 않은 접근입니다');
      } else if (response.statusCode === 500) {
        alert('서버오류 입니다');
      } else {
        alert('알 수 없는 오류입니다');
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
