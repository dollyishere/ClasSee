import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LessonCard from '../LessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import privateInfoState from '../../models/PrivateInfoAtom';
import AuthTokenState from '../../models/AuthTokenAtom';
import useUserApi from '../../apis/UserApi';
import { encryptToken, decryptToken } from '../../utils/Encrypt';
import { AccessToken } from '../../utils/AccessToken';

// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 개설한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyCreatedLessonsMainpage = () => {
  // 내가 개설한 강의 2개 가져오는 함수
  const { doGetAccessToken } = useUserApi();
  const { getMyCreatedLessonsMainpage } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);
  // 메인페이지 마운트 시 강의 정보들 요청
  const [accessToken, setAccessToken] = useRecoilState(AuthTokenState);

  // if (userInfo && userInfo.email) {
  //   if (accessToken == null) {
  //     const hashedRefreshToken = localStorage.getItem('refreshToken');
  //     if (hashedRefreshToken) {
  //       const refreshtoken = decryptToken(hashedRefreshToken, userInfo.email);
  //       if (refreshtoken) {
  //         const response = await doGetAccessToken(
  //           userInfo.email,
  //           refreshtoken,
  //         );
  //         if (response && response.headers) {
  //           const authtoken = response?.headers.authorization.substring(7);
  //           const newRefreshtoken = response?.headers['refresh-token'];
  //           localStorage.setItem('refreshToken', newRefreshtoken);
  //           setAccessToken(authtoken);
  //           const encryptedToken = encryptToken(
  //             newRefreshtoken,
  //             userInfo.email,
  //           );
  //           localStorage.setItem('refreshToken', encryptedToken);
  //           getMyCreatedLessonsMainpage(
  //             userInfo.email,
  //             2,
  //             0,
  //             'TODO',
  //             authtoken,
  //           ).then((res: LessonsResponse) => {
  //             console.log('내가 개설한 강의1', res.lessonInfoList);
  //             setLessons(res.lessonInfoList);
  //           });
  //         }
  //       }
  //     }
  //   } else {
  //     getMyCreatedLessonsMainpage(
  //       userInfo.email,
  //       2,
  //       0,
  //       'TODO',
  //       accessToken,
  //     ).then((res: LessonsResponse) => {
  //       console.log('내가 개설한 강의2', res.lessonInfoList);
  //       setLessons(res.lessonInfoList);
  //     });
  //   }
  // }

  useEffect(() => {
    const handleGetAccessToken = async () => {
      if (userInfo && userInfo.email) {
        if (accessToken == null) {
          const res = await AccessToken();
          console.log('ddddddddd');
        }
      }
    };
    handleGetAccessToken();
  }, []);
  //   if (userInfo && userInfo.email) {
  //     if (accessToken == null) {
  //       const hashedRefreshToken = localStorage.getItem('refreshToken');
  //       if (hashedRefreshToken) {
  //         const refreshToken = decryptToken(hashedRefreshToken, userInfo.email);
  //         if (refreshToken) {
  //           const response = await doGetAccessToken(
  //             userInfo.email,
  //             refreshToken,
  //           );
  //           if (response && response.headers) {
  //             const accesstoken = response.headers.accesstoken;
  //             setAccessToken(accesstoken);
  //           }
  //         }
  //       }
  //     }
  //   }
  // });
  // useEffect(() => {
  //   if (userInfo !== null && userInfo.email) {
  //     getMyCreatedLessonsMainpage(
  //       userInfo.email,
  //       2,
  //       0,
  //       'TODO',
  //       accessToken,
  //     ).then((res: LessonsResponse) => {
  //       console.log('내가 개설한 강의', res.lessonInfoList);
  //       setLessons(res.lessonInfoList);
  //     });
  //   }
  // }, []);

  return (
    <div className="createlessons">
      <h1 className="createlessons__title"> 개설한 클래스 </h1>
      {lessons ? (
        <div className="createlessons__cards">
          {lessons.map((lesson: Lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
          ))}
        </div>
      ) : (
        <div>no Created</div>
      )}
    </div>
  );
};

export default MyCreatedLessonsMainpage;
