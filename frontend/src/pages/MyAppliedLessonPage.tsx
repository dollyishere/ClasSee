import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  Stack,
  Button,
  Card,
  CardContent,
  Pagination,
  IconButton,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MyPageCards from '../components/MyPage/MyPageCards';
import MyAppliedLessonCard from '../components/MyAppliedLessonCard';
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

  // 메인페이지 마운트 시 강의 정보들 요청
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
        console.log(todoData);
        setTodoLessons(todoData.lessonInfoList);
        setTodoCount(Math.ceil(todoData.lessonInfoList.length / limit));
      };
      getTodoData();
    }
  }, [todoPage]);

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
        console.log(doneData);
        setDoneLessons(doneData.lessonInfoList);
        setDoneCount(Math.ceil(doneData.lessonInfoList.length / limit));
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
            <h2>진행 예정 클래스</h2>
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
                <h1>신청한 강의가 없어요!</h1>
              )}
              {todoLessons.length < 3 ? (
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
            <h2>완료한 클래스</h2>
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
                    <MyAppliedLessonCard lesson={lesson} />
                  </div>
                ))
              ) : (
                <h1>완료한 강의가 없어요!</h1>
              )}
              {doneLessons.length < 3 ? (
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
