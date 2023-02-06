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
import useViewModel from '../viewmodels/MainPageViewModel';
import privateInfoState from '../models/PrivateInfoAtom';

import logo from '../assets/logo.png';

// type combinetype = { lesson: Lesson; myapplied: MyAppliedHover };
interface Props {
  lesson: Lesson;
}
const MyAppliedTest = ({ lesson }: Props) => {
  const { deleteMyAppliedLessonsMainpage } = useViewModel();

  const [isBookMarked, setIsBookMarked] = useState(lesson.isBookMarked);
  // 북마크 아이콘 클릭 시 북마크 추가, 삭제 토글 버튼 함수
  const getBookmarkStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsBookMarked(!isBookMarked);
  };
  const [isHovered, setIsHovered] = useState(false);
  // 강의 취소 모달 오픈을 위한 flag
  const [modalOpen, setModalOpen] = useState(false);
  // 강의 취소 버튼 클릭 시 모달 팝업을 위한 modalopen flag를 ture로 바꿈
  const userInfo = useRecoilValue(privateInfoState);

  const showModal = () => {
    // setModalOpen(true);
    if (window.confirm('해당 강의를 정말 취소 하시겠습니까?')) {
      if (userInfo) {
        deleteMyAppliedLessonsMainpage(userInfo.email, lesson.lessonId).then(
          (res: string) => {
            console.log('res', res);
          },
        );
      }
      console.log('test');
    }
  };
  return (
    <div
      className="lesson__card"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
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
      <div className="applylessons__schedule">
        <h3>클래스 시작</h3>
        <p> {lesson.startTime}</p>
      </div>
      {isHovered && (
        <div className="applylessons__hover">
          {/* <Link to={`/participant/${lesson.id}`}> */}
          <div className="applylessons__hover--buttons">
            <div>
              <Link to="/lesson/test/student">
                <button
                  className="applylessons__hover--participantbutton"
                  type="button"
                >
                  <p>강의 시작</p>
                </button>
              </Link>
            </div>
            <div>
              <button
                className="applylessons__hover--deletebutton"
                type="button"
                onClick={showModal}
              >
                <p>강의 취소</p>
              </button>
              {/* {} */}
              {/* <ModalTest lessonId={lesson.id} modalOpen={modalOpen} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppliedTest;
