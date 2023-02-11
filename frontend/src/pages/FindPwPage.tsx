import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import useViewModel from '../viewmodels/FindPwViewModel';

const FindPwPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>('');
  const codeRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordCheckRef = useRef<HTMLInputElement>(null);
  const codeCheckButtonRef = useRef<HTMLButtonElement>(null);
  const [answer, setAnswer] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [doMovePage, setDoMovePage] = useState<boolean>(false);

  const { findPw, updatePw } = useViewModel();

  const sendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      email !== '' &&
      nameRef.current !== null &&
      nameRef.current.value !== ''
    ) {
      const response = await findPw(nameRef.current.value, email);
      console.log(response);
      setAnswer(response);
    }
  };

  const checkCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (codeRef.current !== null && codeCheckButtonRef.current !== null) {
      if (codeRef.current.value !== '' && codeRef.current.value === answer) {
        codeCheckButtonRef.current.disabled = true;
        codeRef.current.readOnly = true;
        setIsSuccess(true);
        alert('인증 완료');
      } else {
        alert('인증번호를 다시 확인 해주십시오.');
      }
    }
  };

  const movePage = () => {
    if (isSuccess) {
      setDoMovePage(true);
    }
  };

  const changePw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      newPasswordRef.current !== null &&
      newPasswordCheckRef.current !== null
    ) {
      if (newPasswordRef.current.value === newPasswordCheckRef.current.value) {
        const response = await updatePw(email, newPasswordRef.current.value);
        console.log(response);
      } else {
        alert('비밀번호가 일치하지 않습니다.');
        newPasswordCheckRef.current.value = '';
        newPasswordRef.current.value = '';
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };
  useEffect(() => {
    if (
      newPasswordRef.current !== null &&
      newPasswordCheckRef.current !== null
    ) {
      newPasswordRef.current.value = '';
      newPasswordCheckRef.current.value = '';
    }
  }, [doMovePage]);

  return (
    <div className="page find-pw-page">
      <Header />
      <Card className="find-pw-page__container">
        {doMovePage ? (
          <CardContent>
            <h2>비밀번호 변경</h2>
            <form onSubmit={changePw}>
              <div className="find-pw-page__row">
                <div className="find-pw-page__label">새 비밀번호</div>
                <input
                  type="password"
                  ref={newPasswordRef}
                  className="find-pw-page__input--pass"
                />
              </div>
              <div className="find-pw-page__row">
                <div className="find-pw-page__label">새 비밀번호 확인</div>
                <input
                  type="password"
                  ref={newPasswordCheckRef}
                  className="find-pw-page__input--pass"
                />
              </div>
              <button
                type="submit"
                className="button find-pw-page__button find-pw-page__button--color"
              >
                비밀번호 변경하기
              </button>
            </form>
          </CardContent>
        ) : (
          <CardContent>
            <h2>비밀번호 찾기</h2>
            <div className="find-pw-page__row">
              <div className="find-pw-page__label">이름</div>
              <input
                type="text"
                ref={nameRef}
                className="find-pw-page__input"
              />
            </div>
            <form className="find-pw-page__row" onSubmit={sendCode}>
              <div className="find-pw-page__label">이메일</div>
              <input
                type="email"
                onChange={handleEmailChange}
                className="find-pw-page__input"
              />
              <button type="submit" className="button find-pw-page__button">
                인증번호 전송
              </button>
            </form>
            <div className="find-pw-page__row">
              <input
                type="text"
                className="find-pw-page__input"
                ref={codeRef}
              />
              <button
                type="button"
                className="button find-pw-page__button find-pw-page__button--color"
                onClick={checkCode}
                ref={codeCheckButtonRef}
              >
                인증 확인
              </button>
            </div>
            <button
              type="button"
              className="button find-pw-page__button find-pw-page__button--color"
              onClick={movePage}
            >
              비밀번호 변경하기
            </button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FindPwPage;
