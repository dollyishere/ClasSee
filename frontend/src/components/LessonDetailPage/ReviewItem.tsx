import React from 'react';
import { Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

interface Props {
  text: string;
  rating: number;
}

const Review: React.FC<Props> = ({ text, rating }) => {
  return (
    <Box m={2}>
      <Typography>{text}</Typography>
      <Rating value={rating} precision={0.5} readOnly />
      {rating !== null && <Box sx={{ ml: 2 }}>{rating}</Box>}
    </Box>
  );
};

export default Review;
