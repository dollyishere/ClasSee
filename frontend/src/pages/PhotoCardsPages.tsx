import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import Header from '../components/Header';

const PhotoCardsPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    console.log('마운트');
  }, [page]);
  return (
    <div className="photo-cards-page">
      <Header />
      <div className="photo-cards-page__contents">
        <div className="photo-cards-page__title">자랑 게시판</div>
        <div className="photo-cards-page__list">포토카드 목록</div>
        <div className="photo-cards-page__pagination">
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
    </div>
  );
};

export default PhotoCardsPage;
