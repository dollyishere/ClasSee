import React, { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import useViewModel from '../viewmodels/PhotoCardsViewModel';
import { PhotoCardProps } from '../types/PhotoCardType';

const PhotoCard = ({ photoCard }: PhotoCardProps) => {
  const { getPhotoCardImage } = useViewModel();
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      const response = await getPhotoCardImage(photoCard.img);
      setImgSrc(response);
    };
    getData();
  }, []);

  return (
    <div className="photo-card">
      <div className="photo-card__image">
        <img src={imgSrc} alt={photoCard.title} />
      </div>
      <div className="photo-card__footer">
        <div className="photo-card__footer-left">
          <div className="photo-card__title">{photoCard.title}</div>
          <div className="photo-card__nickname">{photoCard.userNickname}</div>
        </div>
        <div className="photo-card__footer-right">
          {photoCard.isLiked ? (
            <Favorite className="photo-card__like" />
          ) : (
            <FavoriteBorder className="photo-card__unlike" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
