import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button, Card } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StickyBox from 'react-sticky-box';

import Carousel from 'react-material-ui-carousel';
import sadFace from '../assets/sad_face.png';

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
import CheckSchedule from '../components/LessonDetailPage/CheckSchedule';
import ReviewsInput from '../components/LessonDetailPage/Review';

const LessonDetailPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();
  const navigate = useNavigate();

  // api를 통해 받아온 강의 상세 정보를 저장할 lessonDetailState 생성
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
    });

  // api 실행할 시 실행될 CreateLessonModel createLesson에 할당
  const { getLessonDetail, getPamphletImgUrls, getCheckImgUrls } =
    LessonDetailViewModel();
  const { getProfileImage } = useViewModel();
  const [isReady, setIsReady] = useState(false);

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
    const fetchData = async () => {
      const res = await getLessonDetail(getLessonDetailRequestBody);
      if (res?.message === 'SUCCESS') {
        // 만약 강의 상세 정보를 db에서 받아오는 것에 성공했다면, lessonDetailState에 해당 정보를 저장
        setLessonDetailState(res);
        // firebase의 해당 강의가 저장된 폴더의 url에 접근하여 해당하는 이미지 파일을 각각 다운받음
        // 강의 관련 사진 다운로드해서 pamphletsImgState에 저장
        getPamphletImgUrls(res.pamphlets, Number(lessonId.lessonId)).then(
          (urls: any) => {
            setPamphletsImgState(urls);
          },
        );
        getCheckImgUrls(res.checkLists, Number(lessonId.lessonId)).then(
          (urls: any) => {
            setCheckListImgState(urls);
          },
        );
        if (res?.teacherImage) {
          const imageUrl = await getProfileImage(res.teacherImage);
          setTeacherImgState(imageUrl);
        }
      } else {
        alert(res?.message);
      }
    };
    fetchData();
    setIsReady(true);
  }, []);
  return (
    <div>
      {isReady ? (
        <div className="lesson-detail-page__container">
          <Header />
          <div className="lesson-detail-page__header">
            <div className="lesson-detail-page-img-slider">
              <div className="carousel-wrapper">
                <Carousel
                  autoPlay
                  swipe
                  animation="slide"
                  cycleNavigation
                  navButtonsAlwaysVisible
                  indicators={false}
                  height="300px"
                >
                  {pamphletsImgState.map((item: any, i: number) => {
                    console.log(item);
                    return (
                      <div className="carousel__item">
                        <img src={item} alt={item} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
            <div className="lesson-detail-page__info">
              <div className="lesson-detail-page__name-time-box">
                <h1 className="lesson-detail-page__lessonName">
                  {lessonDetailState.lessonName}
                  <span className="lesson-detail-page__lessonTime">
                    <AccessTimeFilledIcon />
                    {lessonDetailState.runningTime === 0
                      ? '미정'
                      : `${lessonDetailState.runningTime}시간`}
                  </span>
                </h1>
              </div>
              <div className="lesson-detail-page__header-teacher-info">
                {teacherImgState === null ? (
                  <div className="lesson-detail-page__teacher-image--not">
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
                    className="lesson-detail-page__teacher-image"
                  />
                )}
                <p className="lesson-detail-page__teacher-name">
                  {lessonDetailState.userName}
                </p>
              </div>
              <div className="lesson-detail-page__rating-none">
                {lessonDetailState.score ? (
                  <BasicRating
                    ratingValue={Math.round(lessonDetailState.score * 10) / 10}
                    setRatingValue={setRatingValue}
                    disableValue={disableValue}
                  />
                ) : (
                  <div className="lesson-detail-page__rating-none">
                    <p>아직 평가가 없어요</p>
                    <img
                      src={sadFace}
                      alt={sadFace}
                      className="lesson-detail-page__sad-image"
                    />
                  </div>
                )}
              </div>
              <div className="lesson__category">
                <div className="lesson__category--text">
                  {lessonDetailState.category}
                </div>
              </div>
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
                  <h2 className="lesson-detail-page__part-title">강의 소개</h2>
                  <div className="lesson-detail-page__lesson-description">
                    <pre>{lessonDetailState.lessonDescription}</pre>
                  </div>
                  <h2 className="lesson-detail-page__part-title">커리큘럼</h2>
                  <div className="lesson-detail-page__lesson-description">
                    {lessonDetailState.curriculums.map((curri: any) => (
                      <h3>
                        Step{curri.stage + 1}. {curri.description}
                      </h3>
                    ))}
                  </div>
                  <h2 className="lesson-detail-page__part-title">준비물</h2>
                  <div className="lesson-detail-page__lesson-description">
                    {checkListImgState.map((image: any) => (
                      <img className="lesson_img" src={image} alt={image} />
                    ))}
                    <div>
                      <pre>{lessonDetailState.cklsDescription}</pre>
                    </div>
                  </div>
                  <h2 className="lesson-detail-page__part-title">강사 소개</h2>
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
                  <h2 className="lesson-detail-page__part-title">강의 후기</h2>
                  <div>
                    <ReviewsInput />
                  </div>
                </div>
              )}
            </div>
            <div className="lesson-detail-page__reservation">
              <StickyBox offsetTop={100} offsetBottom={100}>
                <CheckSchedule />
              </StickyBox>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default LessonDetailPage;
