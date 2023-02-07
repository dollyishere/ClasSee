import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import MyAppliedLessonCard from '../MyAppliedLessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import privateInfoState from '../../models/PrivateInfoAtom';

// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 신청한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyAppliedLessonsMainpage = () => {
  const { getMyAppliedLessonsMainpage } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);

  useEffect(() => {
    if (userInfo && userInfo.email) {
      getMyAppliedLessonsMainpage(userInfo.email, 2, 0, 'TODO').then(
        (res: LessonsResponse) => {
          console.log('내가 신청한 강의', res.lessonInfoList);
          setLessons(res.lessonInfoList);
        },
      );
    }
  }, []);
  return (
    <div className="applylessons">
      <h1 className="applylessons__title"> 신청한 클래스 </h1>
      <div className="applylessons__cards">
        {lessons ? (
          lessons.map((lesson: Lesson) => (
            <MyAppliedLessonCard lesson={lesson} />
          ))
        ) : (
          <div>no Created</div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedLessonsMainpage;
