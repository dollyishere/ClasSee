import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Pagination } from '@mui/material';
import MyReviewsItem from '../components/MyReviewsItem';
import PrivateInfoState from '../models/PrivateInfoAtom';
import useMyReviewViewModel from '../viewmodels/MyReviewsViewModel';

interface MyReview {
  id: number;
  content: string;
  day: string;
  img: string;
  lessonId: number;
  lessonName: string;
  month: string;
  score: number;
  time: string;
  userEmail: string;
  userImg: number | null;
  userNickname: string;
  year: string;
}
const MyReviewsPage = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const [reviewList, setReviewList] = useState<MyReview[]>([]);
  const [review, setReview] = useState<MyReview>({
    id: 0,
    content: '',
    day: '',
    img: '',
    lessonId: 0,
    lessonName: '',
    month: '',
    score: 0,
    time: '',
    userEmail: '',
    userImg: 0,
    userNickname: '',
    year: '',
  });
  const userInfo = useRecoilValue(PrivateInfoState);
  const { getMyReviews } = useMyReviewViewModel();
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
      setReviewList(MyReviewData?.page);
      console.log(MyReviewData?.page);
    }
  };

  useEffect(() => {
    handleMyReviewData();
  }, [page]);
  return (
    <div>
      <h1>작성한 후기</h1>
      <br />
      {reviewList.map((myreview) => (
        <MyReviewsItem key={myreview.id} myreview={myreview} />
      ))}
      <div className="lessons-page__pagination">
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
