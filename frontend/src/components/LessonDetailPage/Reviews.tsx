import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface Props {
  text: string;
  rating: number;
}

const Review: React.FC<Props> = ({ text, rating }) => {
  return (
    <Box m={2}>
      <Typography>{text}</Typography>
      <Typography>Rating: {rating}</Typography>
    </Box>
  );
};

export default Review;
