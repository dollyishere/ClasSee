import React, { useRef, useState } from 'react';

import { IconButton, Box, Fab } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

import { StepFiveProps } from '../../types/CreateLessonType';

const StepFive = ({
  curriListState,
  setCurriListState,
  maximumState,
  setMaximumState,
  runningtimeState,
  setRunningtimeState,
}: StepFiveProps) => {
  // 각 stage를 입력하는 용도로 사용하는 input 값을 제어할 curriRef를 생성함
  // type은 HTMLInputElement로 지정해줌
  const curriRef = useRef<HTMLInputElement>(null);
  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(false);

  // 기본 강의 가격(setMaximumState)을 해당하는 input 내부 값이 바뀔 때마다 setMaximumState로 함께 변경되게 함
  // 이때 input의 기본 value는 string이므로, parseInt를 사용하여 number로 바꿔줌
  // NaN 방지를 위해, 해당 값 입력 시 0으로 자동으로 변환되도록 함
  const handleInputMaximum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(e.target.value, 10) as number)) {
      setMaximumState(0);
    } else {
      setMaximumState(parseInt(e.target.value, 10) as number);
    }
  };

  // 위와 동일하게 로직을 구성함
  const handleInputRunningtime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(parseInt(e.target.value, 10) as number)) {
      setRunningtimeState(0);
    } else {
      setRunningtimeState(parseInt(e.target.value, 10) as number);
    }
  };

  // stage input form이 submit되었을 때 실행될 이벤트인 onCurriSubmit을 제작함
  // 이때 이벤트의 속성은 React.FormEvent<HTMLFormElement>로 지정함
  const onCurriSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // form은 제출될 시, 새로고침 되므로 preventDefault()를 이용해 해당 이벤트를 방지함
    e.preventDefault();
    // 만약 curriRef.current 값이 null이 아니라면, 이하의 코드를 실행함
    if (curriRef.current) {
      // 먼저 curriRef.current.value로 입력값을 뽑아낸 후, string으로 타입을 지정함
      // 이후 curri 변수를 새로 생성해 내부에 입력값을 배정함
      const curri = curriRef.current.value as string;

      // 만약 입력값이 null이 아니라면, setCurriListState를 이용해 curriListState에 해당 값을 초기화함
      if (curri) {
        setCurriListState([...curriListState, curri]);
        // 이후 curriRef.current.value 값을 초기화해줌
        curriRef.current.value = '' as string;
        setInputVisiable(false);
      } else {
        // 만약 값을 입력하지 않았을 시, 값을 입력해달라는 메세지를 출력함
        console.log('값을 입력해 주세요.');
      }
      console.log(inputVisiable);
    }
  };

  // 만약 삭제 버튼을 누를 시, 해당하는 stage는 삭제됨
  const deleteBtn = (id: number) => {
    setCurriListState(curriListState.filter((_, currentIndex) => currentIndex !== id));
    console.log(curriListState);
  };

  return (
    <div>
      <h2>Step 5. 커리큘럼 등록</h2>
      {/* 만약 curriListState 길이가 0 이상이라면, 내부의 item들을 하나 하나 list로 보여줌 */}
      {curriListState.length > 0 ? (
        <ul>
          {curriListState.map((stage: string, id: number) => (
            <li>
              <h3>Step {id + 1}.</h3>
              {stage}
              <RemoveCircleOutlineIcon type="button" onClick={() => deleteBtn(id)} />
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      {/* inputVisiable이 true거나 아직 curriListState에 아무 값도 없다면, 커리큘럼을 추가하는 것이 가능함(input 태그가 보임) */}
      {/* 만약 curriListState.length가 0이라면(현재 추가된 커리큘럼이 하나도 없다면), 그 때도 input 태그는 자동으로 보임 */}
      {inputVisiable || curriListState.length === 0 ? (
        <form onSubmit={onCurriSubmit}>
          <h3>Stage {curriListState.length + 1}.</h3>
          <input ref={curriRef} type="text" placeholder="커리큘럼을 단계별로 입력해주세요" required />
          <IconButton type="submit" aria-label="add">
            <AddCircleOutlineIcon />
          </IconButton>
        </form>
      ) : (
        // 만약 false라면, 새로 값을 추가할 것인지 선택하도록 조정함
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab aria-label="add" onClick={() => setInputVisiable(true)}>
            <AddIcon />
          </Fab>
        </Box>
      )}
      {/* 최대 참가 가능 인원 수를 입력하는 input 태그임 */}
      {/* 최저값은 0, 최대 값은 10으로 지정함 */}
      <label htmlFor="number_of_participants">
        <input
          id="number_of_participants"
          type="number"
          placeholder="참여 인원"
          min={0}
          max={10}
          value={maximumState}
          onChange={handleInputMaximum}
        />
        명
      </label>
      {/* 예상 강의 시간을 입력하는 input 태그임 */}
      {/* 마찬가지로 최저값 0, 최대값 1로 지정 */}
      <label htmlFor="time_of_lesson">
        <input
          id="time_of_lesson"
          type="number"
          placeholder="예상 강의 시간"
          step={0}
          min={0}
          max={10}
          value={runningtimeState}
          onChange={handleInputRunningtime}
        />{' '}
        시간
      </label>
    </div>
  );
};

export default StepFive;
