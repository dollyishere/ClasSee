import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

interface Review {
  text: string;
  rating: number;
}

const ReviewInput = () => {
  const [review, setReview] = useState<Review>({ text: '', rating: 0 });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, text: event.target.value });
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ) => {
    setReview({ ...review, rating: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting Review: ', review);
    setReview({ text: '', rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Typography variant="h6">Leave a Review</Typography>
        <Rating
          name="rating"
          value={review.rating}
          onChange={handleRatingChange}
        />
      </Box>
      <TextField
        label="Write your review"
        value={review.text}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default ReviewInput;
