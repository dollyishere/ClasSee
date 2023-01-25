import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';

const ChapterTwo = () => {
  return (
    <div>
      <h2>Chapter 2. 소개 사진 등록</h2>
      <Button type="submit" variant="contained">
        사진 업로드하기
      </Button>
      <CardActions>
        <Button type="submit" variant="contained">
          이전 단계
        </Button>
        <Button type="submit" variant="contained">
          다음 단계
        </Button>
      </CardActions>
    </div>
  );
};

export default ChapterTwo;
