import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewItem from './ReviewItem';

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
  }[];
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <Box m={2}>
      <Typography variant="h6">Reviews</Typography>
      {reviews.map((review) => (
        <ReviewItem
          id={review.id}
          content={review.content}
          score={review.score}
          img={review.img}
          year={review.year}
          month={review.month}
          day={review.day}
          time={review.time}
          userEmail={review.userEmail}
          userNickname={review.userNickname}
        />
      ))}
    </Box>
  );
};

export default ReviewList;
