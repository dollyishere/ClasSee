import * as React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { RatingProps } from '../types/LessonDetailType';

const BasicRating = ({
  ratingValue,
  setRatingValue,
  disableValue,
}: RatingProps) => {
  const handleRatingValue = (event: any) => {
    if (!disableValue) {
      setRatingValue(event.target.value);
    }
  };
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={ratingValue}
        precision={0.5}
        onChange={(event: any) => {
          handleRatingValue(event);
        }}
        disabled={disableValue}
      />
      {ratingValue !== null && <Box sx={{ ml: 2 }}>{ratingValue}</Box>}
    </Box>
  );
};
export default BasicRating;
