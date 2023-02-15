import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../utils/Firebase';
import { LessonsResponse, Lesson } from '../types/LessonsType';
import privateInfoState from '../models/PrivateInfoAtom';
import useMainPageViewModel from '../viewmodels/MainPageViewModel';
import useProfileViewModel from '../viewmodels/ProfileViewModel';
import logo from '../assets/logo2.png';

interface Props {
  lesson: Lesson;
}
const LessonCard = ({ lesson }: Props) => {
  const userInfo = useRecoilValue(privateInfoState);
  const { getLessonImage, deleteBookmark, addBookmark } =
    useMainPageViewModel();
  const { getProfileImage } = useProfileViewModel();
  const [lessonImage, setLessonImage] = useState<string>(logo);
  const [teacherImage, setTeacherImage] = useState<string>(logo);
  const [isBookMarked, setIsBookMarked] = useState(lesson.bookMarked);

  // 북마크 아이콘 클릭 시 북마크 추가, 삭제 토글 버튼 함수
  const getBookmarkStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (userInfo) {
      if (isBookMarked) {
        const res = deleteBookmark(userInfo.email, lesson.lessonId);
        setIsBookMarked(false);
      } else {
        const res = addBookmark(userInfo.email, lesson.lessonId);
        setIsBookMarked(true);
      }
    } else {
      window.confirm('로그인 후 사용 가능합니다');
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const lessonImageUrl = await getLessonImage(lesson.lessonId);
      if (lessonImageUrl) {
        setLessonImage(lessonImageUrl);
      }
    };
    const getTeacherImage = async () => {
      const teacherImageUrl = await getProfileImage(lesson.teacherImage);
      if (teacherImageUrl) {
        setTeacherImage(teacherImageUrl);
      }
    };
    getImage();
    getTeacherImage();
  }, []);

  return (
    <div className="lesson">
      <Link
        to={`/lesson/${lesson.lessonId}`}
        className="lesson__card"
        key={lesson.lessonId}
      >
        {/* 강의 대표이미지와 북마크 버튼 담는 div */}
        <div className="lesson__backImg">
          <img className="lesson__img" src={lessonImage} alt={lesson.name} />
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
              <BookmarkIcon
                fontSize="large"
                color="disabled"
                className="lesson__nobookmark--icon"
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
            <Avatar alt="Remy Sharp" src={teacherImage} />
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
              value={Math.round(lesson.score * 10) / 10}
              precision={0.5}
              readOnly
            />
            {/* 별점 숫자 */}
            <p className="lesson__rating--number">
              {Math.round(lesson.score * 10) / 10}
            </p>
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
