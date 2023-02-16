import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  Stack,
  Button,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  ImageList,
  ImageListItem,
} from '@mui/material';

import {
  LessonDetailRequest,
  LessonDetailResponse,
  CurriculumsType,
  ImageListType,
  LessonSchedulesType,
  GetScheduleRequest,
} from '../types/LessonsType';

import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';
import ScheduleViewModel from '../viewmodels/ScheduleViewModel';

import PrivateInfoState from '../models/PrivateInfoAtom';

import CreateScheduleComponent from '../components/MyPage/CreateSchedule';
import ScheduleDetail from '../components/MyPage/ScheduleDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7062c7',
    },
    secondary: {
      main: '#a9a9a9',
    },
  },
});

const MyCreatedLessonDetailPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();

  // api를 통해 받아온 클래스 상세 정보를 저장할 lessonDetailState 생성
  const [lessonDetailState, setLessonDetailState] =
    useState<LessonDetailResponse>({
      message: '' as string,
      statusCode: 0 as number,
      teacher: '' as string,
      lessonName: '' as string,
      lessonId: 0 as number,
      price: 0 as number,
      cklsDescription: '' as string,
      lessonDescription: '' as string,
      kitPrice: 0 as number,
      kitDescription: '' as string,
      category: '' as string,
      runningTime: 0 as number,
      maximum: 0 as number,
      userName: '' as string,
      userDesciption: '' as string | null,
      teacherImage: '' as string | null,
      curriculums: [] as CurriculumsType[],
      checkLists: [] as ImageListType[],
      pamphlets: [] as ImageListType[],
      score: 0 as number,
      bookMarked: false as boolean,
      attended: false as boolean,
    });

  // api 실행할 시 실행될 함수 가져옴
  const {
    getLessonDetail,
    getPamphletImgUrls,
    getCheckImgUrls,
    doDeleteselectedLesson,
  } = LessonDetailViewModel();
  const { getSchedule } = ScheduleViewModel();

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // 클래스 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);

  // 클래스 소개 & 준비물 이미지 파일을 담을 State 각각 생성
  const [pamphletsImgState, setPamphletsImgState] = useState<any>([]);
  const [checkListImgState, setCheckListImgState] = useState<any>([]);

  // 스케줄 목록을 담을 State 생성
  const [schedulesListState, setSchedulesListState] = useState<any>([]);

  // 클래스 스케줄 추가 input 여부 확인할 state 생성
  const [scheduleInputState, setScheduleInputState] = useState(false);

  const [rerenderSchedule, setRerenderSchedule] = useState(false);

  const handleLessonDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else if (window.confirm('클래스를 삭제하시겠습니까?')) {
      const res = await doDeleteselectedLesson(
        userInfo.email,
        lessonDetailState.lessonId,
      );
      if (res?.statusCode === 200) {
        alert('클래스가 삭제되었습니다.');
        navigate('/mypage/created-lesson');
      } else {
        alert('다시 시도해주세요.');
      }
    }
  };

  // const handleLessonDelete = (event: React.MouseEvent<HTMLButtonElement>) => {};
  // useEffect로 해당 페이지 렌더링 시 클래스 상세 정보를 받아오도록 내부 함수 실행
  useEffect(() => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      const getLessonDetailRequestBody: LessonDetailRequest = {
        email: userInfo.email,
        lessonId: Number(lessonId.lessonId),
      };
      const fetchData = async () => {
        const res = await getLessonDetail(getLessonDetailRequestBody);
        if (res?.statusCode === 200) {
          // 만약 클래스 상세 정보를 db에서 받아오는 것에 성공했다면, lessonDetailState에 해당 정보를 저장
          setLessonDetailState(res);
          if (userInfo.email !== res.teacher) {
            alert('잘못된 접근입니다.');
            navigate('/');
          } else {
            // firebase의 해당 클래스가 저장된 폴더의 url에 접근하여 해당하는 이미지 파일을 각각 다운받음
            // 클래스 관련 사진 다운로드해서 pamphletsImgState에 저장
            getPamphletImgUrls(res.pamphlets, Number(lessonId.lessonId)).then(
              (urls: any[]) => {
                setPamphletsImgState(urls);
              },
            );
            getCheckImgUrls(res.checkLists, Number(lessonId.lessonId)).then(
              (urls: any[]) => {
                setCheckListImgState(urls);
              },
            );
          }
        } else {
          alert(res?.message);
        }
      };
      const getLessonSchedule = async () => {
        const checkScheduleRequestBody: GetScheduleRequest = {
          regDate: '',
          lessonId: Number(lessonId.lessonId),
        };
        const res = await getSchedule(checkScheduleRequestBody);
        if (res?.message === 'SUCCESS') {
          setSchedulesListState(res.lessonSchedules);
        } else {
          alert('다시 시도해주세요.');
        }
      };
      fetchData();
      getLessonSchedule();
    }
  }, []);

  useEffect(() => {
    const getLessonSchedule = async () => {
      const checkScheduleRequestBody: GetScheduleRequest = {
        regDate: '',
        lessonId: Number(lessonId.lessonId),
      };
      const res = await getSchedule(checkScheduleRequestBody);
      if (res?.message === 'SUCCESS') {
        setSchedulesListState(res.lessonSchedules);
      } else {
        alert('다시 시도해주세요.');
      }
    };
    getLessonSchedule();
  }, [rerenderSchedule]);

  return (
    <ThemeProvider theme={theme}>
      <div className="my-created-lesson-detail-page">
        <Card className="my-created-lesson-detail-page__card">
          <h1 className="my-created-lesson-detail-page__title">
            개설한 클래스 관리
          </h1>
          <CardContent className="my-created-lesson-detail-page__body">
            <Card className="my-created-lesson-detail-page__lesson-card">
              <div className="my-created-lesson-detail-page__header">
                클래스 상세
              </div>
              <div className="my-created-lesson-detail-page__content-container">
                <div className="my-created-lesson-detail-page__lesson-part-div">
                  <h2 className="my-created-lesson-detail-page__lesson-part-title">
                    클래스 명:
                  </h2>
                  <p>{lessonDetailState.lessonName}</p>
                  <Link to={`/lesson/${Number(lessonId.lessonId)}`}>
                    <Button className="my-created-lesson-detail-page__go-detail">
                      상세 페이지 바로 가기
                    </Button>
                  </Link>
                </div>
                <div className="my-created-lesson-detail-page__lesson-part-div">
                  <h2 className="my-created-lesson-detail-page__lesson-part-title">
                    소요 시간:
                  </h2>
                  <p>
                    {lessonDetailState.runningTime === 0
                      ? '미정'
                      : lessonDetailState.runningTime}{' '}
                    시간
                  </p>
                </div>
                <div className="my-created-lesson-detail-page__lesson-part-div">
                  <h2 className="my-created-lesson-detail-page__lesson-part-title">
                    카테고리:{' '}
                  </h2>
                  <div className="lesson__category">
                    <div className="lesson__category--text">
                      {lessonDetailState.category}
                    </div>
                  </div>
                </div>
                <div className="my-created-lesson-detail-page__lesson-image-container">
                  <h2 className="my-created-lesson-detail-page__lesson-part-title">
                    등록한 사진
                  </h2>
                  <ImageList
                    sx={{ width: 500, height: 250 }}
                    cols={3}
                    rowHeight={164}
                  >
                    {pamphletsImgState.map((img: string) => (
                      <ImageListItem key={img}>
                        <img
                          src={img}
                          srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={img}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                    {checkListImgState.map((img: string) => (
                      <ImageListItem key={img}>
                        <img
                          src={img}
                          srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={img}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  marginTop={2}
                  marginBottom={2}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      navigate(`/update-lesson/${Number(lessonId.lessonId)}`)
                    }
                  >
                    클래스 상세 수정
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleLessonDelete}
                  >
                    클래스 삭제
                  </Button>
                </Stack>
              </div>
            </Card>
            <Card className="my-created-lesson-detail-page__schedule-card">
              <div className="my-created-lesson-detail-page__header">
                스케줄 관리
              </div>
              <div>
                {/* <ul className="my-created-lesson-detail-page__lesson-part-div">
                  <li>시작 시간</li>
                  <li>종료 시간</li>
                  <li>참여 인원</li>
                  <li>수정/삭제</li>
                </ul> */}
                <div className="my-created-lesson-detail-page__schedules">
                  {schedulesListState.map((schedule: any) => (
                    <ScheduleDetail
                      startTime={schedule.startTime}
                      endTime={schedule.endTime}
                      openLessonId={schedule.openLessonId}
                      lessonId={schedule.lessonId}
                      attendCount={schedule.attendCount}
                      totalCount={schedule.totalCount}
                      rerenderSchedule={rerenderSchedule}
                      setRerenderSchedule={setRerenderSchedule}
                    />
                  ))}
                  {scheduleInputState ? (
                    <CreateScheduleComponent
                      runningtime={lessonDetailState.runningTime}
                      lessonId={Number(lessonId.lessonId)}
                      scheduleInputState={scheduleInputState}
                      setScheduleInputState={setScheduleInputState}
                      schedulesListState={schedulesListState}
                      rerenderSchedule={rerenderSchedule}
                      setRerenderSchedule={setRerenderSchedule}
                    />
                  ) : (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      marginTop={2}
                      marginBottom={2}
                    >
                      <Button
                        variant="contained"
                        onClick={() => setScheduleInputState(true)}
                      >
                        스케줄 추가
                      </Button>
                    </Stack>
                  )}
                </div>
              </div>
            </Card>
          </CardContent>
          <div className="my-created-class-detail-page-back-menu">
            <Link to="/mypage/created-lesson">
              <Button variant="contained"> 클래스 목록 보기 </Button>
            </Link>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default MyCreatedLessonDetailPage;
