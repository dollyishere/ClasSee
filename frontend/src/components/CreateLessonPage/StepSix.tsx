import React, { useState } from 'react';

import { Box, Divider, Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { StepSixProps } from '../../types/LessonsType';

const StepFive = ({
  basicPriceState,
  setBasicPriceState,
  kitDescState,
  setKitDescState,
  kitPriceState,
  setKitPriceState,
}: StepSixProps) => {
  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(false);

  // 기본 강의 가격(basicPriceState)을 해당하는 input 내부 값이 바뀔 때마다 setBasicPriceState로 함께 변경되게 함
  // 이때 input의 기본 value는 string이므로, parseInt를 사용하여 number로 바꿔줌
  // NaN 방지를 위해, 해당 값 입력 시 0으로 자동으로 변환되도록 함
  const handleInputBasicPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(e.target.value, 10) as number)) {
      setBasicPriceState(0);
    } else {
      setBasicPriceState(parseInt(e.target.value, 10) as number);
    }
  };

  const handleInputKitDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKitDescState(e.target.value);
  };

  // basicPriceState와 같은 로직으로 kitPriceState의 값도 변동되도록 코드를 구성해줌
  // NaN 방지를 위해, 해당 값 입력 시 0으로 자동으로 변환되도록 함
  const handleInputKitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(e.target.value, 10) as number)) {
      setKitPriceState(0);
    } else {
      setKitPriceState(parseInt(e.target.value, 10) as number);
    }
  };

  // 만약 삭제 버튼을 누를 시, 다시 추가 버튼이 보이도록 inputVisiable 값을 false로 바꿔줌
  // 마찬가지로 kitPriceState도 0으로 초기화함
  const deleteBtn = () => {
    setInputVisiable(false);
    setKitPriceState(0);
    setKitDescState('');
  };

  return (
    <div className="step">
      <div className="step__title">Step 6. 가격 설정</div>
      {/* 기본 수강 가격을 결정하는 input */}
      <div className="step__price">
        <label htmlFor="basicPrice">
          <span className="step__price-label">기본 수강 가격</span>
          <input
            type="number"
            id="basicPrice"
            placeholder="금액"
            step={1000}
            min={0}
            value={basicPriceState}
            onChange={handleInputBasicPrice}
          />
          원
        </label>
      </div>

      <Divider />
      {/* 만약 kitPriceState가 0이고, inputVisiable 값이 false일 시, 추가 버튼이 보이도록 함 */}
      {/* 둘 중 하나라도 성립하지 않는다면, 키트 가격을 입력할 수 있는 input이 보이도록 함 */}
      {kitPriceState === 0 && inputVisiable === false ? (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab aria-label="add" onClick={() => setInputVisiable(true)}>
            <AddIcon />
          </Fab>
        </Box>
      ) : (
        <div className="step__price">
          <label htmlFor="option">
            <span className="step__price-label">키트</span>
            <input
              type="number"
              id="option"
              step={1000}
              min={0}
              placeholder="금액"
              value={kitPriceState}
              onChange={handleInputKitPrice}
            />
            원
            {/* 만약 아래 삭제 버튼을 누를 시, 추가한 키트 가격이 초기화되고 및 입력 input이 보이지 않게 됨 */}
            <br />
            <div>* 키트의 경우, 무료가 아닐 시에만 등록이 가능합니다.</div>
            {kitPriceState !== 0 ? (
              <textarea
                cols={30}
                rows={10}
                id="option"
                placeholder="키트에 대한 설명을 입력해주세요."
                value={kitDescState}
                onChange={handleInputKitDesc}
              />
            ) : null}
            <br />
            <RemoveCircleOutlineIcon
              type="button"
              onClick={deleteBtn}
              className="step__price-button"
            />
          </label>
        </div>
      )}
      <h3>총 합계: {basicPriceState + kitPriceState} 원</h3>
    </div>
  );
};

export default StepFive;
