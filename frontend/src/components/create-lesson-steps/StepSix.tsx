import React, { useState } from 'react';

import { Box, Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { StepSixProps } from '../../types/CreateLessonType';

const StepFive = ({ basicPrice, setBasicPrice, kitPrice, setKitPrice }: StepSixProps) => {
  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(false);

  // 기본 강의 가격(basicPrice)을 해당하는 input 내부 값이 바뀔 때마다 setBasicPrice로 함께 변경되게 함
  // 이때 input의 기본 value는 string이므로, parseInt를 사용하여 number로 바꿔줌
  const handleInputBasicPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicPrice(parseInt(e.target.value, 10) as number);
  };

  // basicPrice와 같은 로직으로 kitPrice의 값도 변동되도록 코드를 구성해줌
  const handleInputKitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKitPrice(parseInt(e.target.value, 10) as number);
  };

  // 만약 삭제 버튼을 누를 시, 다시 추가 버튼이 보이도록 inputVisiable 값을 false로 바꿔줌
  // 마찬가지로 kitPrice도 0으로 초기화함
  const deleteBtn = () => {
    setInputVisiable(false);
    setKitPrice(0);
  };

  return (
    <div>
      <h2>Step 6. 가격 설정</h2>
      {/* 기본 수강 가격을 결정하는 input */}
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
      {/* 만약 kitPrice가 0이고, inputVisiable 값이 false일 시, 추가 버튼이 보이도록 함 */}
      {/* 둘 중 하나라도 성립하지 않는다면, 키트 가격을 입력할 수 있는 input이 보이도록 함 */}
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
          원{/* 만약 아래 삭제 버튼을 누를 시, 추가한 키트 가격이 초기화되고 및 입력 input이 보이지 않게 됨 */}
          <RemoveCircleOutlineIcon type="button" onClick={deleteBtn} />
        </label>
      )}
      <h3>총 합계: {basicPrice + kitPrice} 원</h3>
    </div>
  );
};

export default StepFive;
