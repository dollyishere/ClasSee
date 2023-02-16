import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Card, CardContent, IconButton } from '@mui/material';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import MyAppliedLessonCardMine from '../components/MyPage/MyAppliedLessonCardMine';
import MyAppliedLessonCard from '../components/MyAppliedLessonCard';
import Nolesson from '../components/MainPage/NoLesson';

import useViewModel from '../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../types/LessonsType';
import privateInfoState from '../models/PrivateInfoAtom';

// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 개설한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyAppliedLessonsPage = () => {
  // 내가 개설한 강의 2개 가져오는 함수
  const [todoCount, setTodoCount] = useState<number>(0);
  const [doneCount, setDoneCount] = useState<number>(0);
  const [todoPage, setTodoPage] = useState<number>(1);
  const [donePage, setDonePage] = useState<number>(1);
  const [todoLessons, setTodoLessons] = useState<Array<Lesson>>([]);
  const [doneLessons, setDoneLessons] = useState<Array<Lesson>>([]);

  const userInfo = useRecoilValue(privateInfoState);
  const { getMyAppliedLessonsMainpage } = useViewModel();

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  const handleTodoPageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setTodoPage(value);
  };

  const handleDonePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setDonePage(value);
  };

  // 진행 예정된 강의 목록 불러오기(페이지네이션에 따라 값이 변경)
  useEffect(() => {
    if (userInfo !== null) {
      const getTodoData = async () => {
        const limit = 3;
        const offset = (todoPage - 1) * limit;
        const todoData = await getMyAppliedLessonsMainpage(
          userInfo.email,
          limit,
          offset,
          'TODO',
        );
        setTodoLessons(todoData.lessonInfoList);
        setTodoCount(Math.ceil(todoData.count / limit));
      };
      getTodoData();
    }
  }, [todoPage]);

  // 진행 완료된 강의 목록 불러오기(페이지네이션에 따라 값이 변경)
  useEffect(() => {
    if (userInfo !== null) {
      const getDoneData = async () => {
        const limit = 3;
        const offset = (donePage - 1) * limit;
        const doneData = await getMyAppliedLessonsMainpage(
          userInfo.email,
          limit,
          offset,
          'DONE',
        );
        setDoneLessons(doneData.lessonInfoList);
        setDoneCount(Math.ceil(doneData.count / limit));
      };
      getDoneData();
    }
  }, [donePage]);

  return (
    <div className="my-applied-lessons-page">
      <Card className="my-applied-lessons-page__card">
        <CardContent>
          <div className="my-applied-lessons-page__title">신청한 클래스</div>
          <div className="my-applied-lessons-page__todo-lessons">
            <h1>진행 예정 클래스</h1>
            <div className="my-applied-lessons-page__todo-lessons-body">
              {todoPage === 1 ? (
                <IconButton disabled>
                  <ArrowLeftIcon fontSize="large" color="disabled" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setTodoPage(todoPage - 1)}>
                  <ArrowLeftIcon fontSize="large" />
                </IconButton>
              )}

              {todoLessons.length ? (
                todoLessons.map((lesson: Lesson) => (
                  <div
                    className="my-applied-lessons-page__lesson-card"
                    key={lesson.lessonId}
                  >
                    <MyAppliedLessonCard lesson={lesson} />
                  </div>
                ))
              ) : (
                <Nolesson message="신청" />
              )}
              {todoPage === todoCount ? (
                <IconButton disabled>
                  <ArrowRightIcon fontSize="large" color="disabled" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setTodoPage(todoPage + 1)}>
                  <ArrowRightIcon fontSize="large" />
                </IconButton>
              )}
            </div>
          </div>

          <div className="my-applied-lessons-page__todo-lessons">
            <h1>완료된 클래스</h1>
            <div className="my-applied-lessons-page__todo-lessons-body">
              {donePage === 1 ? (
                <IconButton disabled>
                  <ArrowLeftIcon fontSize="large" color="disabled" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setDonePage(donePage - 1)}>
                  <ArrowLeftIcon fontSize="large" />
                </IconButton>
              )}

              {doneLessons.length ? (
                doneLessons.map((lesson: Lesson) => (
                  <div
                    className="my-applied-lessons-page__lesson-card"
                    key={lesson.lessonId}
                  >
                    <MyAppliedLessonCardMine lesson={lesson} />
                  </div>
                ))
              ) : (
                <Nolesson message="신청" />
              )}
              {donePage === doneCount ? (
                <IconButton disabled>
                  <ArrowRightIcon fontSize="large" color="disabled" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setDonePage(donePage + 1)}>
                  <ArrowRightIcon fontSize="large" />
                </IconButton>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAppliedLessonsPage;
