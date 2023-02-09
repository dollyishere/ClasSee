import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import MyAppliedLessonCard from '../MyAppliedLessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import privateInfoState from '../../models/PrivateInfoAtom';
import AuthTokenState from '../../models/AuthTokenAtom';
import useApi from '../../apis/UserApi';
import {
  createHashedPassword,
  encryptToken,
  decryptToken,
} from '../../utils/Encrypt';
// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 신청한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyAppliedLessonsMainpage = () => {
  const { getMyAppliedLessonsMainpage } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);
  const accessToken = useRecoilValue(AuthTokenState);
  const [authToken, setAuthToken] = useRecoilState(AuthTokenState);
  const { doGetAccessToken } = useApi();

  useEffect(() => {
    // if (userInfo && userInfo.email) {
    //   if (accessToken == null) {
    //     const hashedRefreshToken = localStorage.getItem('refreshToken');
    //     if (hashedRefreshToken !== null) {
    //       const refreshToken = decryptToken(hashedRefreshToken, userInfo.email);
    //       const response = doGetAccessToken(userInfo.email, refreshToken);
    //       if (response) {
    //         console.log('durldurldurl', response);
    // const encryptedToken = encryptToken(
    //   response.headers.refreshtoken,
    //   userInfo.email,
    // );
    // localStorage.setItem('refreshToken', encryptedToken);
    // const authtoken = response;
    // setAuthToken(authtoken);
    //     }
    //   }
    // }
    // console.log(accessToken);
    //     getMyAppliedLessonsMainpage(
    //       userInfo.email,
    //       2,
    //       0,
    //       'TODO',
    //       accessToken,
    //     ).then((res: LessonsResponse) => {
    //       console.log('내가 신청한 강의', res.lessonInfoList);
    //       setLessons(res.lessonInfoList);
    //     });
    //   }
  }, []);
  return (
    <div className="applylessons">
      <h1 className="applylessons__title"> 신청한 클래스 </h1>
      <div className="applylessons__cards">
        {lessons ? (
          lessons.map((lesson: Lesson) => (
            <MyAppliedLessonCard lesson={lesson} key={lesson.lessonId} />
          ))
        ) : (
          <div>no Created</div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedLessonsMainpage;
