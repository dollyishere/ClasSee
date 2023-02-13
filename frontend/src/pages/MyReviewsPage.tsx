import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PrivateInfoState from '../models/PrivateInfoAtom';
import useMyReviewViewModel from '../viewmodels/MyReviewsViewModel';

const MyReviewsPage = () => {
  const [page, setPage] = useState(1);
  const userInfo = useRecoilValue(PrivateInfoState);
  const { getMyReviews } = useMyReviewViewModel();
  const handleMyReviewData = async () => {
    const limit = 4;
    const offset = (page - 1) * limit;
    if (userInfo) {
      const MyReviewData = getMyReviews(userInfo.email, limit, offset);
    }
  };

  useEffect(() => {
    handleMyReviewData();
  });
  return (
    <div>
      <p>hi</p>
    </div>
  );
};
export default MyReviewsPage;
