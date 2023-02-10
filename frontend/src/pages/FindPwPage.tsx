import { Card, CardContent } from '@mui/material';
import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import useViewModel from '../viewmodels/FindPwViewModel';

const FindPwPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState<string>('');

  const { findPw } = useViewModel();

  const sendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current !== null && nameRef.current !== null) {
      const response = await findPw(
        nameRef.current.value,
        emailRef.current.value,
      );
      setAnswer(response);
    }
  };

  const checkCode = async () => {
    if (codeRef.current !== null) {
      if (emailRef.current !== null && codeRef.current.value === answer) {
        navigate(`/change-pw/${emailRef.current.value}`);
      } else {
        alert('인증번호를 다시 확인 해주십시오.');
      }
    }
  };

  return (
    <div className="page find-pw-page">
      <Header />
      <Card className="find-pw-page__container">
        <CardContent>
          <h2>비밀번호 찾기</h2>
          <div className="find-pw-page__row">
            <div className="find-pw-page__label">이름</div>
            <input type="text" ref={nameRef} className="find-pw-page__input" />
          </div>
          <form className="find-pw-page__row" onSubmit={sendCode}>
            <div className="find-pw-page__label">이메일</div>
            <input
              type="email"
              ref={emailRef}
              className="find-pw-page__input"
            />
            <button type="submit" className="button find-pw-page__button">
              인증번호 전송
            </button>
          </form>
          <div className="find-pw-page__row">
            <input type="text" className="find-pw-page__input" ref={codeRef} />
            <button
              type="button"
              className="button find-pw-page__button find-pw-page__button--color"
            >
              인증 확인
            </button>
          </div>
          <button
            type="button"
            className="button find-pw-page__button find-pw-page__button--color"
            onClick={checkCode}
          >
            비밀번호 찾기
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindPwPage;
