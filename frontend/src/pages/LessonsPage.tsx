import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBox from '../components/LessonsPage/SearchBox';
import useViewModel from '../viewmodels/LessonsViewModel';
import {
  Lesson,
  LessonSearchOption,
  SearchResponse,
} from '../types/LessonsType';
import LessonCard from '../components/LessonCard';

const LessonsPage = () => {
  // 뷰 모델
  const { searchLessons } = useViewModel();

  // 카테고리를 알기 위한 location
  const location = useLocation();
  let initialCategory;
  switch (location.pathname.split('/')[2]) {
    case 'craft':
      initialCategory = '공예';
      break;
    case 'drawing':
      initialCategory = '드로잉';
      break;
    case 'music':
      initialCategory = '음악';
      break;
    case 'exercise':
      initialCategory = '운동';
      break;
    case 'cook':
      initialCategory = '요리';
      break;
    case 'beauty':
      initialCategory = '뷰티';
      break;
    case 'etc':
      initialCategory = '기타';
      break;
    default:
      initialCategory = '';
      break;
  }

  // 현재 페이지에 보여지는 강의 배열
  const [lessons, setLessons] = useState<Array<Lesson> | null>();

  // 한 페이지에 몇 개를 보여줄 것인지
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0);
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [dayOfWeek, setDayOfWeek] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [maxStartTime, setMaxStartTime] = useState<number | undefined>(
    undefined,
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [minStartTime, setMinStartTime] = useState<number | undefined>(
    undefined,
  );
  const [name, setName] = useState<string | undefined>(undefined);

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

  const handleSidebarClick = (item: string) => {
    if (item === '전체 강의') {
      setCategory(undefined);
    } else {
      setCategory(item);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await searchLessons({
        limit,
        offset,
        category,
        dayOfWeek,
        email,
        maxPrice,
        maxStartTime,
        minPrice,
        minStartTime,
        name,
      });
      console.log(
        limit,
        offset,
        category,
        dayOfWeek,
        email,
        maxPrice,
        maxStartTime,
        minPrice,
        minStartTime,
        name,
      );
      console.log(data);
      setLessons(data);
    };
    getData();
  }, [
    category,
    dayOfWeek,
    email,
    maxPrice,
    maxStartTime,
    minPrice,
    minStartTime,
    name,
  ]);

  return (
    <div className="lessons-page">
      <Header />
      <div className="lessons-page__contents">
        <Sidebar items={sidebarItems} onSidebarClick={handleSidebarClick} />
        <div className="lessons-page__sub-page">
          <SearchBox />
          <div className="lesson-page__lesson-list">
            {lessons?.map((lesson: Lesson) => (
              <div className="lesson-page__lesson-card" key={lesson.lessonId}>
                <LessonCard lesson={lesson} />
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
