import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useRecoilValue } from 'recoil';

import PrivateInfoState from '../models/PrivateInfoAtom';
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
  const userInfo = useRecoilValue(PrivateInfoState);
  // 뷰 모델
  const { searchLessons } = useViewModel();

  // 카테고리를 알기 위한 location
  const location = useLocation();

  // 현재 페이지에 보여지는 강의 배열
  const [lessons, setLessons] = useState<Array<Lesson> | null>();

  // 현재 페이지 번호
  const [page, setPage] = useState<number>(1);

  // 전체 페이지 개수
  const [count, setCount] = useState<number>(0);

  const [category, setCategory] = useState<string | undefined>(undefined);
  const [dayOfWeek, setDayOfWeek] = useState<Array<boolean>>(
    new Array(7).fill(false),
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [maxStartTime, setMaxStartTime] = useState<number | undefined>(
    undefined,
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [minStartTime, setMinStartTime] = useState<number | undefined>(
    undefined,
  );

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const search = async () => {
    const limit = 8;
    const offset = (page - 1) * limit;
    let day = '';
    for (let i = 0; i < 7; i += 1) {
      if (dayOfWeek[i]) {
        day += `${i + 1},`;
      }
    }
    day = day.substring(0, day.length - 1);

    let keyword;
    if (location.pathname.split('/')[2] === 'search') {
      keyword = location.pathname.split('/').at(3);
    }

    const email = userInfo === null ? undefined : userInfo.email;

    const data = await searchLessons({
      limit,
      offset,
      category,
      dayOfWeek: day,
      email,
      maxPrice,
      maxStartTime,
      minPrice,
      minStartTime,
      keyword,
    });
    if (data !== null && data.count !== undefined) {
      setCount(Math.ceil(data.count / limit));
    }
    setLessons(data?.lessonInfoList);
  };

  useEffect(() => {
    let currentCategory;
    switch (location.pathname.split('/')[2]) {
      case 'craft':
        currentCategory = '공예';
        break;
      case 'drawing':
        currentCategory = '드로잉';
        break;
      case 'music':
        currentCategory = '음악';
        break;
      case 'exercise':
        currentCategory = '운동';
        break;
      case 'cooking':
        currentCategory = '요리';
        break;
      case 'beauty':
        currentCategory = '뷰티';
        break;
      case 'etc':
        currentCategory = '기타';
        break;
      default:
        currentCategory = '';
        break;
    }
    setCategory(currentCategory);
    search();
  }, [page, category, location.pathname]);

  return (
    <div className="lessons-page">
      <Header />
      <div className="lessons-page__contents">
        <Sidebar items={sidebarItems} onSidebarClick={handleSidebarClick} />
        <div className="lessons-page__sub-page">
          <SearchBox
            dayOfWeek={dayOfWeek}
            setDayOfWeek={setDayOfWeek}
            setMinStartTime={setMinStartTime}
            setMaxStartTime={setMaxStartTime}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            search={search}
          />
          <div className="lessons-page__lesson-list">
            {lessons?.map((lesson: Lesson) => (
              <div className="lessons-page__lesson-card" key={lesson.lessonId}>
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </div>
          <div className="lessons-page__pagination">
            <Pagination
              variant="outlined"
              count={count}
              page={page}
              shape="rounded"
              size="large"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
