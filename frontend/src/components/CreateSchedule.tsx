import React, { useState, useRef } from 'react';

import { Stack, TextField, Button } from '@mui/material/';

import CreateScheduleViewModel from '../viewmodels/CreateScheduleViewModel';

import {
  CreateScheduleProps,
  CreateScheduleRequest,
} from '../types/ScheduleType';

const CreateScheduleComponent = ({
  runningtime,
  lessonId,
  setScheduleInputState,
}: CreateScheduleProps) => {
  // 강의 시작 시간, 종료 시간을 담을 state 각각 생성
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const { createSchedule } = CreateScheduleViewModel();

  // 시간 input 값 변경 시, endTime값도 함께 수정(runningTime이 0보다 높을 때 효력 발생함)
  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);

    const startDate = new Date(newStartTime);
    const endDate = new Date(
      startDate.getTime() + runningtime * 60 * 60 * 1000,
    );
    setEndTime(
      new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60 * 1000)
        .toISOString()
        .slice(0, 16),
    );
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  // 만약 스케줄 등록 버튼을 눌렀을 시, api 요청을 보냄
  // 그 전에 해당 값을 입력했는지를 먼저 검증하고, 입력하지 않았을 시 alert로 입력하라고 지시함
  const handelSubmitSchedule = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (startTime === '') {
      alert('강의 시작 시간을 입력해주세요.');
    } else if (endTime === '') {
      alert('강의 종료 시간을 입력해주세요.');
    } else {
      // 만약 둘 모두 입력했음에도 끝나는 시간이 시작 시간보다 더 이르다면(runnigtime 0일시에만 해당), alert 창으로 알려줌
      const selectedStartDate = new Date(startTime);
      const selectedEndDate = new Date(endTime);
      if (selectedEndDate <= selectedStartDate) {
        alert('종료 시간은 시작 시간보다 늦은 시간으로 설정해주세요.');
      } else {
        // datetime input의 경우 중간에 T로 시간을 구분하고 있음
        // 해당 T까지 DB에 보내면 안되기 때문에, sclice로 해당 부분만 제거해서 데이터를 담아줌
        const createScheduleRequestBody: CreateScheduleRequest = {
          endTime: `${endTime.slice(0, 10)} ${endTime.slice(-5)}`,
          lessonId,
          startTime: `${startTime.slice(0, 10)} ${startTime.slice(-5)}`,
        };

        const res = await createSchedule(createScheduleRequestBody);
        if (res?.message === 'SUCCESS') {
          alert('스케줄이 등록되었습니다');
          setScheduleInputState(false);
        } else {
          alert('다시 시도해주세요');
        }
      }
    }
  };

  return (
    <div>
      <Stack component="form" noValidate spacing={3}>
        <h3>시작 시간</h3>
        <TextField
          id="datetime-local"
          label="시작 시간"
          type="datetime-local"
          value={startTime}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartTimeChange}
        />
        <h3>종료 시간</h3>
        <TextField
          id="datetime-local"
          label="종료 시간"
          type="datetime-local"
          value={endTime}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          // 만약 기존 강의 예상 시간이 0 이상이라면, 수정 불가
          disabled={runningtime !== 0}
          onChange={handleEndTimeChange}
        />
      </Stack>
      <Button type="button" onClick={handelSubmitSchedule} variant="contained">
        등록
      </Button>
    </div>
  );
};
export default CreateScheduleComponent;
