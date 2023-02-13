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
import useMainPageViewModel from '../viewmodels/MainPageViewModel';
import useProfileViewModel from '../viewmodels/ProfileViewModel';
import privateInfoState from '../models/PrivateInfoAtom';
import logo from '../assets/logo2.png';

interface Props {
  lesson: Lesson;
}
const MyAppliedLessonCard = ({ lesson }: Props) => {
  const { deleteMyAppliedLessonsMainpage, getLessonImage } =
    useMainPageViewModel();
  const { getProfileImage } = useProfileViewModel();

  const [lessonImage, setLessonImage] = useState<string>(logo);
  const [teacherImage, setTeacherImage] = useState<string>(logo);
  const [isBookMarked, setIsBookMarked] = useState(lesson.bookMarked);

  const [isHovered, setIsHovered] = useState(false);
  const userInfo = useRecoilValue(privateInfoState);

  const showModal = () => {
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

  const handleStartLesson = () => {
    window.open(
      `/lesson/${lesson.openLessonId}/student`,
      '강의',
      `height=${window.screen.height}, width=${window.screen.width}, fullscreen=yes, status=no, scrollbars=no`,
    );
  };

  useEffect(() => {
    console.log(lesson);
    const getImage = async () => {
      const lessonImageUrl = await getLessonImage(lesson.lessonId);
      const teacherImageUrl = await getProfileImage(lesson.teacher);
      if (lessonImageUrl) {
        setLessonImage(lessonImageUrl);
      }
      if (teacherImageUrl) {
        setTeacherImage(teacherImageUrl);
      }
    };
    getImage();
  });
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
        <button type="button" className="lesson__bookmark">
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
            value={Math.round(lesson.score * 10) / 10}
            precision={0.5}
            readOnly
          />
          {/* 별점 숫자 */}
          <p className="lesson__rating--number">
            {' '}
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
      <div className="applylessons__schedule">
        <h3>클래스 시작</h3>
        <p> {lesson.startTime}</p>
      </div>
      {isHovered && (
        <div className="applylessons__hover">
          {/* <Link to={`/participant/${lesson.id}`}> */}
          <div className="applylessons__hover--buttons">
            <div>
              <button
                className="applylessons__hover--participantbutton"
                type="button"
                onClick={handleStartLesson}
              >
                <p>강의 시작</p>
              </button>
            </div>
            <div>
              <button
                className="applylessons__hover--deletebutton"
                type="button"
                onClick={showModal}
              >
                <p>강의 취소</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppliedLessonCard;
