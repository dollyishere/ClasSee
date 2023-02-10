import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';

import ReviewList from './ReviewList';
import BasicRating from '../BasicRating';

interface Review {
  text: string;
  rating: number;
}

const ReviewInput: React.FC = () => {
  // 기존 강의의 리뷰 데이터를 받아와서 reviews의 디폴트데이터로 넣어줄 필요있음
  // 사용자명, 작성시간, 이미지첨부, 프로필 사진, 작성 리뷰 수정, 삭제
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [review, setReview] = useState<Review>({ text: '', rating: 0 });
  const [ratingValue, setRatingValue] = useState<number | null>(0);

  const handleSubmit = () => {
    setReviewList([review, ...reviewList]);
    setReview({ text: '', rating: 0 });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, text: event.target.value });
  };

  const handleRatingChange = (
    event: React.ChangeEvent<object>,
    newValue: number | null,
  ) => {
    setReview({ ...review, rating: newValue || 0 });
  };
  const handleRatingValue = (event: any) => {
    setRatingValue(event.target.value);
  };
  return (
    <Box m={2}>
      {/* <Typography variant="h6">Add a Review</Typography> */}
      <TextField
        label="강의에 대한 후기를 남겨주세요"
        value={review.text}
        onChange={handleChange}
        multiline
        fullWidth
      />
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="simple-controlled"
          value={review.rating}
          precision={0.5}
          onChange={handleRatingChange}
          readOnly={false}
        />
        {review.rating !== null && <Box sx={{ ml: 2 }}>{review.rating}</Box>}
      </Box>
      {/* <BasicRating
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        disableValue={false}
      /> */}
      {/* <Rating value={review.rating} onChange={handleRatingChange} /> */}
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        등록
      </Button>
      <ReviewList reviews={reviewList} />
    </Box>
  );
};

export default ReviewInput;

// interface Review {
//   text: string;
//   rating: number;
// }

// const ReviewInput = () => {
//   const [review, setReview] = useState<Review>({ text: '', rating: 0 });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setReview({ ...review, text: event.target.value });
//   };

//   const handleRatingChange = (
//     event: React.ChangeEvent<{}>,
//     newValue: number,
//   ) => {
//     setReview({ ...review, rating: newValue });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Submitting Review: ', review);
//     setReview({ text: '', rating: 0 });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box mb={2}>
//         <Typography variant="h6">Leave a Review</Typography>
//         <Rating
//           name="rating"
//           value={review.rating}
//           onChange={handleRatingChange}
//         />
//       </Box>
//       <TextField
//         label="Write your review"
//         value={review.text}
//         onChange={handleChange}
//         multiline
//         rows={4}
//         fullWidth
//         variant="outlined"
//       />
//       <Button type="submit" color="primary" variant="contained">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default ReviewInput;
