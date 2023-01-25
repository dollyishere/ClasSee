import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import api, { Lecture } from '../util/api';
import logo from '../assets/logo.png';
// interface Props {}

const LectureCard = () => {
  // dummy data
  const dummyData = [
    {
      id: 1,
      lectureImage: 'lectureImage1.jpg',
      instructor: 'John Doe',
      instructorImage: 'instructorImage1.jpg',
      name: '김친절 선생님과 함께하는 뜨개질',
      takeTime: '2',
      rating: 4.5,
    },
    {
      id: 2,
      lectureImage: 'lectureImage2.jpg',
      instructor: 'Jane Smith',
      instructorImage: 'instructorImage2.jpg',
      name: 'Advanced JavaScript',
      takeTime: '1',
      rating: 4.0,
    },
    {
      id: 3,
      lectureImage: 'lectureImage3.jpg',
      instructor: 'Bob Johnson',
      instructorImage: 'instructorImage3.jpg',
      name: 'Node.js for Beginners',
      takeTime: '3.5',
      rating: 3.5,
    },
  ];
  // 더미 데이터를 useState로 받아서 저장
  const [lectures, setLectures] = useState<Lecture[]>(dummyData);

  return (
    <div className="lecture">
      {/* 강의 하나씩 map으로 돌면서 카드에 적용 */}
      {lectures.map((lecture) => (
        <Link to={`/lectures/${lecture.id}`} className="lecture__card" key={lecture.id}>
          <div className="lecture__backImg">
            <img className="lecture__img" src={logo} alt={lecture.name} />
          </div>
          <div className="lecture__instructorImage">
            <Stack className="lecture__instructorImage--image" direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src={logo} />
            </Stack>
          </div>
          <p className="lecture__name">{lecture.name}</p>
          <div className="lecture__ratingtime">
            <div className="lecture__rating">
              <Rating className="lecture__rating--star" name="read-only" value={lecture.rating} readOnly />
              <p className="lecture__rating--number"> {lecture.rating}</p>
            </div>
            <p className="lecture__time">
              <AvTimerIcon />
              {lecture.takeTime} 시간 소요
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LectureCard;

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
