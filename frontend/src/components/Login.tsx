import React from 'react';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div>
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img alt="" src={logo} />
          </div>
        </Link>
        <form className="login">
          <input type="text" className="login__input__id" />
          <input type="text" className="login__input__pw" />
          <ul className="link">
            <li className="link__item">
              <Link to="/find_pw">비밀번호 찾기</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
          <button type="submit" className="login__button">
            로그인
          </button>
        </form>
        <button type="button" className="login__button">
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
