import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

import logo from '../assets/logo.png';

const SignUpPage = () => {
  // 회원가입 버튼 클릭시 실행할 함수
  const handleSignUpSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="page" id="signup-page">
      <Card sx={{ width: 900, marginX: 'auto' }}>
        <CardContent>
          <Link to="/">
            <img alt="" src={logo} />
          </Link>
          <form
            className="signup-page__signup-form"
            onSubmit={handleSignUpSubmit}
          >
            <ul>
              <li>
                <label htmlFor="#signup-page__input--id">
                  <div>아이디</div>
                  <div className="signup-page__form--row">
                    <input
                      type="text"
                      className="signup-page__input"
                      id="signup-page__input--id"
                      placeholder="이메일"
                    />
                    <button
                      type="button"
                      className="button signup-page__input--button"
                    >
                      중복 확인
                    </button>
                  </div>
                </label>
              </li>
              <li>
                <label htmlFor="#signup-page__input--pw">
                  <div>비밀번호</div>
                  <input
                    type="password"
                    className="signup-page__input"
                    id="signup-page__input--pw"
                    placeholder="비밀번호"
                  />
                </label>
              </li>
              <li>
                <label htmlFor="#signup-page__input--pw-chk">
                  <div>비밀번호 확인</div>
                  <input
                    type="password"
                    className="signup-page__input"
                    id="signup-page__input-pw--chk"
                    placeholder="비밀번호 확인"
                  />
                </label>
              </li>
              <li>
                <label htmlFor="#signup-page__input--name">
                  <div>이름</div>
                  <input
                    type="text"
                    className="signup-page__input"
                    id="signup-page__input--name"
                    placeholder="이름"
                  />
                </label>
              </li>
              <li>
                <div>
                  <div>생년월일</div>
                  <div className="signup-page__form--row">
                    <div className="signup-page__select">
                      <select
                        id="signup-page__select--birth-year"
                        className="signup-page__select-item"
                      >
                        <option defaultValue={new Date().getFullYear()}>
                          년도
                        </option>
                      </select>
                      <select
                        id="signup-page__select--birth-month"
                        className="signup-page__select-item"
                      >
                        <option defaultValue={new Date().getMonth()}>월</option>
                      </select>
                      <select
                        id="signup-page__select--birth-day"
                        className="signup-page__select-item"
                      >
                        <option defaultValue={new Date().getDate()}>일</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label htmlFor="#signup-page__input--nickname">
                  <div>닉네임</div>
                  <input
                    type="text"
                    className="signup-page__input"
                    id="signup-page__input--nickname"
                    placeholder="닉네임"
                  />
                </label>
              </li>
              <li>
                <label htmlFor="#signup-page__input--address">
                  <div>주소</div>
                  <input
                    type="text"
                    className="signup-page__input"
                    id="signup-page__input--address"
                    placeholder="주소"
                  />
                </label>
              </li>
              <li>
                <label htmlFor="#signup-page__input--phone">
                  <div>휴대전화</div>{' '}
                  <div className="signup-page__form--row">
                    <div className="signup-page__select">
                      <select
                        className="signup-page__select-item"
                        id="signup-page__select-item--TSP"
                      >
                        <option defaultValue="nothing">통신사</option>
                      </select>
                      <input
                        type="text"
                        className="signup-page__input"
                        id="signup-page__input--phone"
                        placeholder="휴대전화"
                      />
                    </div>
                    <button
                      type="button"
                      className="button signup-page__input--button"
                    >
                      인증번호 받기
                    </button>
                  </div>
                  <div className="signup-page__form--row">
                    <input
                      type="text"
                      className="signup-page__input"
                      placeholder="인증번호를 입력하세요."
                    />
                  </div>
                </label>
              </li>
              <li>
                <button type="submit" className="button signup-page__submit">
                  가입하기
                </button>
              </li>
            </ul>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
