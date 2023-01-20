import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import logo from '../assets/logo.png';

const Login = () => {
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);

  // visibility 값을 제어하기 위한 Hook
  // false일 시, 비밀번호가 암호화되어 보이지만, true라면 입력값 그대로 보는 것이 가능함
  const [visibility, setVisibility] = React.useState(false);

  // 만약 check__pw 버튼을 눌렀을 시, 이하의 함수가 실행됨
  // 먼저 click 시 관련 이벤트가 즉시 실행되는 것을 막음
  // 이후, 만약 visibility 값이 false라면, 해당 값을 setVisibility를 이용해 true로 변경
  // 만약 역이라면, false로 바꿔줌
  const checkPassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  // login form 제출 시, 이벤트 발생
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // form의 경우 이벤트 발생 시 새로고침되므로, 이를 방지함(preventDefault())
    if (idInputRef?.current && pwInputRef?.current) {
      const id = idInputRef?.current as HTMLInputElement;
      const password = pwInputRef?.current as HTMLInputElement;

      // id와 password의 value가 모두 null이 아닐 시, 로그인이 가능
      if (id.value && password.value) {
        console.log('로그인');
        console.log(id.value);
        console.log(password.value);
        // 만약 둘 중 하나의 value가 null일 시, 에러를 출력함
      } else {
        console.log('에러');
      }
    }
  };
  return (
    <div className="container">
      {/* 로고 확인 */}
      <Link to="/">
        <div className="logo">
          <img alt="" src={logo} />
        </div>
      </Link>
      {/* 로그인 폼 */}
      <form className="login_form" onSubmit={handleLoginSubmit}>
        {/* 각각 이메일, 비밀번호 입력 input */}
        <input type="email" className="login__input__id" placeholder="이메일" ref={idInputRef} />
        {/* 만약 visibility 값이 false일 시, password로 취급됨 */}
        {/* true일시, password를 확인하는 것이 가능 */}
        <div className="pw_form">
          <input
            type={visibility ? 'text' : 'password'}
            className="login__input__pw"
            placeholder="비밀번호"
            ref={pwInputRef}
          />
          {/* 비밀번호 입력 체크할 수 있는 버튼 */}
          {/* visibility의 값에 따라 표시되는 버튼 이미지에 변경이 있음 */}
          {visibility ? (
            <button type="submit" className="check__pw" onClick={checkPassword}>
              <VisibilityOffIcon />
            </button>
          ) : (
            <button type="submit" className="check__pw" onClick={checkPassword}>
              <RemoveRedEyeIcon />
            </button>
          )}
        </div>
        {/* 비밀번호 & 회원가입 페이지로 이동 */}
        <ul className="link">
          <li className="link__item">
            <Link to="/find_pw">비밀번호 찾기</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
        {/* <Button variant="contained" color="warning" startIcon={<ChatBubbleIcon />} className="login__button">
          카카오 로그인
        </Button> */}
        {/* 로그인 버튼 */}
        <button type="submit" className="login__button">
          로그인
        </button>
      </form>
      {/* 소셜(카카오) 로그인 */}
      <button type="button" className="social__login__button">
        <ChatBubbleIcon />
        카카오 로그인
      </button>
    </div>
  );
};

export default Login;
