import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: { text: string; rating: number }[];
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <Box m={2}>
      <Typography variant="h6">Reviews</Typography>
      {reviews.map((review) => (
        <ReviewItem text={review.text} rating={review.rating} />
      ))}
    </Box>
  );
};

export default ReviewList;
