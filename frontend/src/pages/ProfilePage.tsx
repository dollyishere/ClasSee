import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Card, CardContent } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';

import privateInfoState from '../models/PrivateInfoAtom';
import authTokenState from '../models/AuthTokenAtom';
import useViewModel from '../viewmodels/ProfileViewModel';

const ProfilePage = () => {
  const [image, setImage] = useState<any>(null);
  const navigate = useNavigate();
  // const userInfo = useRecoilValue(privateInfoState);
  const userInfo = {
    img: null,
    nickname: 'taejin',
    point: 0,
    name: 'kotaejin',
    email: '12@12.com',
    phone: '01012345678',
    pasword: '1234',
    address: 'house',
    description: 'test',
  };

  useEffect(() => {
    // if (userInfo === null) {
    //   alert('로그인 후 이용 가능합니다.');
    //   navigate('/login');
    // }
  }, []);

  return (
    <div className="profile-page">
      {userInfo !== null ? (
        <Card className="profile-page__card">
          <CardContent>
            <div className="profile-page__header">
              <div className="profile-page__photo">
                {userInfo.img === null ? (
                  <div className="profile-page__photo--not">
                    <PersonOutline
                      style={{
                        fontSize: '200px',
                      }}
                    />
                  </div>
                ) : (
                  '있음'
                )}
                <div className="photo-page__photo--change">
                  <label htmlFor="profile-page__photo-input">
                    프로필 변경
                    <input
                      type="file"
                      placeholder="프로필 변경"
                      id="profile-page__photo-input"
                    />
                  </label>
                </div>
              </div>
              <div className="profile-page__sub-header">
                <div className="profile-page__section--nickname">
                  <div className="profile-page__nickname">
                    <span>{userInfo.nickname}</span>님 안녕하세요!
                  </div>
                  <div className="profile-page__buttons">
                    <button
                      type="button"
                      className="button profile-page__button"
                    >
                      닉네임 변경
                    </button>
                  </div>
                </div>
                <div className="profile-page__section--point">
                  <div className="profile-page__point">
                    <span>{userInfo.point}</span> P
                  </div>
                  <div className="profile-page__buttons">
                    <button
                      type="button"
                      className="button profile-page__button"
                    >
                      포인트 충전
                    </button>
                    <button
                      type="button"
                      className="button profile-page__button"
                    >
                      포인트 정산
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-page__info">
              <div className="profile-page__section">
                <div className="profile-page__section--label">이름</div>
                <div className="profile-page__section--content">
                  {userInfo.name}
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">이메일</div>
                <div className="profile-page__section--content">
                  {userInfo.email}
                </div>
                <div className="profile-page__buttons">
                  <button type="button" className="button profile-page__button">
                    이메일 변경
                  </button>
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">비밀번호</div>
                <div className="profile-page__section--content">******</div>
                <div className="profile-page__buttons">
                  <button type="button" className="button profile-page__button">
                    비밀번호 변경
                  </button>
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">전화번호</div>
                <div className="profile-page__section--content">
                  {userInfo.phone}
                </div>
                <div className="profile-page__buttons">
                  <button type="button" className="button profile-page__button">
                    전화번호 변경
                  </button>
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">주소</div>
                <div className="profile-page__section--content">
                  {userInfo.address}
                </div>
                <div className="profile-page__buttons">
                  <button type="button" className="button profile-page__button">
                    주소 변경
                  </button>
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">소개</div>
                <div className="profile-page__section--content">
                  <textarea placeholder={userInfo.description} />
                </div>
                <div className="profile-page__buttons">
                  <button type="button" className="button profile-page__button">
                    소개 변경
                  </button>
                </div>
              </div>
            </div>
            <button type="button" className="button profile-page__withdrawl">
              회원탈퇴
            </button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default ProfilePage;
