import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Pagination } from '@mui/material';
import MyReviewsItem from '../components/MyReviewsItem';
import PrivateInfoState from '../models/PrivateInfoAtom';
import useMyReviewViewModel from '../viewmodels/MyReviewsViewModel';

interface MyReview {
  id: number;
  content: string;
  img: string;
  regtime: string;
  lessonId: number;
  lessonName: string;
  score: number;
  userEmail: string;
  userImg: number | null;
  userNickname: string;
}
const MyReviewsPage = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const [reviewList, setReviewList] = useState<MyReview[]>([]);
  const [review, setReview] = useState<MyReview>({
    id: 0,
    content: '',
    img: '',
    regtime: '',
    lessonId: 0,
    lessonName: '',
    score: 0,
    userEmail: '',
    userImg: 0,
    userNickname: '',
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
