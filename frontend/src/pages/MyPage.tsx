import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import TestPage from './TestPage';
import MyCreatedLessonDetailPage from './MyCreatedLessonDetailPage';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { SidebarItem, SidebarProps } from '../types/SidebarType';

const MyPage = () => {
  const sidebarItems: Array<SidebarItem> = [
    { name: '내 정보', path: '/mypage' },
    { name: '개설한 클래스', path: '/mypage/created-lesson' },
    { name: '신청한 클래스', path: '/mypage/applied-lesson' },
    { name: '북마크', path: '/mypage/bookmark' },
    { name: '포토북', path: '/mypage/photo-book' },
    { name: '작성한 후기', path: '/mypage/review' },
  ];
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
            <Route
              path="/created-lesson/:lessonId"
              element={<MyCreatedLessonDetailPage />}
            />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
