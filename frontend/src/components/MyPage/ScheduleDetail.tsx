import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { LessonSchedulesType } from '../../types/LessonsType';
import ScheduleViewModel from '../../viewmodels/ScheduleViewModel';

import PrivateInfoState from '../../models/PrivateInfoAtom';

const ScheduleDetail = ({
  startTime,
  endTime,
  openLessonId,
  lessonId,
  rerenderSchedule,
  setRerenderSchedule,
}: LessonSchedulesType) => {
  const [lessonTime, setLessonTime] = useState<string>('진행 예정');
  const { deleteSchedule } = ScheduleViewModel();

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);

  const handleScheduleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else if (window.confirm('스케줄을 삭제하시겠습니까?')) {
      const res = await deleteSchedule(userInfo.email, lessonId, openLessonId);
      if (res?.statusCode === 200) {
        alert('스케줄이 삭제되었습니다.');
        setRerenderSchedule(!rerenderSchedule);
      } else {
        alert('다시 시도해주세요.');
      }
    }
  };
  const handleLessonStart = (event: React.MouseEvent<HTMLElement>) => {
    console.log('여기에 결제 페이지 이동 함수 작성하면 될 듯함??');
    window.open(
      `/lesson/${openLessonId}/teacher`,
      '강의',
      `height=${window.screen.height}, width=${window.screen.width}, fullscreen=yes, status=no, scrollbars=no`,
    );
  };
  // 여기서 useEffect로 감싸지 않으면 무한 렌더링 문제가 발생함
  useEffect(() => {
    const todayTime = new Date();
    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);
    const impending = newStartTime.getTime() - todayTime.getTime();
    if (newEndTime < todayTime) {
      setLessonTime('종료');
    } else if (newStartTime <= todayTime && todayTime <= newEndTime) {
      setLessonTime('진행 중');
    } else if (impending <= 3600 * 1000) {
      setLessonTime('임박');
    }
  }, []);

  return (
    <div className="schedule-detail__body">
      <div className="schedule-detail__header">{lessonTime}</div>
      <div className="schedule-detail__startTime">
        시작 시간 {startTime.slice(0, 16)}
      </div>
      <div className="schedule-detail__endTime">
        종료 시간 {endTime.slice(0, 16)}
      </div>
      <IconButton onClick={handleScheduleDelete}>
        <DeleteIcon />
      </IconButton>
      {lessonTime === '임박' || lessonTime === '진행 중' ? (
        <Button onClick={handleLessonStart}>시작</Button>
      ) : (
        <Button disabled>입장 불가</Button>
      )}
    </div>
  );
};
export default ScheduleDetail;
