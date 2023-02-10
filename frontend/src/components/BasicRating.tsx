import * as React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { RatingProps } from '../types/LessonsType';

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
      <Rating
        name="simple-controlled"
        value={ratingValue}
        precision={0.5}
        onChange={(event: any) => {
          handleRatingValue(event);
        }}
        readOnly={disableValue}
      />
      {ratingValue !== null && <Box sx={{ ml: 2 }}>{ratingValue}</Box>}
    </Box>
  );
};
export default BasicRating;
