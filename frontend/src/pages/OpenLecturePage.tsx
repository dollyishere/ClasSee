import React, { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

import '../styles/pages/_open-lecture-page.scss';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const OpenLecturePage = () => {
  const [progress, setProgress] = React.useState(10);
  return (
    <div className="container">
      <h1>강의 간편 개설하기</h1>
      <Card sx={{ minWidth: 275 }}>
        {/* 각 자식 component가 렌더링 되는 위치를 Outlet으로 지정 */}
        <Outlet />
      </Card>
    </div>
  );
};
export default OpenLecturePage;
