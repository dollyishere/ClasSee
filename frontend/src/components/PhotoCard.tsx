import React, { useEffect, useState } from 'react';
import {
  Delete,
  Favorite,
  FavoriteBorder,
  FlareSharp,
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
  handleLike,
}: PhotoCardProps) => {
  const { getPhotoCardImage } = useViewModel();
  const [imgSrc, setImgSrc] = useState<string>();
  const { toDateHourMinute } = useTimeStamp();
  const userInfo = useRecoilValue(PrivateInfoState);

  const handleLikeClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (userInfo) {
      handleLike(photoCard);
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
        <div className="photo-card__menu">
          <div
            className="photo-card__delete"
            role="presentation"
            onClick={handleDeleteThisCard}
          >
            <Delete />
          </div>
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
              onClick={handleLikeClick}
            >
              <div>
                {photoCard.isLiked ? (
                  <Favorite className="photo-card__like" />
                ) : (
                  <FavoriteBorder className="photo-card__unlike" />
                )}
              </div>
              <div className="photo-card__likecount">
                <p className="photo-card__likecount--text">
                  {photoCard.likesCount} Likes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
