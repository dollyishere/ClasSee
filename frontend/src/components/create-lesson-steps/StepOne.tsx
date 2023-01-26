import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';

const StepOne = () => {
  const lecturenameRef = useRef(null);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    console.log(lecturenameRef?.current);
    if (lecturenameRef?.current) {
      const lecturename = lecturenameRef?.current as HTMLInputElement;
      console.log(lecturename.value);
    }
  };
  return (
    <div>
      <h2>Step 1. 강의명 입력</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" ref={lecturenameRef} placeholder="강의명을 입력해주세요" />
        {/* <TextField
          required
          id="standard-required"
          label="강의명"
          placeholder="강의명을 입력해주세요"
          variant="standard"
          ref={lecturenameRef}
        /> */}
        <CardActions>
          <Link to="/open_lecture/2">
            <Button type="submit" variant="contained">
              다음 단계
            </Button>
          </Link>
        </CardActions>
      </form>
    </div>
  );
};
export default StepOne;
