import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ProfilePage from './ProfilePage';
import TestPage from './TestPage';
import MyCreatedLessonsPage from './MyCreatedLessonsPage';
import MyCreatedLessonDetailPage from './MyCreatedLessonDetailPage';
import MyAppliedLessonsPage from './MyAppliedLessonPage';
import MyBookmarkPage from './MyBookmarkPage';
import MyPhotoBookPage from './MyPhotoBookPage';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { SidebarItem, SidebarProps } from '../types/SidebarType';
import PointChargePage from './PointChargePage';
import PrivateInfoState from '../models/PrivateInfoAtom';

const MyPage = () => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const navigate = useNavigate();
  const sidebarItems: Array<SidebarItem> = [
    { name: '내 정보', path: '/mypage' },
    { name: '개설한 클래스', path: '/mypage/created-lesson' },
    { name: '신청한 클래스', path: '/mypage/applied-lesson' },
    { name: '북마크', path: '/mypage/bookmark' },
    { name: '포토북', path: '/mypage/photo-book' },
    { name: '작성한 후기', path: '/mypage/review' },
  ];

  useEffect(() => {
    if (userInfo === null) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);
  return (
    <div className="my-page page">
      <Header />
      <div className="my-page__contents">
        <Sidebar
          items={sidebarItems}
          onSidebarClick={(item: string) => {
            console.log(item);
          }}
        />
        <div className="my-page__sub-page">
          <Routes>
            <Route path="" element={<ProfilePage />} />
            <Route path="/point" element={<PointChargePage />} />
            <Route
              path="/created-lesson/:lessonId"
              element={<MyCreatedLessonDetailPage />}
            />
            <Route path="/created-lesson" element={<MyCreatedLessonsPage />} />
            <Route path="/applied-lesson" element={<MyAppliedLessonsPage />} />
            <Route path="/bookmark" element={<MyBookmarkPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/photo-book" element={<MyPhotoBookPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
