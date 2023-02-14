import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardMedia, CardContent, Modal } from '@mui/material';
import { DeleteForever, BorderColor } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useRecoilValue } from 'recoil';
import useProfileViewModel from '../../viewmodels/ProfileViewModel';
import PrivateInfoState from '../../models/PrivateInfoAtom';

interface Props {
  reviews: {
    id: number;
    content: string;
    score: number;
    img: string;
    year: string;
    month: string;
    day: string;
    time: string;
    userEmail: string;
    userImg: string | undefined;
    userNickname: string;
  };
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
}

const ReviewItem: React.FC<Props> = ({ reviews, flag, setFlag }) => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const lessonId = useParams();
  // 작성자 프로필 사진 위해
  const { getProfileImage } = useProfileViewModel();
  // 후기 이미지
  const [reviewImg, setReviewImg] = useState<string>('');
  // 작성자 프로필 이미지
  const [userImg, setUserImg] = useState<string>('');

  const handleUpdateReivew = () => {
    console.log('test');
  };
  // 후기 삭제 버튼 클릭 시

  useEffect(() => {
    console.log('무한?');
    // 렌더링 시 리뷰 사진을 받아온다

    // 프로필 이미지 받아온다
    const getUserImage = async () => {
      // 사진을 url로 변환
      if (reviews.userImg) {
        const userImageUrl = await getProfileImage(reviews.userImg);
        if (userImageUrl) {
          // 변환한 이미지를 훅에 저장
          setUserImg(userImageUrl);
          setFlag(!flag);
        }
      }
    };
    getUserImage();
  }, [reviewImg, userImg]);
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
            <span>{reviews.userNickname}</span>님이 작성하셨습니다.
          </p>
          {userInfo !== null && userInfo.email === reviews.userEmail ? (
            <div className="review-card__buttons">
              <button
                type="button"
                className="review-card__button"
                onClick={handleUpdateReivew}
              >
                <BorderColor className="review-card__icon" />
              </button>
              <button
                type="button"
                className="review-card__button"
                // onClick={handleDeleteReview}
              >
                <DeleteForever className="review-card__icon" />
              </button>
            </div>
          ) : null}
        </div>
        <div className="review-card__row">
          <Rating value={reviews.score} precision={0.5} readOnly />
          <div className="review-card__rating">{reviews.score}</div>
        </div>
        <div className="review-card__row">
          <div className="review-card__detail">{reviews.content}</div>
        </div>
        <div className="review-card__row review-card__footer">
          작성일자: {reviews.year}년 {reviews.month}월 {reviews.day}일
          {reviews.time}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;