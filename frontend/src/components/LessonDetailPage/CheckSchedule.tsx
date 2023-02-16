import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  Stack,
  TextField,
  Button,
  Card,
  createTheme,
  ThemeProvider,
} from '@mui/material/';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Calendar from 'react-calendar';
import moment from 'moment';

import PrivateInfoState from '../../models/PrivateInfoAtom';

import ScheduleViewModel from '../../viewmodels/ScheduleViewModel';

import {
  GetScheduleRequest,
  LessonSchedulesType,
} from '../../types/LessonsType';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7062c7',
    },
    secondary: {
      main: '#9381ff',
    },
  },
});

const CheckSchedule = (teacherEmail: any) => {
  const lessonIdParams = useParams();

  const { email } = teacherEmail;
  const navigate = useNavigate();

  const userInfo = useRecoilValue(PrivateInfoState);

  const today = moment();

  // api를 통해 불러올 스케줄 데이터를 담아줄 scheduleList 생성
  const [scheduleList, setScheduleListState] = useState<LessonSchedulesType[]>(
    [],
  );
  const [hiddenState, setHiddenState] = useState(true);

  // 달력의 값을 주관할 selectedDate 생성
  const [selectedDate, setSelectedDate] = useState(new Date());

  // api method로 사용할 getSchedule을 불러옴
  const { getSchedule } = ScheduleViewModel();

  // 만약 사용자가 날짜를 바꿀 시, 해당 날짜에 배정된 스케줄을 불러옴
  const getScheduleSelected = async (date: Date) => {
    if (!selectedDate) {
      alert('올바른 값을 입력해주세요.');
    } else {
      const checkScheduleRequestBody: GetScheduleRequest = {
        regDate: moment(date).format('YYYY-MM-DD'),
        lessonId: Number(lessonIdParams.lessonId),
      };
      const res = await getSchedule(checkScheduleRequestBody);
      if (res?.message === 'SUCCESS') {
        if (res.lessonSchedules.length) {
          setScheduleListState(res.lessonSchedules);
        } else {
          // 만약 해당 날짜에 스케줄이 없다면, scheduleList를 초기화함
          setScheduleListState([]);
        }
      } else {
        alert('다시 시도해주세요.');
      }
    }
  };

  // 사용자가 달력에서 다른 값을 선택했을 시, 해당 값으로 value를 바꿔준 후, 스케줄을 가져옴
  const handleDateChange = (date: Date) => {
    console.log(date);
    const selecteDate = moment(date);
    if (selecteDate.isBefore(today, 'day')) {
      alert('지나간 스케줄은 선택할 수 없습니다.');
    } else {
      setSelectedDate(date);
      getScheduleSelected(date);
    }
  };

  const handleDoEnroll = (lessonId: number, openLessonId: number) => {
    if (userInfo) {
      if (userInfo.email === teacherEmail) {
        console.log(teacherEmail);
        alert('본인이 개설한 클래스는 수강 신청할 수 없습니다.');
      } else {
        navigate(`/enroll-lesson/${lessonId}/${openLessonId}`);
      }
    } else {
      alert('로그인 후에 이용이 가능합니다.');
      navigate('/login');
    }
  };

  useEffect(() => {
    const getTodaysSchedule = async () => {
      const checkScheduleRequestBody: GetScheduleRequest = {
        regDate: moment(selectedDate).format('YYYY-MM-DD'),
        lessonId: Number(lessonIdParams.lessonId),
      };
      const res = await getSchedule(checkScheduleRequestBody);
      if (res?.message === 'SUCCESS') {
        if (res.lessonSchedules.length) {
          setScheduleListState(res.lessonSchedules);
        } else {
          // 만약 해당 날짜에 스케줄이 없다면, scheduleList를 초기화함
          setScheduleListState([]);
        }
      }
    };
    getTodaysSchedule();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Button
        color="primary"
        variant="contained"
        className="check-schedule__header"
        onClick={() => setHiddenState(!hiddenState)}
      >
        <h2>
          <FormatAlignJustifyIcon /> 클래스 예약하기
        </h2>
      </Button>
      <Card
        color="secondary"
        className="check-schedule__container"
        hidden={hiddenState}
      >
        <div>
          <div className="check-schedule__date-part">
            <h3>클래스 시간 선택</h3>
            <div className="check-schedule__date-info">
              <h3>
                <CalendarMonthIcon /> 일자 |{' '}
                {moment(selectedDate).format('YYYY-MM-DD')}
              </h3>
            </div>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              // moment를 통해 달력에 각 일이 표시되는 형식을 변환해줌(본래는 뒤에 '일'이 붙음)
              calendarType="US"
              formatDay={(locale, date) => moment(date).format('DD')}
            />
            <ul className="check-schedule__ul">
              {scheduleList.length !== 0 ? (
                scheduleList.map((schedule) => {
                  const { openLessonId, lessonId, startTime, endTime } =
                    schedule;
                  return (
                    <li key={openLessonId}>
                      <Card className="check-schedule__li">
                        <div className="check-schedule__class-time">
                          강의 시간 :{' '}
                        </div>{' '}
                        <div>
                          {startTime.slice(11, 16)} -{endTime.slice(11, 16)}
                        </div>
                        <Button
                          onClick={() => {
                            handleDoEnroll(lessonId, openLessonId);
                          }}
                        >
                          선택
                        </Button>
                      </Card>
                    </li>
                  );
                })
              ) : (
                <div>
                  <h2>스케줄이 없어요!</h2>
                </div>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </ThemeProvider>
  );
};
export default CheckSchedule;
