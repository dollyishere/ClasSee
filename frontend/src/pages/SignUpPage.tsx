import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

import logo from '../assets/logo.png';

const SignUpPage = () => {
  const today = new Date();

  // 오늘 년도 기준으로 생년월일 Select 박스의 년도 생성
  const createSelectYearOption = () => {
    // 엘리먼트를 담을 배열
    const elements = [];

    // 지금부터 100년 전 까지
    for (let i = 0; i < 100; i += 1) {
      elements.push(
        <option value={today.getFullYear() - i} key={i}>
          {today.getFullYear() - i} 년
        </option>,
      );
    }
    return elements;
  };

  // 생년월일 Select 박스의 월 생성
  const createSelectMonthOption = () => {
    const elements = [];

    for (let i = 1; i <= 12; i += 1) {
      elements.push(
        <option value={i} key={i}>
          {i}
        </option>,
      );
    }
    return elements;
  };

  // 생년월일 Select 박스의 일 생성
  const createSelectDayOption = () => {
    const elements = [];

    for (let i = 1; i <= 31; i += 1) {
      elements.push(
        <option value={i} key={i}>
          {i}일
        </option>,
      );
    }
    return elements;
  };

  // 회원가입 버튼 클릭시 실행할 함수
  const handleSignUpSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="page" id="signup-page">
      {/* mui card */}
      <Card sx={{ width: 900, marginX: 'auto' }}>
        <CardContent>
          {/* 메인 페이지로 이동하는 로고 */}
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
                        {createSelectYearOption()}
                      </select>
                      <select
                        id="signup-page__select--birth-month"
                        className="signup-page__select-item"
                      >
                        <option defaultValue={new Date().getMonth()}>월</option>
                        {createSelectMonthOption()}
                      </select>
                      <select
                        id="signup-page__select--birth-day"
                        className="signup-page__select-item"
                      >
                        <option defaultValue={new Date().getDate()}>일</option>
                        {createSelectDayOption()}
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
                        <option value="lg">LG U+</option>
                        <option value="skt">SKT</option>
                        <option value="kt">KT</option>
                      </select>
                      <input
                        type="text"
                        className="signup-page__input"
                        id="signup-page__input--phone"
                        placeholder="01012345678"
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
