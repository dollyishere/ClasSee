import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import useReviewApi from '../../viewmodels/LessonDetailViewModel';
import useProfileViewModel from '../../viewmodels/ProfileViewModel';

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
    userNickname: string;
  };
  // forceUpdate: () => void;
}

const ReviewItem: React.FC<Props> = ({ reviews }) => {
  const lessonId = useParams();
  // 작성자 프로필 사진 위해
  const { getProfileImage } = useProfileViewModel();
  const { doDeleteReview, getReviewImage, getReviewData } = useReviewApi();
  // 후기 이미지
  const [reviewImg, setReviewImg] = useState<string>();
  // 작성자 프로필 이미지
  const [userImg, setUserImg] = useState<string>();
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
        // TODO: 컴포넌트 재렌더링
      }
    }
  };
  useEffect(() => {
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
      }
    };
    // 프로필 이미지 받아온다
    const getUserImage = async () => {
      // 사진을 url로 변환
      const userImageUrl = await getProfileImage(reviews.userEmail);
      if (userImageUrl) {
        // 변환한 이미지를 훅에 저장
        setUserImg(userImageUrl);
      }
    };
    getReviewsImage();
    getUserImage();
  }, []);
  return (
    <Box m={2}>
      <ImageListItem>
        <img
          src={reviewImg}
          srcSet={reviewImg}
          alt={reviews.img}
          loading="lazy"
        />
      </ImageListItem>
      <Stack
        className="lesson__teacherImage--image"
        direction="row"
        spacing={2}
      >
        <Avatar alt="Remy Sharp" src={userImg} />
      </Stack>
      <p>{reviews.userNickname}님이 작성하셨습니다</p>
      <form id="modify" action="" method="post" style={{ display: 'none' }}>
        수정
      </form>
      <button type="submit" onClick={handleDeleteReview}>
        삭제
      </button>
      <Rating value={reviews.score} precision={0.5} readOnly />
      {reviews.score !== null && <Box sx={{ ml: 2 }}>{reviews.score}</Box>}
      <Typography>{reviews.content}</Typography>
      <p>
        작성일자: {reviews.year}년 {reviews.month}월 {reviews.day}일
        {reviews.time}
      </p>
    </Box>
  );
};

export default ReviewItem;