import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';

const OpenClass = () => {
  const classnameRef = useRef(null);
  const getClassName = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);
    console.log(classnameRef);
    if (classnameRef?.current) {
      const classname = classnameRef?.current as HTMLInputElement;
      console.log(classname.value);
    }
  };
  return (
    <div className="container">
      <h1>강의 간편 개설하기</h1>
      <Card sx={{ minWidth: 275 }}>
        <h2>Step 1. 강의명 입력</h2>
        <TextField
          required
          id="standard-required"
          label="강의명"
          placeholder="강의명을 입력해주세요"
          variant="standard"
          ref={classnameRef}
        />
        {/* <TextField fullWidth label="강의명을 입력해 주세요" id="fullWidth" /> */}

        <Button onClick={getClassName} variant="contained">
          다음 단계
        </Button>
      </Card>
    </div>
  );
};

export default OpenClass;
