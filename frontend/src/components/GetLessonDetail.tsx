import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Stack, Button, Card, CardContent } from '@mui/material';

import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../utils/Firebase';

import {
  LessonDetailProps,
  LessonDetailRequest,
  LessonDetailResponse,
  CurriculumsType,
  CheckListsType,
  PamphletsType,
} from '../types/LessonDetailType';

import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';

import LessonDetailPage from '../pages/LessonDetailPage';
import PrivateInfoState from '../models/PrivateInfoAtom';

const GetLessonDetail = ({
  lessonId,
  lessonDetailState,
  setLessonDetailState,
  pamphletsImgState,
  setPamphletsImgState,
  checkListImgState,
  setCheckListImgState,
  teacherImgState,
  setTeacherImgState,
  schedulesListState,
  setScheduleListState,
  scheduleInputState,
  setScheduleInputState,
}: LessonDetailProps) => {
  // api 실행할 시 실행될 CreateLessonViewModel createLesson에 할당
  const { getLessonDetail } = LessonDetailViewModel();

  // firebase storage의 이 경로에 있는 파일들을 가져옴
  const checkListImgRef = ref(storage, `lessons/${lessonId}/checklist_images`);
  const pamphletsImgRef = ref(storage, `lessons/${lessonId}/pamphlet_images`);

  // const handleLessonDelete = (event: React.MouseEvent<HTMLButtonElement>) => {};
  // useEffect로 해당 페이지 렌더링 시 강의 상세 정보를 받아오도록 내부 함수 실행
  const fetchData = async (getLessonDetailRequestBody: LessonDetailRequest) => {
    const res = await getLessonDetail(getLessonDetailRequestBody);
    if (res?.message === 'SUCCESS') {
      // 만약 강의 상세 정보를 db에서 받아오는 것에 성공했다면, lessonDetailState에 해당 정보를 저장
      setLessonDetailState(res);
      // firebase의 해당 강의가 저장된 폴더의 url에 접근하여 해당하는 이미지 파일을 각각 다운받음
      // 강의 관련 사진 다운로드해서 pamphletsImgState에 저장
      if (lessonDetailState.pamphlets) {
        listAll(pamphletsImgRef).then((response: any) => {
          response.items.forEach((item: any) => {
            getDownloadURL(item).then((url) => {
              setPamphletsImgState((prev: any) => [...prev, url]);
            });
          });
        });
      }
      // 준비물 이미지 다운로드해서 checkListImgState에 저장
      if (lessonDetailState.checkLists) {
        listAll(checkListImgRef).then((response: any) => {
          response.items.forEach((item: any) => {
            getDownloadURL(item).then((url) => {
              setCheckListImgState((prev: any) => [...prev, url]);
            });
          });
        });
      }
    } else {
      alert(res?.message);
    }
  };

  return {
    fetchData,
  };
};
export default GetLessonDetail;
