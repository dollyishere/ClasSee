import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import CreateLessonPage from './pages/CreateLessonPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import LessonDetailPage from './pages/LessonDetailPage';
import MyPage from './pages/MyPage';
import UpdateLessonPage from './pages/UpdateLessonPage';
import TestPage from './pages/TestPage';
import Footer from './components/Footer';
import LessonsPage from './pages/LessonsPage';
import useUserApi from './apis/UserApi';
import privateInfoState from './models/PrivateInfoAtom';
import { AccessToken } from './utils/AccessToken';

const Router = () => {
  const { doGetAccessToken } = useUserApi();
  const userInfo = useRecoilValue(privateInfoState);
  // 25분에 한번 accesstoken을 재발급받아온다
  useEffect(() => {
    const timer = setInterval(() => {
      const reAccessToken = async () => {
        if (userInfo) {
          const response = await AccessToken(userInfo, doGetAccessToken);
          console.log(response);
        }
      };
      reAccessToken();
    }, 1500000);

    // 새로고침하면 받아옴
    const rereAccessToken = async () => {
      if (userInfo) {
        const response = await AccessToken(userInfo, doGetAccessToken);
        console.log(response);
      }
    };
    rereAccessToken();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/create-lesson" element={<CreateLessonPage />} />
      <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
      <Route path="/update-lesson/:lessonId" element={<UpdateLessonPage />} />
      <Route path="/lesson/:sessionId/:role" element={<LessonPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/image" element={<TestPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/lessons/*" element={<LessonsPage />} />
    </Routes>
  );
};
export default Router;
