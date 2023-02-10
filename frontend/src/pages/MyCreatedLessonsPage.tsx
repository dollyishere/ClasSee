import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Stack, Button, Card, CardContent, Pagination } from '@mui/material';
import LessonCard from '../components/LessonCard';
import useViewModel from '../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../types/LessonsType';
import privateInfoState from '../models/PrivateInfoAtom';
// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 개설한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyCreatedLessonsPage = () => {
  // 내가 개설한 강의 2개 가져오는 함수
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [lessons, setLessons] = useState<Array<Lesson>>([]);

  const userInfo = useRecoilValue(privateInfoState);
  const { getMyCreatedLessonsMainpage } = useViewModel();

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleMoveDetail = (event: any, lessonId: number) => {
    event.preventDefault();
    navigate(`/mypage/created-lesson/${lessonId}`);
  };

  // 메인페이지 마운트 시 강의 정보들 요청
  useEffect(() => {
    if (userInfo !== null) {
      const getData = async () => {
        const limit = 8;
        const offset = (page - 1) * limit;
        const data = await getMyCreatedLessonsMainpage(
          userInfo.email,
          limit,
          offset,
          'DONE',
        );
        setLessons(data.lessonInfoList);
        setCount(Math.ceil(data.count / limit));
      };
      getData();
    }
  }, [page]);

  return (
    <div>
      <div className="profile-page">
        <Card className="profile-page__card">
          <CardContent>
            <h1>개설한 클래스</h1>
            <div className="my-bookmark-page__lessons">
              {lessons.map((lesson: Lesson) => (
                <div
                  role="button"
                  tabIndex={0}
                  className="my-bookmark-page__lesson-card"
                  key={lesson.lessonId}
                  onClick={(event) => {
                    if (lesson.teacher) {
                      event.preventDefault();
                      navigate(`/mypage/created-lesson/${lesson.lessonId}`);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(`/mypage/created-lesson/${lesson.lessonId}`);
                    }
                  }}
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
    </div>
  );
};

export default MyCreatedLessonsPage;
