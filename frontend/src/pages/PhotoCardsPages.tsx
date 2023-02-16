import React, { useEffect, useState } from 'react';
import { Modal, Pagination } from '@mui/material';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import Header from '../components/Header';
import PhotoCard from '../components/PhotoCard';
import { PhotoCardType } from '../types/PhotoCardType';
import useViewModel from '../viewmodels/PhotoCardsViewModel';
import PrivateInfoState from '../models/PrivateInfoAtom';

const PhotoCardsPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [photoCards, setPhotoCards] = useState<Array<PhotoCardType>>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showBack, setShowBack] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<PhotoCardType>();
  const [reRender, setReRender] = useState<boolean>(false);
  const userInfo = useRecoilValue(PrivateInfoState);
  const { getPhotoCards, deletePhotoCard, dislikePhotoCard, likePhotoCard } =
    useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const getData = async () => {
    const limit = 10;
    const offset = (page - 1) * limit;
    if (userInfo) {
      const response = await getPhotoCards(userInfo.email, limit, offset);
      setPhotoCards([...response.page]);
      setCount(Math.ceil(response.count / limit));
    } else {
      const response = await getPhotoCards(null, limit, offset);
      setPhotoCards([...response.page]);
      setCount(Math.ceil(response.count / limit));
    }
    setReRender((prev: boolean) => !prev);
  };
  const handleLike = async (photoCard: PhotoCardType) => {
    if (userInfo !== null) {
      if (photoCard.isLiked) {
        if (photoCard === selectedCard) {
          setSelectedCard({
            ...selectedCard,
            isLiked: false,
            likesCount: selectedCard.likesCount - 1,
          });
        }
        await dislikePhotoCard(userInfo.email, photoCard.id);
      } else {
        if (photoCard === selectedCard) {
          setSelectedCard({
            ...selectedCard,
            isLiked: true,
            likesCount: selectedCard.likesCount + 1,
          });
        }
        await likePhotoCard(userInfo.email, photoCard.id);
      }
      getData();
    }
  };

  const handleIsFocusedTrue = (idx: number) => {
    setSelectedCard(photoCards[idx]);
    setIsFocused(true);
  };
  const handleIsFocusedFalse = () => {
    setSelectedCard(undefined);
    setShowBack(false);
    setIsFocused(false);
  };

  const handleDeletePhotoCard = async (photoCard: PhotoCardType) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const response = await deletePhotoCard(photoCard.id);
      if (response.statusCode === 200) {
        const newPhotoCards = photoCards;
        const index = newPhotoCards.indexOf(photoCard);
        if (index > -1) {
          newPhotoCards.splice(index, 1);
          setPhotoCards([...newPhotoCards]);
        }
        handleIsFocusedFalse();
      }
    }
  };

  useEffect(() => {
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
              <PhotoCard
                photoCard={photoCard}
                back={false}
                handleDeletePhotoCard={handleDeletePhotoCard}
                handleLike={handleLike}
              />
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
            <PhotoCard
              photoCard={selectedCard}
              back={showBack}
              handleDeletePhotoCard={handleDeletePhotoCard}
              handleLike={handleLike}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default PhotoCardsPage;
