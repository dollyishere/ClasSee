import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import CreateLessonPage from './pages/CreateLessonPage';
import VideoCallPage from './pages/VideoCallPage';
import LoginPage from './pages/LoginPage';
import LessonDetailPage from './pages/LessonDetailPage';
import MyPage from './pages/MyPage';
import UpdateLessonPage from './pages/UpdateLessonPage';
import FindPwPage from './pages/FindPwPage';
import TestPage from './pages/TestPage';
import Footer from './components/Footer';
import LessonsPage from './pages/LessonsPage';
import useUserApi from './apis/UserApi';
import privateInfoState from './models/PrivateInfoAtom';
import { AccessToken } from './utils/AccessToken';
import PhotoCardQRPage from './pages/PhotoCardQRPage';
import CreatePhotoCardPage from './pages/CreatePhotoCardPage';

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
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/create-lesson" element={<CreateLessonPage />} />
      <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
      <Route path="/update-lesson/:lessonId" element={<UpdateLessonPage />} />
      <Route path="/lesson/:sessionId/:role" element={<VideoCallPage />} />
      <Route
        path="/lesson/:sessionId/:role/photo-card/qr"
        element={<PhotoCardQRPage />}
      />
      <Route path="/photo-card/create" element={<CreatePhotoCardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/image" element={<TestPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/find-pw" element={<FindPwPage />} />
      <Route path="/lessons/*" element={<LessonsPage />} />
    </Routes>
  );
};
export default Router;
