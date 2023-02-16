import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, Modal, Box } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';

import privateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/ProfileViewModel';

const ProfilePage = () => {
  const [image, setImage] = useState<string>();
  const navigate = useNavigate();
  const userInfo = useRecoilValue(privateInfoState);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isPwModalOpen, setIsPwModalOpen] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const {
    uploadProfileImage,
    getProfileImage,
    updateNickName,
    updatePhone,
    updateAddress,
    updateDescription,
    updatePassword,
    withdrawl,
    getUserInfo,
  } = useViewModel();

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null && userInfo !== null) {
      const uploadedImage = await uploadProfileImage(
        e.currentTarget.files[0],
        userInfo.email,
      );
      setImage(uploadedImage);
    }
  };

  const handleUpdateNickName = async () => {
    if (userInfo !== null) {
      const nickname = prompt('변경할 닉네임을 입력하세요.', userInfo.nickname);
      if (nickname !== null) {
        updateNickName(userInfo.email, nickname);
      }
    }
  };

  const handleUpdatePhone = async () => {
    if (userInfo !== null) {
      const phone = prompt('변경할 전화번호를 입력하세요.', userInfo.phone);
      if (phone !== null) {
        updatePhone(phone);
      }
    }
  };

  const handleUpdateAddress = async () => {
    if (userInfo !== null) {
      const address = prompt('변경할 주소를 입력하세요.', userInfo.address);
      if (address !== null) {
        updateAddress(address);
      }
    }
  };

  const handleUpdateDescription = async () => {
    if (descriptionRef.current !== null) {
      updateDescription(descriptionRef.current.value);
    }
  };

  const openPwModal = () => setIsPwModalOpen(true);
  const closePwModal = () => setIsPwModalOpen(false);

  const handleUpdatePassword = async () => {
    if (passwordRef.current !== null && passwordCheckRef.current !== null) {
      if (passwordRef.current.value === passwordCheckRef.current.value) {
        updatePassword(passwordRef.current.value);
        closePwModal();
      } else {
        alert('비밀번호가 일치하지 않습니다.');
        passwordRef.current.value = '';
        passwordCheckRef.current.value = '';
      }
    }
  };

  const handleWithdrawl = async () => {
    const email = prompt(
      '회원 탈퇴를 진행합니다. 정말 탈퇴를 원하실 경우 이메일을 입력해주세요.',
    );
    if (email === userInfo?.email) {
      const response = await withdrawl();
      if (response === 200) {
        alert('탈퇴 처리되셨습니다.');
        navigate('/');
      }
    }
  };

  const handlePointCharge = () => {
    navigate('/mypage/point');
  };

  useEffect(() => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      const getData = async () => {
        const response = await getUserInfo(userInfo.email);
        const imageUrl = await getProfileImage(response.img);
        setImage(imageUrl);
      };
      getData();
    }
  }, []);

  return (
    <div className="profile-page">
      {userInfo !== null ? (
        <Card className="profile-page__card">
          <CardContent>
            <div className="profile-page__header">
              <div className="profile-page__image">
                {image === null ? (
                  <div className="profile-page__image--not">
                    <PersonOutline
                      style={{
                        fontSize: '200px',
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={image}
                    alt={image}
                    className="profile-page__image--not"
                  />
                )}
                <div className="profile-page__image--change">
                  <label htmlFor="profile-page__image-input">
                    프로필 변경
                    <input
                      type="file"
                      placeholder="프로필 변경"
                      id="profile-page__image-input"
                      onChange={upload}
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
                      onClick={handleUpdateNickName}
                    >
                      닉네임 변경
                    </button>
                  </div>
                </div>
                <div className="profile-page__section--point">
                  <div className="profile-page__point">
                    <span>{userInfo.point.toLocaleString()}</span> P
                  </div>
                  <div className="profile-page__buttons">
                    <button
                      type="button"
                      className="button profile-page__button"
                      onClick={handlePointCharge}
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
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">비밀번호</div>
                <div className="profile-page__section--content">******</div>
                <div className="profile-page__buttons">
                  <button
                    type="button"
                    className="button profile-page__button"
                    onClick={openPwModal}
                  >
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
                  <button
                    type="button"
                    className="button profile-page__button"
                    onClick={handleUpdatePhone}
                  >
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
                  <button
                    type="button"
                    className="button profile-page__button"
                    onClick={handleUpdateAddress}
                  >
                    주소 변경
                  </button>
                </div>
              </div>
              <div className="profile-page__section">
                <div className="profile-page__section--label">소개</div>
                <div className="profile-page__section--content">
                  <textarea
                    ref={descriptionRef}
                    defaultValue={userInfo.description}
                  />
                </div>
                <div className="profile-page__buttons">
                  <button
                    type="button"
                    className="button profile-page__button"
                    onClick={handleUpdateDescription}
                  >
                    소개 변경
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="button profile-page__withdrawl"
              onClick={handleWithdrawl}
            >
              회원탈퇴
            </button>
          </CardContent>
        </Card>
      ) : null}
      <Modal
        open={isPwModalOpen}
        onClose={closePwModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="profile-page__modal">
          <form onSubmit={handleUpdatePassword}>
            <div className="profile-page__modal--row">
              <div className="profile-page__modal--label">비밀번호</div>
              <input
                type="password"
                className="profile-page__input"
                ref={passwordRef}
              />
            </div>
            <div className="profile-page__modal--row">
              <div className="profile-page__modal--label">비밀번호</div>
              <input
                type="password"
                className="profile-page__input"
                ref={passwordCheckRef}
              />
            </div>
            <button type="submit" className="button">
              비밀변호 변경
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
