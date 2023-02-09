import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';

import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../utils/Firebase';

import {
  LessonDetailRequest,
  LessonDetailResponse,
  CurriculumsType,
  ImageListType,
} from '../types/LessonsType';

import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';
import useViewModel from '../viewmodels/ProfileViewModel';

import privateInfoState from '../models/PrivateInfoAtom';

import Header from '../components/Header';
import BasicRating from '../components/BasicRating';
import CheckSchedule from '../components/CheckSchedule';

const LessonDetailPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();
  const navigate = useNavigate();

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
      checkLists: [] as ImageListType[],
      pamphlets: [] as ImageListType[],
      score: 0 as number,
      bookMarked: false as boolean,
    });

  // api 실행할 시 실행될 CreateLessonModel createLesson에 할당
  const { getLessonDetail } = LessonDetailViewModel();
  const { getProfileImage } = useViewModel();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(privateInfoState);

  // 강의 소개 & 준비물 이미지 파일을 담을 State 각각 생성
  const [pamphletsImgState, setPamphletsImgState] = useState<any>([]);
  const [checkListImgState, setCheckListImgState] = useState<any>([]);
  const [teacherImgState, setTeacherImgState] = useState<any>();

  const [changeVisiable, setChangeVisiable] = useState(false);

  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const disableValue = true as boolean;

  // useEffect로 해당 페이지 렌더링 시 강의 상세 정보를 받아오도록 내부 함수 실행
  useEffect(() => {
    const getLessonDetailRequestBody: LessonDetailRequest = {
      lessonId: Number(lessonId.lessonId),
    };
    const getTeacherImage = async () => {
      const imageUrl = await getProfileImage(lessonDetailState.teacherEmail);
      setTeacherImgState(imageUrl);
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
          const imgRef = ref(
            storage,
            `lessons/${lessonId.lessonId}/pamphlet_images/${imageName}`,
          );
          getDownloadURL(imgRef).then((url: any) => {
            setPamphletsImgState((prev: any) => [...prev, url]);
          });
        });
        res.checkLists.forEach((item) => {
          const imageName = item.img as string;
          const imgRef = ref(
            storage,
            `lessons/${lessonId.lessonId}/checklist_images/${imageName}`,
          );
          getDownloadURL(imgRef).then((url: any) => {
            setCheckListImgState((prev: any) => [...prev, url]);
          });
        });
      } else {
        alert(res?.message);
      }
    };
    fetchData();
    getTeacherImage();
  }, []);
  return (
    <div className="lesson-detail-page__container">
      <Header />
      <div className="lesson-detail-page__header">
        <div className="lesson-detail-page-img-slider">
          {pamphletsImgState.map((image: any) => (
            <img src={image} alt={image} />
          ))}
        </div>
        <div className="lesson-detail-page__info">
          <h1>{lessonDetailState.lessonName}</h1>
          <p>
            {lessonDetailState.runningTime === 0
              ? '미정'
              : lessonDetailState.runningTime}{' '}
            시간
          </p>
          {teacherImgState === null ? (
            <div className="profile-page__image--not">
              <PersonOutline
                style={{
                  fontSize: '200px',
                }}
              />
            </div>
          ) : (
            <img
              src={teacherImgState}
              alt={teacherImgState}
              className="profile-page__image--not"
            />
          )}
          <p>{lessonDetailState.userName}</p>
          <p>
            {lessonDetailState.score ? (
              <BasicRating
                ratingValue={lessonDetailState.score}
                setRatingValue={setRatingValue}
                disableValue={disableValue}
              />
            ) : (
              '평가가 없어요'
            )}
          </p>
          <div>{lessonDetailState.category}</div>
        </div>
      </div>
      <div className="lesson-detail-page__body">
        <div className="lesson-detail-page__content">
          <div className="lesson-detail-page__button">
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
            <div className="lesson-detail-page__box">
              <h2>강의 소개</h2>
              <div className="lesson-detail-page__lesson-description">
                <p>{lessonDetailState.lessonDescription}</p>
              </div>
              <h2>커리큘럼</h2>
              <div className="lesson-detail-page__curriculum">
                {lessonDetailState.curriculums.map((curri: any) => (
                  <h3>
                    Step{curri.stage + 1}. {curri.description}
                  </h3>
                ))}
              </div>
              <h2>준비물</h2>
              <div className="lesson-detail-page__checklist">
                {checkListImgState.map((image: any) => (
                  <img src={image} alt={image} />
                ))}
                <div>{lessonDetailState.cklsDescription}</div>
              </div>
              <h2>강사 소개</h2>
              <div className="lesson-detail-page__teacher">
                {teacherImgState === null ? (
                  <div className="profile-page__image--not">
                    <PersonOutline
                      style={{
                        fontSize: '200px',
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={teacherImgState}
                    alt={teacherImgState}
                    className="profile-page__image--not"
                  />
                )}
                <div className="lesson-detail-page__teacher-text">
                  <h3>{lessonDetailState.userName}</h3>
                  <p>{lessonDetailState.userDesciption}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="lesson-detail-page__review">
              <h2>강의 후기</h2>
            </div>
          )}
        </div>
        <div className="lesson-detail-page__reservation">
          <CheckSchedule />
        </div>
      </div>
    </div>
  );
};
export default LessonDetailPage;
