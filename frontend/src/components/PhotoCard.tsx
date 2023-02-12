import React, { useEffect, useState } from 'react';
import {
  Delete,
  Favorite,
  FavoriteBorder,
  FormatQuote,
  MoreHoriz,
} from '@mui/icons-material';
import { useRecoilValue } from 'recoil';

import useViewModel from '../viewmodels/PhotoCardsViewModel';
import { PhotoCardProps } from '../types/PhotoCardType';
import useTimeStamp from '../utils/TimeStamp';
import PrivateInfoState from '../models/PrivateInfoAtom';

const PhotoCard = ({
  photoCard,
  back,
  handleDeletePhotoCard,
}: PhotoCardProps) => {
  const { getPhotoCardImage, likePhotoCard, dislikePhotoCard } = useViewModel();
  const [imgSrc, setImgSrc] = useState<string>();
  const { toDateHourMinute } = useTimeStamp();
  const [like, setLike] = useState<boolean>(photoCard.isLiked);
  const userInfo = useRecoilValue(PrivateInfoState);

  const handleLike = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (userInfo) {
      if (like) {
        const response = await dislikePhotoCard(userInfo.email, photoCard.id);
      } else {
        const response = await likePhotoCard(userInfo.email, photoCard.id);
        console.log(response);
      }
      setLike((prev: boolean) => !prev);
    }
  };

  const handleDeleteThisCard = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDeletePhotoCard(photoCard);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getPhotoCardImage(photoCard.img);
      setImgSrc(response);
    };
    getData();
  }, []);

  return (
    <div className="photo-card">
      {userInfo && userInfo.email === photoCard.userEmail ? (
        <div
          className="photo-card__menu"
          role="presentation"
          onClick={handleDeleteThisCard}
        >
          <Delete />
        </div>
      ) : null}
      {back ? (
        <div className="photo-card__back">
          <div className="photo-card__title">{photoCard.title}</div>
          <div className="photo-card__content">
            <FormatQuote className="photo-card__quote photo-card__quote--front" />
            {photoCard.content}
            <FormatQuote className="photo-card__quote" />
          </div>
          <div className="photo-card__nickname">{photoCard.userNickname}</div>
          <div className="photo-card__date">
            {toDateHourMinute(photoCard.regDate)}
          </div>
          <div className="photo-card__lesson">{photoCard.lessonName}</div>
        </div>
      ) : (
        <div className="photo-card__front">
          <div className="photo-card__image">
            <img src={imgSrc} alt={photoCard.title} />
          </div>
          <div className="photo-card__footer">
            <div className="photo-card__footer-left">
              <div className="photo-card__title">{photoCard.title}</div>
              <div className="photo-card__nickname">
                {photoCard.userNickname}
              </div>
            </div>
            <div
              className="photo-card__footer-right"
              role="presentation"
              onClick={handleLike}
            >
              {like ? (
                <Favorite className="photo-card__like" />
              ) : (
                <FavoriteBorder className="photo-card__unlike" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
