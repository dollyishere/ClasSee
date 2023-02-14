import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardMedia, CardContent, Modal } from '@mui/material';
import { DeleteForever, BorderColor } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useRecoilValue } from 'recoil';
import useTimeStamp from '../../utils/TimeStamp';
import useProfileViewModel from '../../viewmodels/ProfileViewModel';
import useReviewViewModel from '../../viewmodels/ReviewViewModel';
import PrivateInfoState from '../../models/PrivateInfoAtom';

const ReviewItem = ({ review, handleDeleteReview }: any) => {
  const { toDate } = useTimeStamp();
  const userInfo = useRecoilValue(PrivateInfoState);
  // 작성자 프로필 사진 위해
  const { getProfileImage } = useProfileViewModel();
  const { getReviewImage } = useReviewViewModel();
  // 후기 이미지
  const [reviewImg, setReviewImg] = useState<string>('');
  // 작성자 프로필 이미지
  const [userImg, setUserImg] = useState<string>('');

  useEffect(() => {
    // 프로필 이미지 받아온다
    const getImage = async () => {
      // 사진을 url로 변환
      if (review.userImg) {
        const userImageUrl = await getProfileImage(review.userImg);
        if (userImageUrl) {
          // 변환한 이미지를 훅에 저장
          setUserImg(userImageUrl);
        }
      }
      if (review.img) {
        const reviewImgUrl = await getReviewImage(review.img);
        if (reviewImgUrl) {
          setReviewImg(reviewImgUrl);
        }
      }
    };
    getImage();
  }, []);
  return (
    <Card className="review-card">
      <CardMedia
        className="review-card__image"
        image={reviewImg}
        title={reviewImg}
      />
      <CardContent className="review-card__content">
        <div className="review-card__row">
          <Avatar alt="Remy Sharp" src={userImg} />
          <p>
            <span>{review.userNickname}</span>님이 작성하셨습니다.
          </p>
          {userInfo !== null && userInfo.email === review.userEmail ? (
            <div className="review-card__buttons">
              <button
                type="button"
                className="review-card__button"
                onClick={() => handleDeleteReview(review.id, review.img)}
              >
                <DeleteForever className="review-card__icon" />
              </button>
            </div>
          ) : null}
        </div>
        <div className="review-card__row">
          <Rating value={review.score} precision={0.5} readOnly />
          <div className="review-card__rating">{review.score}</div>
        </div>
        <div className="review-card__row">
          <div className="review-card__detail">{review.content}</div>
        </div>
        <div className="review-card__row review-card__footer">
          작성일자: {toDate(review.regtime)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
