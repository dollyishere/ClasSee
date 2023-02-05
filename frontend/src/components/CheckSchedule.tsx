import React, { useState, useEffect, useRef } from 'react';

import { Stack, TextField, Button } from '@mui/material/';

import { CheckScheduleRequest } from '../types/ScheduleType';

const CheckSchedule = () => {
  const today = new Date();
  const [dateState, setDateState] = useState<string>(
    `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
  );
  const handleDateChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(dateState);
    setDateState(event.target.value);
    if (dateState === '') {
      alert('올바른 값을 입력해주세요.');
    } else {
      const checkScheduleRequestBody: CheckScheduleRequest = {
        regDate: dateState,
        lessonId: 1,
      };
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
      </div>
    </div>
  );
};
export default CheckSchedule;
