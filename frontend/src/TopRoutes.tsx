import React, { useEffect, useState } from 'react';
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
import LessonEnrollPage from './pages/LessonEnrollPage';
import FindPwPage from './pages/FindPwPage';
import TestPage from './pages/TestPage';
import Footer from './components/Footer';
import LessonsPage from './pages/LessonsPage';
import useUserApi from './apis/UserApi';
import privateInfoState from './models/PrivateInfoAtom';
import { AccessToken } from './utils/AccessToken';
import PhotoCardQRPage from './pages/PhotoCardQRPage';
import CreatePhotoCardPage from './pages/CreatePhotoCardPage';
import PhotoCardsPage from './pages/PhotoCardsPages';
import NoticePage from './pages/NoticePage';
import CreateNoticePage from './pages/CreateNoticePage';
import NoticeDetailPage from './pages/NoticeDetailPage';

const Router = () => {
  // 최초 렌더링 때 localstorage 초기화하기 위한 flag
  const [flag, setFlag] = useState<boolean>(true);
  const { doGetAccessToken } = useUserApi();
  const userInfo = useRecoilValue(privateInfoState);
  // 25분에 한번 accesstoken을 재발급받아온다
  useEffect(() => {
    if (flag) {
      localStorage.clear();
    }
    setFlag(!flag);
    const timer = setInterval(() => {
      const reAccessToken = async () => {
        if (userInfo) {
          const response = await AccessToken(userInfo, doGetAccessToken);
        }
      };
      reAccessToken();
    }, 1500000);

    // 새로고침하면 받아옴
    const reReAccessToken = async () => {
      if (userInfo) {
        const response = await AccessToken(userInfo, doGetAccessToken);
      }
    };
    reReAccessToken();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/create-lesson" element={<CreateLessonPage />} />
      <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
      <Route path="/update-lesson/:lessonId" element={<UpdateLessonPage />} />
      <Route
        path="/enroll-lesson/:lessonId/:openLessonId"
        element={<LessonEnrollPage />}
      />
      <Route
        path="/lesson/:lessonId/:openLessonId/:role"
        element={<VideoCallPage />}
      />
      <Route
        path="/lesson/photo-card/qr/:lessonId/:openLessonId"
        element={<PhotoCardQRPage />}
      />
      <Route
        path="/photo-card/create/:lessonId/:openLessonId/:email"
        element={<CreatePhotoCardPage />}
      />
      <Route path="/photo-card" element={<PhotoCardsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/image" element={<TestPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/find-pw" element={<FindPwPage />} />
      <Route path="/lessons/*" element={<LessonsPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/write" element={<CreateNoticePage />} />
      <Route path="/notice/write/:noticeId" element={<CreateNoticePage />} />
      <Route path="/notice/:noticeId" element={<NoticeDetailPage />} />
    </Routes>
  );
};
export default Router;
