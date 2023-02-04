import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button } from '@mui/material';

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

import BasicRating from '../components/Rating';

const LessonDetailPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();

  // api를 통해 받아온 강의 상세 정보를 저장할 lessonDetailState 생성
  const [lessonDetailState, setLessonDetailState] =
    useState<LessonDetailResponse>({
      message: '' as string,
      statusCode: 0 as number,
      lessonName: '' as string,
      cklsDescription: '' as string,
      kitPrice: 0 as number,
      kitDescription: '' as string,
      category: '' as string,
      runningtime: 0 as number,
      userName: '' as string,
      userDesciption: '' as string | null,
      profileImg: '' as string | null,
      curriculums: [] as CurriculumsType[],
      checkLists: [] as CheckListsType[],
      pamphlets: [] as PamphletsType[],
      score: 0 as number,
      isBookmarked: 0 as number,
    });

  // api 실행할 시 실행될 CreateLessonModel createLesson에 할당
  const { getLessonDetail } = LessonDetailViewModel();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  // const userEmail = useRecoilValue(PrivateInfoState).email;

  // 강의 소개 & 준비물 이미지 파일을 담을 State 각각 생성
  const [pamphletsImgState, setPamphletsImgState] = useState<any>([]);
  const [checkListImgState, setCheckListImgState] = useState<any>([]);
  const [teacherImgState, setTeacherImgState] = useState<any>();

  const [changeVisiable, setChangeVisiable] = useState(false);

  // firebase storage의 이 경로에 있는 파일들을 가져옴
  const checkListImgRef = ref(
    storage,
    `lesson/${lessonId.lessonId}/checklist_images`,
  );
  const pamphletsImgRef = ref(
    storage,
    `lesson/${lessonId.lessonId}/pamphlet_images`,
  );

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
        listAll(pamphletsImgRef).then((response: any) => {
          response.items.forEach((item: any) => {
            getDownloadURL(item).then((url) => {
              setPamphletsImgState((prev: any) => [...prev, url]);
            });
          });
        });
        // 준비물 이미지 다운로드해서 checkListImgState에 저장
        listAll(checkListImgRef).then((response: any) => {
          response.items.forEach((item: any) => {
            getDownloadURL(item).then((url) => {
              setCheckListImgState((prev: any) => [...prev, url]);
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
    <div className="lesson-detail-page__container">
      <div className="lesson-detail__header">
        <div className="lesson-detail-img-slider">
          {pamphletsImgState.map((image: any) => (
            <img src={image} alt={image} />
          ))}
        </div>
        <div className="lesson-detail__info">
          <h1>{lessonDetailState.lessonName}</h1>
          <p>
            {lessonDetailState.runningtime === 0
              ? '미정'
              : lessonDetailState.runningtime}{' '}
            시간
          </p>
          {lessonDetailState.profileImg ? (
            // 해당 파트 프로필 이미지 구현되었을 때 firebase로 데이터 불러오는 것과 함께 구현
            <img src={lessonDetailState.profileImg} alt="profileImg" />
          ) : null}
          <p>{lessonDetailState.userName}</p>
          <p>
            <BasicRating />
          </p>
          {/* <p>{lessonDetailState.score ? <BasicRating /> : '평가가 없어요'}</p> */}
          <div>{lessonDetailState.category}</div>
        </div>
      </div>
      <div className="lesson-detail__body">
        <div className="lesson-detail__content">
          <div className="lesson-detail__button">
            <Stack spacing={2} direction="row">
              <Button
                variant={changeVisiable ? 'outlined' : 'contained'}
                onClick={() => setChangeVisiable(false)}
              >
                강의 상세
              </Button>
              <Button
                variant={changeVisiable ? 'contained' : 'outlined'}
                onClick={() => setChangeVisiable(true)}
              >
                강의 후기
              </Button>
            </Stack>
          </div>
          {!changeVisiable ? (
            <div className="lesson-detail__lesson-detail">
              <h2>강의 소개</h2>
              <div className="lesson-detail__lesson-description">
                <p>넣을 예정임~</p>
              </div>
              <h2>커리큘럼</h2>
              <div className="lesson-detail__curriculum">
                {lessonDetailState.curriculums.map((curri: any) => (
                  <h3>
                    Step{curri.stage + 1}. {curri.description}
                  </h3>
                ))}
              </div>
              <h2>준비물</h2>
              <div className="lesson-detail__checklist">
                {checkListImgState.map((image: any) => (
                  <img src={image} alt={image} />
                ))}
                <div>{lessonDetailState.cklsDescription}</div>
              </div>
              <h2>강사 소개</h2>
              <div className="lesson-detail__teacher">
                {lessonDetailState.profileImg ? (
                  // 해당 파트 프로필 이미지 구현되었을 때 firebase로 데이터 불러오는 것과 함께 구현
                  <img src={lessonDetailState.profileImg} alt="profileImg" />
                ) : null}
                <div className="lesson-detail__teacher-text">
                  <h3>{lessonDetailState.userName}</h3>
                  <p>{lessonDetailState.userDesciption}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="lesson-detail__review">
              <h2>강의 후기</h2>
            </div>
          )}
        </div>
        <div className="lesson-detail__reservation">
          <h1>달력 들어올 곳!</h1>
        </div>
      </div>
    </div>
  );
};
export default LessonDetailPage;
