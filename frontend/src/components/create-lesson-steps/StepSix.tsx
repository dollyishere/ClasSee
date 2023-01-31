import React, { useRef, useState } from 'react';

import { Box, Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface StepSixProps {
  basicPrice: number;
  setBasicPrice: React.Dispatch<React.SetStateAction<number>>;
  kitPrice: number;
  setKitPrice: React.Dispatch<React.SetStateAction<number>>;
}

const StepFive = ({ basicPrice, setBasicPrice, kitPrice, setKitPrice }: StepSixProps) => {
  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(false);

  const handleInputBasicPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicPrice(parseInt(e.target.value, 10) as number);
  };

  const handleInputKitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKitPrice(parseInt(e.target.value, 10) as number);
  };

  // 만약 삭제 버튼을 누를 시, 해당하는 stage는 삭제됨
  const deleteBtn = () => {
    setInputVisiable(false);
    setKitPrice(0);
  };

  return (
    <div>
      <h2>Step 6. 가격 설정</h2>
      <label htmlFor="basicPrice">
        기본 수강 가격
        <input
          type="number"
          id="basicPrice"
          placeholder="금액"
          step={1000}
          min={0}
          value={basicPrice}
          onChange={handleInputBasicPrice}
        />
        원
      </label>

      <hr />
      {kitPrice === 0 && inputVisiable === false ? (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab aria-label="add" onClick={() => setInputVisiable(true)}>
            <AddIcon />
          </Fab>
        </Box>
      ) : (
        <label htmlFor="option">
          키트
          <input
            type="number"
            id="option"
            step={1000}
            min={0}
            placeholder="금액"
            value={kitPrice}
            onChange={handleInputKitPrice}
          />
          원
          <RemoveCircleOutlineIcon type="button" onClick={deleteBtn} />
        </label>
      )}
      <h3>총 합계: {basicPrice + kitPrice} 원</h3>
    </div>
  );
};

export default StepFive;
