import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Card, CardContent } from '@mui/material';

import privateInfoState from '../models/PrivateInfoAtom';
import authTokenState from '../models/AuthTokenAtom';
import useViewModel from '../viewmodels/ProfileViewModel';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(privateInfoState);

  useEffect(() => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    }
  }, []);

  return (
    <div className="profile-page">
      {userInfo !== null ? (
        <Card className="profile-page__card">
          <CardContent>
            <div className="profile-page__header">
              <div className="profile-page__photo">
                {userInfo.img === null ? '없음' : '있음'}
              </div>
              <div className="profile-page__sub-header">
                <div className="profile-page__nickname">
                  <span>{userInfo.nickname}</span>님 안녕하세요!
                </div>
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
      ) : null}
    </div>
  );
};

export default ProfilePage;
