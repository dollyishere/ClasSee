import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import useReviewApi from '../../viewmodels/LessonDetailViewModel';
import useProfileViewModel from '../../viewmodels/ProfileViewModel';

interface Props {
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
}

const ReviewItem: React.FC<Props> = ({
  id,
  content,
  score,
  img,
  year,
  month,
  day,
  time,
  userEmail,
  userNickname,
}) => {
  const { getProfileImage } = useProfileViewModel();
  const { doDeleteReview, getReviewImage } = useReviewApi();
  const [reviewImg, setReviewImg] = useState<string>();
  const [userImg, setUserImg] = useState<string>();
  const itemData = {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  };
  const handleDeleteReview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const res = await doDeleteReview(id);
    console.log(res);
  };
  useEffect(() => {
    const getReviewsImage = async () => {
      const reviewImageUrl = await getReviewImage(userEmail);
      if (reviewImageUrl) {
        setReviewImg(reviewImageUrl);
        console.log(reviewImageUrl);
      }
    };
    const getUserImage = async () => {
      const userImageUrl = await getProfileImage(userEmail);
      if (userImageUrl) {
        setUserImg(userImageUrl);
        console.log(userImageUrl);
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
          alt={itemData.title}
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
      <p>{userNickname}님이 작성하셨습니다</p>
      <form action="" method="post">
        수정
      </form>
      <button type="submit" onClick={handleDeleteReview}>
        삭제
      </button>
      <Rating value={score} precision={0.5} readOnly />
      {score !== null && <Box sx={{ ml: 2 }}>{score}</Box>}
      <Typography>{content}</Typography>
      <p>
        작성일자: {year}년 {month}월 {day}일 {time}
      </p>
    </Box>
  );
};

export default ReviewItem;
