import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LessonCard from '../LessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import PrivateInfoState from '../../models/PrivateInfoAtom';

// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 개설한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyCreatedLessonsMainpage = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     lessonImage: 'lessonImage1.jpg',
  //     teacher: 'jinho',
  //     teacherImage: 'teacherImage1.jpg',
  //     name: '김친절 선생님과 함께하는 뜨개질',
  //     runningTime: '4',
  //     category: '수공예',
  //     rating: 5,
  //     isBookMarked: true,
  //   },
  //   {
  //     id: 2,
  //     lessonImage: 'lessonImage2.jpg',
  //     teacher: 'jinho',
  //     teacherImage: 'teacherImage2.jpg',
  //     name: 'Advanced JavaScript',
  //     runningTime: '3',
  //     category: '뷰티',
  //     rating: 4,
  //     isBookMarked: true,
  //   },
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
  // },
  // ];
  // 내가 개설한 강의 2개 가져오는 함수
  const { getMyCreatedLessonsMainpage } = useViewModel();
  const [lessons, setLessons] = useState<LessonsResponse>();
  const userInfo = useRecoilValue(PrivateInfoState);
  // 메인페이지 마운트 시 강의 정보들 요청

  useEffect(() => {
    if (userInfo.email)
      getMyCreatedLessonsMainpage(userInfo.email).then(
        (res: LessonsResponse) => {
          console.log(res);
          setLessons(res);
        },
      );
  }, []);

  return (
    <div className="createlessons">
      <h1 className="createlessons__title"> 개설한 강의 </h1>
      {lessons && lessons.lessons ? (
        <div className="lesson">
          {lessons.lessons.map((lesson: Lesson) => (
            <LessonCard lesson={lesson} />
          ))}
        </div>
      ) : (
        <div>no Created</div>
      )}
    </div>
  );
};

export default MyCreatedLessonsMainpage;