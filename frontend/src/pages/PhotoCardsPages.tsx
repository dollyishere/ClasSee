import React, { useEffect, useState } from 'react';
import { Modal, Pagination } from '@mui/material';

import Header from '../components/Header';
import PhotoCard from '../components/PhotoCard';
import { PhotoCardType } from '../types/PhotoCardType';
import useViewModel from '../viewmodels/PhotoCardsViewModel';

const PhotoCardsPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [photoCards, setPhotoCards] = useState<Array<PhotoCardType>>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showBack, setShowBack] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhotoCardType>();

  const { getPhotoCards } = useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleIsFocusedTrue = (idx: number) => {
    setSelectedCard(photoCards[idx]);
    setIsFocused(true);
  };
  const handleIsFocusedFalse = () => {
    setShowBack(false);
    setIsFocused(false);
  };

  useEffect(() => {
    const getData = async () => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const response = await getPhotoCards('', limit, offset);
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
          {photoCards.map((photoCard: PhotoCardType, i: number) => (
            <div
              role="presentation"
              key={photoCard.id}
              className="photo-cards-page__card"
              onClick={() => handleIsFocusedTrue(i)}
            >
              <PhotoCard photoCard={photoCard} back={false} />
            </div>
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
      {isFocused && selectedCard !== undefined ? (
        <Modal open={isFocused} onClose={handleIsFocusedFalse}>
          <div
            role="presentation"
            className="photo-cards-page__modal"
            onClick={() => setShowBack((prev: boolean) => !prev)}
          >
            <PhotoCard photoCard={selectedCard} back={showBack} />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default PhotoCardsPage;
