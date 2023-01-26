import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { api, bookmark, Lesson } from '../util/api';
import logo from '../assets/logo.png';
// interface Props {}

const LessonCard = () => {
  const [isBookMarked, setIsBookMarked] = useState(null);
  // const bookMark = () => {};
  // dummy data
  const dummyData = [
    {
      id: 1,
      lessonImage: 'lessonImage1.jpg',
      instructor: 'John Doe',
      instructorImage: 'instructorImage1.jpg',
      name: '김친절 선생님과 함께하는 뜨개질',
      takeTime: '2',
      rating: 4.5,
    },
    {
      id: 2,
      lessonImage: 'lessonImage2.jpg',
      instructor: 'Jane Smith',
      instructorImage: 'instructorImage2.jpg',
      name: 'Advanced JavaScript',
      takeTime: '1',
      rating: 4.0,
    },
    {
      id: 3,
      lessonImage: 'lessonImage3.jpg',
      instructor: 'Bob Johnson',
      instructorImage: 'instructorImage3.jpg',
      name: 'Node.js for Beginners',
      takeTime: '3.5',
      rating: 3.5,
    },
  ];
  // 더미 데이터를 useState로 받아서 저장
  const [lessons, setlessons] = useState<Lesson[]>(dummyData);

  return (
    <div className="lesson">
      {/* 강의 하나씩 map으로 돌면서 카드에 적용 */}
      {lessons.map((lesson) => (
        <Link
          to={`/lessons/${lesson.id}`}
          className="lesson__card"
          key={lesson.id}
        >
          <div className="lesson__backImg">
            <img className="lesson__img" src={logo} alt={lesson.name} />
            <div className="lesson__bookmark">
              <BookmarkBorderIcon fontSize="large" color="action" />
              <BookmarkIcon fontSize="large" color="error" />
            </div>
          </div>
          <div className="lesson__instructorImage">
            <Stack
              className="lesson__instructorImage--image"
              direction="row"
              spacing={2}
            >
              <Avatar alt="Remy Sharp" src={logo} />
            </Stack>
          </div>
          <p className="lesson__name">{lesson.name}</p>
          <div className="lesson__ratingtime">
            <div className="lesson__rating">
              <Rating
                className="lesson__rating--star"
                name="half-rating-read"
                value={lesson.rating}
                precision={0.5}
                readOnly
              />
              <p className="lesson__rating--number"> {lesson.rating}</p>
            </div>
            <p className="lesson__time">
              <AvTimerIcon />
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
//           <p>Instructor: {lecture.instructor}</p>
//           <p>Lecture Name: {lecture.name}</p>
//           <p>Rating: {lecture.rating}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LecturePage;
