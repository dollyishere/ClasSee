import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { LessonsResponse, Lesson } from '../types/LessonsType';
import privateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/MainPageViewModel';

import logo from '../assets/logo.png';

// type combinetype = { lesson: Lesson; myapplied: MyAppliedHover };
interface Props {
  lesson: Lesson;
}
const LessonCard = ({ lesson }: Props) => {
  const [isBookMarked, setIsBookMarked] = useState(lesson.isBookMarked);
  const userInfo = useRecoilValue(privateInfoState);

  const { deleteBookmark, addBookmark } = useViewModel();
  // 북마크 아이콘 클릭 시 북마크 추가, 삭제 토글 버튼 함수
  const getBookmarkStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (userInfo) {
      if (isBookMarked) {
        deleteBookmark(userInfo.email, lesson.lessonId);
      } else {
        addBookmark(userInfo.email, lesson.lessonId);
      }
    } else {
      window.confirm('로그인 후 사용 가능합니다');
    }
  };
  return (
    <div className="lesson">
      <Link
        to={`/lesson/${lesson.lessonId}`}
        className="lesson__card"
        key={lesson.lessonId}
      >
        {/* 강의 대표이미지와 북마크 버튼 담는 div */}
        <div className="lesson__backImg">
          <img className="lesson__img" src={logo} alt={lesson.name} />
          {/* 북마크 버튼 클릭 시 true, false 값변경으로 아이콘 변경 */}
          <button
            type="button"
            onClick={getBookmarkStatus}
            className="lesson__bookmark"
          >
            {isBookMarked ? (
              <BookmarkIcon
                fontSize="large"
                color="error"
                className="lesson__bookmark--icon"
              />
            ) : (
              <BookmarkBorderIcon
                fontSize="large"
                color="action"
                className="lesson__bookmark--icon"
              />
            )}
          </button>
        </div>
        {/* 카테고리, 강사 이미지 */}
        <div className="lesson__categoryteacherImage">
          <div className="lesson__category">
            <p className="lesson__category--text">{lesson.category}</p>
          </div>
          <Stack
            className="lesson__teacherImage--image"
            direction="row"
            spacing={2}
          >
            <Avatar alt="Remy Sharp" src={logo} />
          </Stack>
        </div>
        {/* 강의명 */}
        <p className="lesson__name">{lesson.name}</p>
        {/* 강의 소요시간 */}
        <div className="lesson__ratingtime">
          {/* 강의 평점 */}
          <div className="lesson__rating">
            {/* 별 아이콘 0.5점 단위 */}
            <Rating
              className="lesson__rating--star"
              name="half-rating-read"
              value={lesson.score}
              precision={0.5}
              readOnly
            />
            {/* 별점 숫자 */}
            <p className="lesson__rating--number"> {lesson.score}</p>
          </div>
          {/* 소요시간 */}
          <p className="lesson__time">
            {/* 소요시간 아이콘 */}
            <AvTimerIcon />
            {/* 소요시간 숫자 */}
            {lesson.runningTime} 시간 소요
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
