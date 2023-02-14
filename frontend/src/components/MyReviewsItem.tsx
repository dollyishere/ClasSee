import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

import useProfileViewModel from '../viewmodels/ProfileViewModel';
import useLessonViewModel from '../viewmodels/LessonDetailViewModel';
import useTimeStamp from '../utils/TimeStamp';

interface Props {
  myreview: {
    id: number;
    content: string;
    img: string;
    regtime: string;
    lessonId: number;
    lessonName: string;
    score: number;
    userEmail: string;
    userImg: number | null;
    userNickname: string;
  };
  // forceUpdate: () => void;
}
const MyReviewsItem: React.FC<Props> = ({ myreview }) => {
  const { toDateHourMinute } = useTimeStamp();
  const [profileImg, setProfileImg] = useState<string>('');
  const [reviewImg, setReviewImg] = useState<string>('');
  const { getReviewImage, doDeleteReview } = useLessonViewModel();
  const { getProfileImage } = useProfileViewModel();
  const handleDeleteReview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 삭제확인 컨펌창 팝업
    if (window.confirm('리뷰를 삭제 하시겠습니까?')) {
      // 리뷰삭제 요청
      const res = await doDeleteReview(myreview.id);
      // 삭제 성공 시
      if (res?.message === 'success') {
        // TODO: 컴포넌트 재렌더링
      }
    }
  };
  useEffect(() => {
    const getProfileImg = async () => {
      const profileImageUrl = await getProfileImage(myreview.userEmail);
      setProfileImg(profileImageUrl);
    };
    const getReviewImg = async () => {
      const reviewImageUrl = await getReviewImage(
        Number(myreview.lessonId),
        myreview.userEmail,
      );
      if (reviewImageUrl) {
        setReviewImg(reviewImageUrl);
      }
    };
    getProfileImg();
    getReviewImg();
  }, [getProfileImage, getReviewImage]);
  return (
    <div className="my-reviewitem-page">
      <div>
        <img src={reviewImg} alt="reviewImg" />
      </div>
      <Stack
        className="my-reviewitem-page__profile"
        direction="row"
        spacing={2}
      >
        <Avatar
          className="my-reviewitem-page__profile--img"
          alt="Remy Sharp"
          src={profileImg}
        />
      </Stack>
      <div>
        <h5>{myreview.lessonName}</h5>
      </div>
      <form id="modify" action="" method="post" style={{ display: 'none' }}>
        수정
      </form>
      <button type="submit" onClick={handleDeleteReview}>
        삭제
      </button>
      <Rating value={myreview.score} precision={0.5} readOnly />
      {myreview.score !== null && <Box sx={{ ml: 2 }}>{myreview.score}</Box>}
      <Typography>{myreview.content}</Typography>
      <p>작성일자: {toDateHourMinute(myreview.regtime)}</p>
    </div>
  );
};
export default MyReviewsItem;
