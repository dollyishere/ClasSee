import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import ImageUpload from '../ImageUpload';

const StepTwo = () => {
  return (
    <div>
      <h2>Step 2. 소개 사진 등록</h2>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload limitNumber={5} />
    </div>
  );
};

export default StepTwo;
