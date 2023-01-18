import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

import '../styles/components/header.scss';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img alt="" src={logo} />
        </div>
      </Link>
    </header>
  );
};

export default Header;
