import React from 'react';
import { Card, CardContent } from '@mui/material';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Card className="profile-page__card">
        <CardContent>
          <div className="profile-page__header">
            <div className="profile-page__photo">사진</div>
            <div className="profile-page__sub-header">
              <div className="profile-page__nickname">닉네임</div>
              <div className="profile-page__point">포인트</div>
            </div>
          </div>
          <div>
            <div>이름</div>
            <div>이메일</div>
            <div>비밀번호</div>
            <div>주소</div>
            <div>소개</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
