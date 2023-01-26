import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { api, Lesson } from '../util/api';
import logo from '../assets/logo.png';
// interface Props {}

const LessonCard = () => {
  // dummy data
  const dummyData = [
    {
      id: 1,
      lessonImage: 'lessonImage1.jpg',
      teacher: 'John Doe',
      teacherImage: 'teacherImage1.jpg',
      name: '김친절 선생님과 함께하는 뜨개질',
      takeTime: '2',
      rating: 4.5,
    },
    {
      id: 2,
      lessonImage: 'lessonImage2.jpg',
      teacher: 'Jane Smith',
      teacherImage: 'teacherImage2.jpg',
      name: 'Advanced JavaScript',
      takeTime: '1',
      rating: 4.0,
    },
    {
      id: 3,
      lessonImage: 'lessonImage3.jpg',
      teacher: 'Bob Johnson',
      teacherImage: 'teacherImage3.jpg',
      name: 'Node.js for Beginners',
      takeTime: '3.5',
      rating: 3.5,
    },
  ];
  // 강의 정보를 useState로 받아서 저장
  const [lessons, setlessons] = useState<Lesson[]>(dummyData);
  // 북마크 정보
  const [isBookMarked, setIsBookMarked] = useState(false);
  // 북마크 아이콘 클릭 시 북마크 추가, 삭제 토글 버튼 함수
  const getBookmarkStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsBookMarked(!isBookMarked);
  };
  return (
    <div className="lesson">
      {/* 강의 하나씩 map으로 돌면서 카드에 적용 */}
      {lessons.map((lesson) => (
        <Link
          to={`/lessons/${lesson.id}`}
          className="lesson__card"
          key={lesson.id}
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
                <BookmarkBorderIcon
                  fontSize="large"
                  color="action"
                  className="lesson__bookmark--icon"
                />
              ) : (
                <BookmarkIcon
                  fontSize="large"
                  color="error"
                  className="lesson__bookmark--icon"
                />
              )}
            </button>
          </div>
          {/* 강사 이미지 */}
          <div className="lesson__teacherImage">
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
                value={lesson.rating}
                precision={0.5}
                readOnly
              />
              {/* 별점 숫자 */}
              <p className="lesson__rating--number"> {lesson.rating}</p>
            </div>
            {/* 소요시간 */}
            <p className="lesson__time">
              {/* 소요시간 아이콘 */}
              <AvTimerIcon />
              {/* 소요시간 숫자 */}
              {lesson.takeTime} 시간 소요
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LessonCard;

// DB API로 data 받아올때 코드
// import React, { useEffect, useState } from 'react';
// import api from './api';

// interface Props {}

// const LecturePage: React.FC<Props> = () => {
//   const [lectures, setLectures] = useState<Lecture[]>([]);

//   useEffect(() => {
//     api.getLectures((error, results) => {
//       if (error) throw error;
//       setLectures(results);
//     });
//   }, []);

//   return (
//     <div>
//       {lectures.map((lecture) => (
//         <div key={lecture.id}>
//           <img src={lecture.LectureImage} alt={lecture.name} />
//           <p>teacher: {lecture.teacher}</p>
//           <p>Lecture Name: {lecture.name}</p>
//           <p>Rating: {lecture.rating}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LecturePage;
