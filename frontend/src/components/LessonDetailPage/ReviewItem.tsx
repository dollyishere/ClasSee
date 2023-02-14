import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import { useRecoilValue } from 'recoil';
import useReviewApi from '../../viewmodels/LessonDetailViewModel';
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
  const { doDeleteReview, getReviewImage, getReviewData } = useReviewApi();
  // 후기 이미지
  const [reviewImg, setReviewImg] = useState<string>('');
  // 작성자 프로필 이미지
  const [userImg, setUserImg] = useState<string>('');
  // 후기 삭제 버튼 클릭 시
  const handleDeleteReview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 삭제확인 컨펌창 팝업
    if (window.confirm('리뷰를 삭제 하시겠습니까?')) {
      // 리뷰삭제 요청
      const res = await doDeleteReview(reviews.id);
      // 삭제 성공 시
      if (res?.message === 'success') {
        setReviewImg('');
        setUserImg('');
        setFlag(!flag);
      }
    }
  };
  useEffect(() => {
    console.log('무한?');
    // 렌더링 시 리뷰 사진을 받아온다
    const getReviewsImage = async () => {
      // 사진을 url로 변환
      const reviewImageUrl = await getReviewImage(
        Number(lessonId.lessonId),
        reviews.userEmail,
      );
      if (reviewImageUrl) {
        // 변환한 이미지를 훅에 저장
        setReviewImg(reviewImageUrl);
        setFlag(!flag);
      }
    };
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
    getReviewsImage();
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
              <button type="button">수정</button>
              <button type="button">삭제</button>
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
