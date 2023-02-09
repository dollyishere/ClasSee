import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LessonCard from '../LessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import privateInfoState from '../../models/PrivateInfoAtom';

const RecommandLessons = () => {
  // dummy data
  // const dummyData = [
  //   {
  //     lessonId: 1,
  //     lessonImage: 'lessonImage1.jpg',
  //     teacher: 'John Doe',
  //     teacherImage: 'teacherImage1.jpg',
  //     name: '김친절 선생님과 함께하는 뜨개질',
  //     runningTime: '2',
  //     category: '수공예',
  //     score: 4.5,
  //     isBookMarked: true,
  //   },
  //   {
  //     lessonId: 2,
  //     lessonImage: 'lessonImage2.jpg',
  //     teacher: 'Jane Smith',
  //     teacherImage: 'teacherImage2.jpg',
  //     name: 'Advanced JavaScript',
  //     runningTime: '1',
  //     category: '수공예',
  //     score: 4.0,
  //     isBookMarked: true,
  //   },
  //   {
  //     lessonId: 3,
  //     lessonImage: 'lessonImage3.jpg',
  //     teacher: 'Bob Johnson',
  //     teacherImage: 'teacherImage3.jpg',
  //     name: 'Node.js for Beginners',
  //     runningTime: '3.5',
  //     category: '수공예',
  //     score: 3.5,
  //     isBookMarked: false,
  //   },
  // ];
  const { getRecommandLessons } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);
  useEffect(() => {
    getRecommandLessons().then((res: LessonsResponse) => {
      console.log('추천강의', res.lessonInfoList);
      setLessons(res.lessonInfoList);
    });
  }, []);
  // 강의 정보를 useState로 받아서 저장
  // const [lessons, setlessons] = useState([]);
  return (
    <div className="recommandlessons">
      <h1 className="recommandlessons__title"> 추천 클래스 </h1>
      {/* 강의 하나씩 map으로 돌면서 카드에 적용 */}
      <div className="recommandlessons__cards">
        {lessons && lessons.map((lesson) => <LessonCard lesson={lesson} />)}
      </div>
    </div>
  );
};

export default RecommandLessons;

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
//           <p>score: {lecture.score}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LecturePage;