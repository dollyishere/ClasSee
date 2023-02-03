import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LessonCardTest from '../LessonCardTest';
import MyAppliedTest from '../MyAppliedLessonCardTest';
import useViewModel from '../../viewmodels/MainPageViewModel';
import {
  LessonsResponse,
  Lesson,
  MyAppliedHover,
} from '../../types/LessonsType';
import PrivateInfoState from '../../models/PrivateInfoAtom';
// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 신청한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
// interface MyApply {
//   hover: number;
// }

const MyAppliedLessonsMainpageTest = () => {
  const dummyData = [
    {
      id: 1,
      lessonImage: 'lessonImage1.jpg',
      teacher: 'jinho',
      teacherImage: 'teacherImage1.jpg',
      name: '김친절 선생님과 함께하는 뜨개질',
      runningTime: '4',
      category: '수공예',
      rating: 5,
      isBookMarked: true,
      startTime: '2023-01-31 11:00',
      endTime: '2023-02-02',
    },
    {
      id: 2,
      lessonImage: 'lessonImage2.jpg',
      teacher: 'jinho',
      teacherImage: 'teacherImage2.jpg',
      name: 'Advanced JavaScript',
      runningTime: '3',
      category: '뷰티',
      rating: 4,
      isBookMarked: true,
      startTime: '2023-01-31 14:00',
      endTime: '2023-02-02',
    },
    // {
    //   id: 3,
    //   lessonImage: 'lessonImage3.jpg',
    //   teacher: 'jinho',
    //   teacherImage: 'teacherImage3.jpg',
    //   name: 'Node.js for Beginners',
    //   runningTime: '3.5',
    //   category: '요리',
    //   rating: 3.5,
    //   isBookMarked: false,
    // },
    // {
    //   id: 4,
    //   lessonImage: 'lessonImage3.jpg',
    //   teacher: 'jinho',
    //   teacherImage: 'teacherImage3.jpg',
    //   name: 'React for Beginners',
    //   runningTime: '1',
    //   category: '프로그래밍',
    //   rating: 3,
    //   isBookMarked: false,
  ];
  // const { getMyAppliedLessonsMainpage } = useViewModel();
  // const [lessons, setLessons] = useState<LessonsResponse>();
  const [lessons, setLessons] = useState(dummyData);
  const userInfo = useRecoilValue(PrivateInfoState);
  const [myapplied, setmyapplied] = useState<boolean>(true);
  // useEffect(() => {
  //   if (userInfo.userId)
  //     getMyAppliedLessonsMainpage(userInfo.userId).then(
  //       (res: LessonsResponse) => {
  //         console.log(res);
  //         setLessons(res);
  //       },
  //     );
  // }, []);
  return (
    <div className="applylessons">
      <h1 className="applylessons__title"> 신청한 클래스 </h1>
      <div className="applylessons__cards">
        {lessons ? (
          lessons.map((lesson: Lesson) => <MyAppliedTest lesson={lesson} />)
        ) : (
          <div>no Created</div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedLessonsMainpageTest;
