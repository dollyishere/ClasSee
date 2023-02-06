import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Stack, TextField, Button } from '@mui/material/';

import ScheduleViewModel from '../viewmodels/ScheduleViewModel';

import {
  GetScheduleRequest,
  GetScheduleResponse,
  LessonSchedulesType,
} from '../types/ScheduleType';

const CheckSchedule = () => {
  const lessonIdParams = useParams();

  const [scheduleList, setScheduleListState] = useState<LessonSchedulesType[]>(
    [],
  );

  const today = new Date();
  const [dateState, setDateState] = useState<string>(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
  );

  const { getSchedule } = ScheduleViewModel();

  // 만약 사용자가 날짜를 바꿀 시, 해당 날짜에 배정된 스케줄을 불러옴
  const handleDateChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDateState(event.target.value);
    if (dateState === '') {
      alert('올바른 값을 입력해주세요.');
    } else {
      const checkScheduleRequestBody: GetScheduleRequest = {
        regDate: dateState,
        lessonId: Number(lessonIdParams.lessonId),
      };
      const res = await getSchedule(checkScheduleRequestBody);
      if (res?.message === 'SUCCESS') {
        if (res.lessonSchedules.length) {
          setScheduleListState(res.lessonSchedules);
        } else {
          alert('예정된 스케줄이 없습니다.');
        }
      } else {
        alert('다시 시도해주세요.');
      }
    }
  };
  return (
    <div>
      <div>
        <h3>클래스 예약하기</h3>
      </div>
      <div>
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="date"
            label="날짜 선택"
            type="date"
            value={dateState}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </Stack>
        <div>
          <h3>클래스 시간 선택</h3>
          <ul>
            {scheduleList.length !== 0 ? (
              scheduleList.map((schedule) => {
                const { openLessonId, lessonId, startTime, endTime } = schedule;
                return (
                  <li key={openLessonId}>
                    강의 시간 : {startTime} to {endTime}
                    <Button>선택</Button>
                  </li>
                );
              })
            ) : (
              <div>
                <h1>스케줄이 없어요!</h1>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CheckSchedule;
