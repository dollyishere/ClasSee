import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';
import ReviewList from './ReviewList';
import BasicRating from '../BasicRating';
import privateInfoState from '../../models/PrivateInfoAtom';
import useReviewApi from '../../viewmodels/LessonDetailViewModel';
import { ReviewRequest } from '../../types/LessonsType';

interface Review {
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

const ReviewInput: React.FC = () => {
  const { doCreateReview, getReviewData, uploadReviewImage } = useReviewApi();
  const userInfo = useRecoilValue(privateInfoState);
  const lessonId = useParams();
  const [reviewImg, setReviewImg] = useState<File>();
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [review, setReview] = useState<Review>({
    id: 0,
    content: '',
    score: 0,
    img: '',
    year: '',
    month: '',
    day: '',
    time: '',
    userEmail: '',
    userNickname: '',
  });
  const [ratingValue, setRatingValue] = useState<number | null>(0);

  const createReviewRequestBody: ReviewRequest = {
    content: review.content as string,
    img: review.img as string,
    lessonId: Number(lessonId.lessonId) as number,
    score: review.score as number,
    userEmail: userInfo?.email as string,
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const res = await doCreateReview(createReviewRequestBody);
    if (res?.message === 'success') {
      setReviewList([review, ...reviewList]);
      setReview({
        id: 0,
        content: '',
        score: 0,
        img: '',
        year: '',
        month: '',
        day: '',
        time: '',
        userEmail: '',
        userNickname: '',
      });
      if (reviewImg) {
        await uploadReviewImage(reviewImg);
      }
    } else {
      alert('리뷰는 한번만 작성 가능합니다');
      setReview({
        id: 0,
        content: '',
        score: 0,
        img: '',
        year: '',
        month: '',
        day: '',
        time: '',
        userEmail: '',
        userNickname: '',
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, content: event.target.value });
  };

  const handleRatingChange = (
    event: React.ChangeEvent<object>,
    newValue: number | null,
  ) => {
    setReview({ ...review, score: newValue || 0 });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const inputImage = event.target.files[0];
      console.log(inputImage);
      setReview({ ...review, img: inputImage.name });
      setReviewImg(inputImage);
    }
    // if (inputImage.files && inputImage.files[0]) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setReview({ ...review, image: e.target?.result as string });
    //     console.log(review);
    //   };
    //   reader.readAsDataURL(inputImage.files[0]);
    // }
  };
  useEffect(() => {
    const handleReviewData = async () => {
      if (userInfo) {
        const reviewData = await getReviewData(
          Number(lessonId.lessonId),
          10,
          0,
        );
        if (reviewData) {
          setReviewList(reviewData.data.page);
          console.log(reviewData.data.page);
        }
      }
    };
    handleReviewData();
  }, []);
  return (
    <Box m={2}>
      {/* <Typography variant="h6">Add a Review</Typography> */}
      <TextField
        label="강의에 대한 후기를 남겨주세요"
        value={review.content}
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
          value={review.score}
          precision={0.5}
          onChange={handleRatingChange}
          readOnly={false}
        />
        {review.score !== null && <Box sx={{ ml: 2 }}>{review.score}</Box>}
      </Box>
      <label className="input-file-button" htmlFor="input-file">
        사진 업로드
        <input
          type="file"
          name="후기사진"
          accept="image/*"
          id="input-file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </label>
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        등록
      </Button>
      <ReviewList reviews={reviewList} />
    </Box>
  );
};

export default ReviewInput;
