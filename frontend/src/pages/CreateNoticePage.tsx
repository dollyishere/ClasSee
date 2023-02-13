import React, { useState, useEffect, useRef } from 'react';
import { Divider } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import useTimeStamp from '../utils/TimeStamp';
import useViewModel from '../viewmodels/NoticeViewModel';
import PrivateInfoState from '../models/PrivateInfoAtom';
import { NoticeType } from '../types/NoticeType';
import Footer from '../components/Footer';

const CreateNoticePage = () => {
  const location = useLocation();
  const userInfo = useRecoilValue(PrivateInfoState);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [noticeId, setNoticeId] = useState<string | undefined>(
    location.pathname.split('/')[3],
  );
  const { createNotice, getNotice, updateNotice } = useViewModel();
  const navigate = useNavigate();
  const { toDate } = useTimeStamp();
  const [notice, setNotice] = useState<NoticeType>();

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
      const content = contentRef.current.value;
      if (noticeId === undefined) {
        const response = await createNotice({
          email: userInfo.email,
          img: '',
          content,
          title,
        });
        if (response.statusCode === 200) {
          navigate('/notice');
        }
      } else {
        const response = await updateNotice(
          {
            email: userInfo.email,
            img: '',
            content,
            title,
          },
          noticeId,
        );
        console.log(response);
        if (response === 'success') {
          navigate(`/notice/${noticeId}`);
        }
      }
    }
  };
  useEffect(() => {
    if (userInfo === null || userInfo.userRole !== 'ROLE_ADMIN') {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
    if (noticeId !== undefined) {
      const getData = async () => {
        const response = await getNotice(noticeId);
        setNotice(response);
        if (titleRef.current !== null && contentRef.current !== null) {
          titleRef.current.value = response.title;
          contentRef.current.value = response.content;
        }
      };
      getData();
    }
  }, []);
  return (
    <div className="create-notice-page">
      <Header />
      <div className="create-notice-page__contents">
        <div className="create-notice-page__title">
          <Link to="/notice">공지사항</Link>
        </div>
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
            <div className="create-notice-page__date">{toDate(undefined)}</div>
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
      <Footer />
    </div>
  );
};

export default CreateNoticePage;
