import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button, Card, CardContent } from '@mui/material';

import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../utils/Firebase';

import {
  LessonDetailRequest,
  LessonDetailResponse,
  CurriculumsType,
  CheckListsType,
  PamphletsType,
} from '../types/LessonDetailType';

import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';

import PrivateInfoState from '../models/PrivateInfoAtom';

import CreateScheduleComponent from '../components/CreateSchedule';
import ScheduleDetail from '../components/ScheduleDetail';

const MyCreatedLessonDetailPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();

  // api를 통해 받아온 강의 상세 정보를 저장할 lessonDetailState 생성
  const [lessonDetailState, setLessonDetailState] =
    useState<LessonDetailResponse>({
      message: '' as string,
      statusCode: 0 as number,
      teacherEmail: '' as string,
      lessonName: '' as string,
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
      checkLists: [] as CheckListsType[],
      pamphlets: [] as PamphletsType[],
      score: 0 as number,
      bookMarked: false as boolean,
    });

  // api 실행할 시 실행될 CreateLessonViewModel createLesson에 할당
  const { getLessonDetail } = LessonDetailViewModel();

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);

  // 강의 소개 & 준비물 이미지 파일을 담을 State 각각 생성
  const [pamphletsImgState, setPamphletsImgState] = useState<any>([]);
  const [checkListImgState, setCheckListImgState] = useState<any>([]);

  // 스케줄 목록을 담을 State 생성
  const [schedulesListState, setSchedulesListState] = useState<any>([]);

  // 강의 스케줄 추가 input 여부 확인할 state 생성
  const [scheduleInputState, setScheduleInputState] = useState(false);

  // firebase storage의 이 경로에 있는 파일들을 가져옴
  const checkListImgRef = ref(
    storage,
    `lessons/${lessonId.lessonId}/checklist_images`,
  );
  const pamphletsImgRef = ref(
    storage,
    `lessons/${lessonId.lessonId}/pamphlet_images`,
  );

  // const handleLessonDelete = (event: React.MouseEvent<HTMLButtonElement>) => {};
  // useEffect로 해당 페이지 렌더링 시 강의 상세 정보를 받아오도록 내부 함수 실행
  useEffect(() => {
    const getLessonDetailRequestBody: LessonDetailRequest = {
      lessonId: Number(lessonId.lessonId),
    };
    const fetchData = async () => {
      const res = await getLessonDetail(getLessonDetailRequestBody);
      if (res?.message === 'SUCCESS') {
        // 만약 강의 상세 정보를 db에서 받아오는 것에 성공했다면, lessonDetailState에 해당 정보를 저장
        setLessonDetailState(res);
        // firebase의 해당 강의가 저장된 폴더의 url에 접근하여 해당하는 이미지 파일을 각각 다운받음
        // 강의 관련 사진 다운로드해서 pamphletsImgState에 저장
        res.pamphlets.forEach((item) => {
          const imageName = item.img as string;
          listAll(pamphletsImgRef).then((response: any) => {
            response.items.forEach((img: any) => {
              if (img.name === imageName) {
                getDownloadURL(img).then((url) => {
                  setPamphletsImgState((prev: any) => [...prev, url]);
                });
              }
            });
          });
        });
        res.checkLists.forEach((item) => {
          const imageName = item.img as string;
          listAll(checkListImgRef).then((response: any) => {
            response.items.forEach((img: any) => {
              if (img.name === imageName) {
                getDownloadURL(img).then((url) => {
                  setCheckListImgState((prev: any) => [...prev, url]);
                });
              }
            });
          });
        });
      } else {
        alert(res?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <Card className="profile-page__card">
        <h1>개설한 클래스 관리</h1>
        <CardContent>
          <div className="created-lesson-detail-page__box">
            <div className="created-lesson-detail-page__header">
              클래스 상세
            </div>
            <div className="created-lesson-detail-page__lesson-name">
              <h3>클래스 명:</h3>
              <p>{lessonDetailState.lessonName}</p>
              <span
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/lessons/${Number(lessonId.lessonId)}`)
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(`/lessons/${Number(lessonId.lessonId)}`);
                  }
                }}
              >
                상세 페이지 바로 가기
              </span>
            </div>
            <div className="created-lesson-detail-page__runningtime">
              <h3>소요 시간:</h3>
              <p>
                {lessonDetailState.runningTime === 0
                  ? '미정'
                  : lessonDetailState.runningTime}{' '}
                시간
              </p>
            </div>
            <div className="created-lesson-detail-page__category">
              <h3>카테고리</h3>
              <div>{lessonDetailState.category}</div>
            </div>
            <div className="created-lesson-detail-page__enrolled-image">
              <h3>등록한 사진:</h3>
              <div>
                {pamphletsImgState.map((image: any) => (
                  <img src={image} alt={image} />
                ))}
                {checkListImgState.map((image: any) => (
                  <img src={image} alt={image} />
                ))}
              </div>
            </div>
            <div className="created-lesson-detail-page__button">
              <Stack spacing={2} direction="row">
                <Button variant="contained">강의 상세 수정</Button>
                <Button variant="contained">강의 삭제</Button>
              </Stack>
            </div>
          </div>
          <div>
            <div className="created-lesson-detail-page__header">
              스케줄 관리
            </div>
            <div>
              <ul>
                <li>일자</li>
                <li>시간</li>
                <li>참여 인원</li>
                <li>수정/삭제</li>
              </ul>
              {schedulesListState.map((schedule: any) => (
                <ScheduleDetail />
              ))}
              {scheduleInputState ? (
                <CreateScheduleComponent
                  runningtime={lessonDetailState.runningTime}
                  lessonId={Number(lessonId.lessonId)}
                  scheduleInputState={scheduleInputState}
                  setScheduleInputState={setScheduleInputState}
                />
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setScheduleInputState(true)}
                >
                  스케줄 추가
                </Button>
              )}
            </div>
          </div>
          <div>
            <Link to="/">
              <Button variant="contained"> 메뉴로 돌아가기 </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default MyCreatedLessonDetailPage;
