import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  TextField,
  Button,
  Box,
  Typography,
  Rating,
  Pagination,
} from '@mui/material';
import ReviewItem from './ReviewItem';
import BasicRating from '../BasicRating';
import privateInfoState from '../../models/PrivateInfoAtom';
import useReviewApi from '../../viewmodels/LessonDetailViewModel';
import { ReviewRequest } from '../../types/LessonsType';

// 응답받아 넘어오는 후기의 타입 명시
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
  userImg: string;
  userNickname: string;
}

const ReviewInput: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const userInfo = useRecoilValue(privateInfoState);
  const lessonId = useParams();
  const {
    doCreateReview,
    getReviewData,
    uploadReviewImage,
    getReviewImage,
    doDeleteReview,
  } = useReviewApi();
  // 후기들의 총 갯수 count
  const [count, setCount] = useState<number>(0);
  // 페이지네이션을 위한 page 넘버
  const [page, setPage] = useState<number>(1);
  // 리뷰 이미지
  const [reviewImg, setReviewImg] = useState<File>();
  const [reviewImgUrl, setReviewImgUrl] = useState<string | undefined>('');
  // 작성자 프로필 이미지
  const [userImg, setUserImg] = useState<string>();
  // 리뷰 리스트
  const [reviewList, setReviewList] = useState<Review[]>([]);
  // 리뷰 낱개
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
    userImg: '',
    userNickname: '',
  });
  // 리뷰 작성 시 넘기는 데이터 타입 명시
  const createReviewRequestBody: ReviewRequest = {
    content: review.content as string,
    img: review.img as string,
    lessonId: Number(lessonId.lessonId) as number,
    score: review.score as number,
    userEmail: userInfo?.email as string,
  };
  // 등록 버튼 클릭 시
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 작성 데이터를 body에 담아 작성 요청
    const res = await doCreateReview(createReviewRequestBody);
    if (res?.message === 'success') {
      // 이미지 등록 시
      if (reviewImg && userInfo) {
        // 파이어베이스에 후기 이미지 저장
        await uploadReviewImage(Number(lessonId.lessonId), reviewImg);
        const getReviewsImage = async () => {
          // 사진을 url로 변환
          const reviewImageUrl = await getReviewImage(
            Number(lessonId.lessonId),
            userInfo.email,
          );
          if (reviewImageUrl) {
            // 변환한 이미지를 훅에 저장
            setReviewImgUrl(reviewImageUrl);
          }
          getReviewsImage();
        };
      }
      // 방금 작성한 리뷰 받아오기
      const response = await getReviewData(Number(lessonId.lessonId), 1, 0);
      console.log('방금작성한 리뷰', response);
      // 작성된 리뷰 데이터
      const inputReview = response?.data.page[0];
      // TODO: 새로 작성한 리뷰가 setReviewList에 의해 리뷰리스트 최신화되기전에(재렌더링이 됨) 사진을 파이어베이스에서 받아와서 보여줘야함
      setReviewList([inputReview, ...reviewList]);
      // 초기화
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
        userImg: '',
        userNickname: '',
      });
    } else {
      // 중복 시 alert
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
        userImg: '',
        userNickname: '',
      });
    }
  };
  // 후기 내용 작성 handle
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, content: event.target.value });
  };
  // 별점 등록 handle
  const handleRatingChange = (
    event: React.ChangeEvent<object>,
    newValue: number | null,
  ) => {
    setReview({ ...review, score: newValue || 0 });
  };
  // 후기 이미지 작성
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const inputImage = event.target.files[0];
      console.log(inputImage);
      setReview({ ...review, img: inputImage.name });
      setReviewImg(inputImage);
    }
  };
  // 페이지네이션 handle
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  // 후기 데이터 받아오기
  const handleReviewData = async () => {
    // 한 페이지 당 후기 갯수 limit
    const limit = 10;
    // 각 페이지의 리뷰 시작 넘버 offset
    const offset = (page - 1) * limit;
    // 리뷰 데이터 요청
    const reviewData = await getReviewData(
      Number(lessonId.lessonId),
      limit,
      offset,
    );
    if (reviewData && reviewData.data.count !== undefined) {
      setCount(Math.ceil(reviewData.data.count / limit));
      setReviewList(reviewData.data.page);
    }
  };
  useEffect(() => {
    handleReviewData();
    console.log(reviewList);
  }, [page, flag]);
  return (
    <Box m={2}>
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
      <br />
      <Typography variant="h6">후기</Typography>

      {reviewList.map((reviews) => (
        <ReviewItem reviews={reviews} flag={flag} setFlag={setFlag} />
        // <ReviewItem reviews={reviews} forceUpdate={forceUpdate} />
      ))}
      <div className="lessons-page__pagination">
        <Pagination
          variant="outlined"
          count={count}
          page={page}
          shape="rounded"
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </Box>
  );
};

export default ReviewInput;
