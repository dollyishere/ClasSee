import React from 'react';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBox from '../components/LessonsPage/SearchBox';
import LessonCard from '../components/LessonCard';

const LessonsPage = () => {
  const sidebarItems = [
    { name: '전체 강의', path: '/lessons' },
    { name: '공예', path: '/lessons/craft' },
    { name: '드로잉', path: '/lessons/drawing' },
    { name: '음악', path: '/lessons/music' },
    { name: '운동', path: '/lessons/exercise' },
    { name: '요리', path: '/lessons/cooking' },
    { name: '뷰티', path: '/lessons/beauty' },
    { name: '기타', path: '/lessons/etc' },
  ];
  const testData = [
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
    {
      lessonId: 1,
      lessonImage: '',
      teacher: '김싸피',
      teacherImage: '',
      name: '영어교실',
      runningTime: 123,
      category: 'test',
      score: 0,
      isBookMarked: false,
    },
  ];
  return (
    <div className="lessons-page">
      <Header />
      <div className="lessons-page__contents">
        <Sidebar items={sidebarItems} />
        <div className="lessons-page__sub-page">
          <SearchBox />
          <div className="lesson-page__lesson-list">
            {testData.map((data: any) => (
              <div className="lesson-page__lesson-card">
                <LessonCard lesson={data} />
              </div>
            ))}
          </div>
          <div className="lessons-page__pagination">페이지네이션</div>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
