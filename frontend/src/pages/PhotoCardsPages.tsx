import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import Header from '../components/Header';
import PhotoCard from '../components/PhotoCard';
import { PhotoCardType } from '../types/PhotoCardType';
import useViewModel from '../viewmodels/PhotoCardsViewModel';

const PhotoCardsPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [photoCards, setPhotoCards] = useState<Array<PhotoCardType>>([]);

  const { getPhotoCards } = useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const getData = async () => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const response = await getPhotoCards(null, limit, offset);
      setCount(Math.ceil(response.count / limit));
      setPhotoCards(response.page);
    };
    getData();
  }, [page]);
  return (
    <div className="photo-cards-page">
      <Header />
      <div className="photo-cards-page__contents">
        <div className="photo-cards-page__title">자랑 게시판</div>
        <div className="photo-cards-page__list">
          {photoCards.map((photoCard: PhotoCardType) => (
            <PhotoCard key={photoCard.id} photoCard={photoCard} />
          ))}
        </div>
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
