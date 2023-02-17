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
  const { getRecommandLessons } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);
  useEffect(() => {
    if (userInfo) {
      getRecommandLessons(userInfo.email).then((res: LessonsResponse) => {
        setLessons(res.lessonInfoList);
      });
    } else {
      getRecommandLessons(null).then((res: LessonsResponse) => {
        setLessons(res.lessonInfoList);
      });
    }
  }, []);
  return (
    <div className="recommandlessons">
      <h1 className="recommandlessons__title"> 추천 클래스 </h1>
      {/* 강의 하나씩 map으로 돌면서 카드에 적용 */}
      <div className="recommandlessons__cards">
        {lessons &&
          lessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
          ))}
      </div>
    </div>
  );
};

export default RecommandLessons;
