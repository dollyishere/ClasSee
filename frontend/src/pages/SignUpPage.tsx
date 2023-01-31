import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';

import useViewModel from '../viewmodels/SignUpViewModel';

import logo from '../assets/logo.png';

const SignUpPage = () => {
  const emailRef = useRef(null); // 이메일 input에 접근하기 위한 hook
  const pwRef = useRef(null); // 비밀번호 input에 접근하기 위한 hook
  const pwCheckRef = useRef(null); // 비밀번호 확인 input에 접근하기 위한 hook
  const nameRef = useRef(null); // 이름 input에 접근하기 위한 hook
  const nicknameRef = useRef(null); // 닉네임 input에 접근하기 위한 hook
  const addressRef = useRef(null); // 주소 input에 접근하기 위한 hook
  const phoneNumRef = useRef(null); // 전화번호 input에 접근하기 위한 hook
  const certificationNumref = useRef(null); // 인증번호 input에 접근하기 위한 hook

  const [yearState, setYearState] = useState<string>(''); // 생년월일 년도를 저장할 state
  const [monthState, setMonthState] = useState<string>(''); // 생년월일 월을 저장할 state
  const [dayState, setDayState] = useState<string>(''); // 생년월일 일을 저장할 state
  const [agencyState, setAgencyState] = useState<string>(''); // 통신사를 저장할 state

  const { emailDuplicationCheck } = useViewModel();

  // 지금 날짜, 시간을 나타내는 Date 객체
  const today = new Date();

  // 오늘 년도 기준으로 생년월일 Select 박스의 년도 생성
  const createSelectYearOption = () => {
    // 년도 엘리먼트를 담을 배열
    const years = [];

    // 지금부터 100년 전 까지
    for (let i = 0; i < 100; i += 1) {
      years.push(
        <option value={today.getFullYear() - i} key={i}>
          {today.getFullYear() - i} 년
        </option>,
      );
    }
    return years;
  };

  // 생년월일 Select 박스의 월 생성
  const createSelectMonthOption = () => {
    // 월 엘리먼트를 담을 배열
    const months = [];

    for (let i = 1; i <= 12; i += 1) {
      months.push(
        <option value={i} key={i}>
          {i}
        </option>,
      );
    }
    return months;
  };

  // 생년월일 Select 박스의 일 생성
  const createSelectDayOption = () => {
    // 일 엘리먼트를 담을 배열
    const days = [];

    for (let i = 1; i <= 31; i += 1) {
      days.push(
        <option value={i} key={i}>
          {i}일
        </option>,
      );
    }
    return days;
  };

  // 회원가입 버튼 클릭시 실행할 함수
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submit');
  };

  // 중복확인 버튼 클릭시 실행할 함수
  const handleEmailDuplicationCheck = (e: React.MouseEvent<HTMLElement>) => {
    emailDuplicationCheck();
  };

  // 년도 select 클릭시 실행할 함수
  const handleYearSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearState(e.target.value);
  };

  // 월 select 클릭시 실행할 함수
  const handleMonthSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthState(e.target.value);
  };

  // 일 select 클릭시 실행할 함수
  const handleDaySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDayState(e.target.value);
  };

  // 통신사 select 클릭시 실행할 함수
  const handleAgencySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setAgencyState(e.target.value);
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
                      type="email"
                      className="signup-page__input"
                      id="signup-page__input--id"
                      placeholder="이메일"
                      ref={emailRef}
                    />
                    <button
                      type="button"
                      className="button signup-page__input--button"
                      onClick={handleEmailDuplicationCheck}
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
                    ref={pwRef}
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
                    ref={pwCheckRef}
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
                    ref={nameRef}
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
                        onChange={handleYearSelectChange}
                      >
                        <option defaultValue={0}>년도</option>
                        {createSelectYearOption()}
                      </select>
                      <select
                        id="signup-page__select--birth-month"
                        className="signup-page__select-item"
                        onChange={handleMonthSelectChange}
                      >
                        <option defaultValue={new Date().getMonth()}>월</option>
                        {createSelectMonthOption()}
                      </select>
                      <select
                        id="signup-page__select--birth-day"
                        className="signup-page__select-item"
                        onChange={handleDaySelectChange}
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
                    ref={nicknameRef}
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
                    ref={addressRef}
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
                        onChange={handleAgencySelectChange}
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
                        ref={phoneNumRef}
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
                      ref={certificationNumref}
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
