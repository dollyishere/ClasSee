import { Divider } from '@mui/material';
import React from 'react';
import Header from '../components/Header';

import useTimeStamp from '../utils/TimeStamp';

const CreateNoticePage = () => {
  const { toDate } = useTimeStamp();
  return (
    <div className="create-notice-page">
      <Header />
      <div className="create-notice-page__contents">
        <div className="create-notice-page__title">공지사항</div>
        <form className="create-notice-page__form">
          <div className="create-notice-page__row">
            <div className="create-notice-page__label">제목</div>
            <input type="text" className="create-notice-page__input" />
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
            <textarea />
          </div>
          <div className="create-notice-page__row">
            <button type="button" className="button create-notice-page__button">
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoticePage;
