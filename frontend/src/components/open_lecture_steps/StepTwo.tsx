import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';

const StepTwo = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  return (
    <div>
      <h2>Step 2. 소개 사진 등록</h2>
      <form>
        <input hidden accept="image/*" multiple type="file" ref={inputRef} id="upload-photo-input" />
        <button type="button" id="upload-photo-btn" onClick={onUploadImageButtonClick}>
          +
        </button>
      </form>
      <CardActions>
        <Link to="/open_lecture/1">
          <Button type="submit" variant="contained">
            이전 단계
          </Button>
        </Link>
        <Link to="/open_lecture/3">
          <Button type="submit" variant="contained">
            다음 단계
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default StepTwo;
