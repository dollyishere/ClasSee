import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, Pagination } from '@mui/material';

import PrivateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/BookmarkViewModel';
import { Lesson } from '../types/LessonsType';
import LessonCard from '../components/LessonCard';

const MyBookmarkPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [lessons, setLessons] = useState<Array<Lesson>>([]);

  const userInfo = useRecoilValue(PrivateInfoState);
  const { getBookmark } = useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (userInfo !== null) {
      const getData = async () => {
        const limit = 8;
        const offset = (page - 1) * limit;
        const data = await getBookmark(userInfo.email, limit, offset);
        setLessons(data.lessonInfoList);
        setCount(Math.ceil(data.count / limit));
      };
      getData();
    }
  }, [page]);

  return (
    <div className="my-bookmark-page">
      <Card className="my-bookmark-page__card">
        <CardContent>
          <div className="my-bookmark-page__title">북마크</div>
          <div className="my-bookmark-page__lessons">
            {lessons.map((lesson: Lesson) => (
              <div
                className="my-bookmark-page__lesson-card"
                key={lesson.lessonId}
              >
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </div>
          <div className="my-bookmark-page__pagination">
            <Pagination
              variant="outlined"
              count={count}
              page={page}
              shape="rounded"
              size="large"
              onChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default MyBookmarkPage;
