import React, { useState, useEffect, useRef } from 'react';
import { Divider } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useTimeStamp from '../utils/TimeStamp';
import useViewModel from '../viewmodels/NoticeViewModel';
import PrivateInfoState from '../models/PrivateInfoAtom';

const CreateNoticePage = () => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { createNotice } = useViewModel();
  const navigate = useNavigate();
  const { toDate } = useTimeStamp();

  const handleNoticeSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      titleRef.current !== null &&
      contentRef.current !== null &&
      userInfo !== null
    ) {
      const title = titleRef.current.value;
      const content = titleRef.current.value;
      const response = await createNotice({
        email: userInfo.email,
        img: '',
        content,
        title,
      });
      if (response.statusCode === 200) {
        navigate('/notice');
      }
    }
  };
  useEffect(() => {
    if (userInfo === null || userInfo.userRole !== 'ROLE_ADMIN') {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
  }, []);
  return (
    <div className="create-notice-page">
      <Header />
      <div className="create-notice-page__contents">
        <div className="create-notice-page__title">공지사항</div>
        <form
          className="create-notice-page__form"
          onSubmit={handleNoticeSubmit}
        >
          <div className="create-notice-page__row">
            <div className="create-notice-page__label">제목</div>
            <input
              type="text"
              className="create-notice-page__input"
              ref={titleRef}
              placeholder="제목을 입력해주세요"
            />
            <div className="create-notice-page__date">{toDate()}</div>
          </div>
          <Divider
            variant="middle"
            style={{
              backgroundColor: 'black',
            }}
          />
          <div className="create-notice-page__row">
            <div className="create-notice-page__label">내용</div>
            <textarea ref={contentRef} placeholder="내용을 입력해주세요" />
          </div>
          <div className="create-notice-page__row">
            <button type="submit" className="button create-notice-page__button">
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoticePage;
