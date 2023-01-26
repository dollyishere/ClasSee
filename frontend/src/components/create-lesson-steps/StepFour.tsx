import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import ImageUpload from '../ImageUpload';

const StepFour = () => {
  const materialEnrollRef = useRef(null);

  return (
    <div>
      <h2>Step 4. 준비물 등록</h2>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload limitNumber={10} />
      <textarea cols={30} rows={10} placeholder="준비물에 대해 입력해주세요." ref={materialEnrollRef} />
      <CardActions>
        <Link to="/create_lesson/3">
          <Button type="submit" variant="contained">
            이전 단계
          </Button>
        </Link>
        <Link to="/create_lesson/5">
          <Button type="submit" variant="contained">
            다음 단계
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default StepFour;
