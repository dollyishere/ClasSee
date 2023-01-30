import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Button, CardActions, Box, Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface OptionalSet {
  optionName: string;
  optionalPrice: number;
  // totalPrice: number;
}

const StepFive = () => {
  // 각 stage를 입력하는 용도로 사용하는 input 값을 제어할 stageRef를 생성함
  // type은 HTMLInputElement로 지정해줌
  const basicPriceRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLInputElement>(null);
  const optionalPriceRef = useRef<HTMLInputElement>(null);

  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(false);
  const [edditAble, setEdditAble] = useState(true);

  // stage 값을 담아줄 stageList를 useState로 생성, type은 string array로 지정해줌
  const [optionsList, setOptionsList] = useState<OptionalSet[]>([]);

  // stage input form이 submit되었을 때 실행될 이벤트인 handleOptionSubmit을 제작함
  // 이때 이벤트의 속성은 React.FormEvent<HTMLFormElement>로 지정함
  const handleOptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // form은 제출될 시, 새로고침 되므로 preventDefault()를 이용해 해당 이벤트를 방지함
    e.preventDefault();
    // 만약 stageRef.current 값이 null이 아니라면, 이하의 코드를 실행함
    if (optionRef.current && optionalPriceRef.current) {
      if (optionRef.current.value && optionalPriceRef.current.value) {
        const optionalSet: OptionalSet = {
          optionName: optionRef.current.value as string,
          // parseInt를 이용해 optionalPriceRef.current.value를 number로 변환해준 후, optionalPrice 변수에 할당함
          // 이때, radix(진수)를 명시해주지 않으면 오류가 발생함. 이를 방지하기 위해 radix 자리에 10을 넣어줌.
          optionalPrice: parseInt(optionalPriceRef.current.value, 10) as number,
        };

        // // 만약 입력값이 null이 아니라면, setStageList를 이용해 stageList에 해당 값을 초기화함
        if (optionalSet) {
          setOptionsList([...optionsList, optionalSet]);
        }
        // 이후 stageRef.current.value 값을 초기화해줌
        optionRef.current.value = '' as string;
        optionalPriceRef.current.value = '' as string;
        setInputVisiable(false);
      }
    }
  };

  // 만약 삭제 버튼을 누를 시, 해당하는 stage는 삭제됨
  const deleteBtn = (id: number) => {
    setOptionsList(optionsList.filter((_, index) => index !== id));
  };

  return (
    <div>
      <h2>Step 6. 가격 설정</h2>
      <form>
        <label htmlFor="basicPrice">
          기본 수강 가격
          <input type="number" id="basicPrice" placeholder="금액" step={1000} min={0} ref={basicPriceRef} />원
        </label>
      </form>
      {optionsList.length > 0 ? (
        <ul>
          {optionsList.map((option: OptionalSet, id: number) => (
            <li>
              <span>{option.optionName}</span>
              <span>{option.optionalPrice}</span>
              <span>원</span>
              <RemoveCircleOutlineIcon type="submit" onClick={() => deleteBtn(id)} />
              <h3>
                {' '}
                총 합계:{' '}
                {basicPriceRef.current && option.optionalPrice
                  ? option.optionalPrice + (parseInt(basicPriceRef.current.value, 10) as number)
                  : option.optionalPrice}{' '}
              </h3>
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      {basicPriceRef.current && inputVisiable ? (
        <form onSubmit={handleOptionSubmit}>
          <label htmlFor="option">Option {optionsList.length + 1}.</label>
          <input type="text" id="option" placeholder="옵션" ref={optionRef} />
          <input type="number" id="option" step={1000} min={0} placeholder="금액" ref={optionalPriceRef} />
          <IconButton type="submit" aria-label="add">
            <AddCircleOutlineIcon />
          </IconButton>
        </form>
      ) : (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab aria-label="add" onClick={() => setInputVisiable(true)}>
            <AddIcon />
          </Fab>
        </Box>
      )}
      <CardActions>
        <Link to="/create_lesson/5">
          <Button type="submit" variant="contained">
            이전 단계
          </Button>
        </Link>
        <Link to="/create_lesson/6">
          <Button type="submit" variant="contained">
            다음 단계
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default StepFive;
