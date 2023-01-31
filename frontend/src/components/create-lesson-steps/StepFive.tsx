import React, { useRef, useState } from 'react';

import { IconButton, Box, Fab } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

interface StepFiveProps {
  curriculumList: string[];
  setCurriculumList: React.Dispatch<React.SetStateAction<string[]>>;
  maximum: number;
  setMaximum: React.Dispatch<React.SetStateAction<number>>;
  runningtime: number;
  setRunningtime: React.Dispatch<React.SetStateAction<number>>;
}

const StepFive = ({
  curriculumList,
  setCurriculumList,
  maximum,
  setMaximum,
  runningtime,
  setRunningtime,
}: StepFiveProps) => {
  // 각 stage를 입력하는 용도로 사용하는 input 값을 제어할 curriculumRef를 생성함
  // type은 HTMLInputElement로 지정해줌
  const curriculumRef = useRef<HTMLInputElement>(null);
  // option input form이 보이는지 여부를 결정할 inputVisiable 변수를 useState로 생성
  const [inputVisiable, setInputVisiable] = useState(true);

  const handleInputMaximum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaximum(parseInt(e.target.value, 10) as number);
  };

  const handleInputRunningtime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRunningtime(parseFloat(e.target.value) as number);
  };

  // stage input form이 submit되었을 때 실행될 이벤트인 onCurriculumSubmit을 제작함
  // 이때 이벤트의 속성은 React.FormEvent<HTMLFormElement>로 지정함
  const onCurriculumSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // form은 제출될 시, 새로고침 되므로 preventDefault()를 이용해 해당 이벤트를 방지함
    e.preventDefault();
    // 만약 curriculumRef.current 값이 null이 아니라면, 이하의 코드를 실행함
    if (curriculumRef.current) {
      // 먼저 curriculumRef.current.value로 입력값을 뽑아낸 후, string으로 타입을 지정함
      // 이후 curriculum 변수를 새로 생성해 내부에 입력값을 배정함
      const curriculum = curriculumRef.current.value as string;

      // 만약 입력값이 null이 아니라면, setCurriculumList를 이용해 curriculumList에 해당 값을 초기화함
      if (curriculum) {
        setCurriculumList([...curriculumList, curriculum]);
      }

      // 이후 curriculumRef.current.value 값을 초기화해줌
      curriculumRef.current.value = '' as string;
      setInputVisiable(false);
    }
  };

  // 만약 삭제 버튼을 누를 시, 해당하는 stage는 삭제됨
  const deleteBtn = (id: number) => {
    setCurriculumList(curriculumList.filter((_, currentIndex) => currentIndex !== id));
  };

  return (
    <div>
      <h2>Step 5. 커리큘럼 등록</h2>
      {/* 만약 curriculmList 길이가 0 이상이라면, 내부의 item들을 하나 하나 list로 보여줌 */}
      {curriculumList.length > 0 ? (
        <ul>
          {curriculumList.map((stage: string, id: number) => (
            <li>
              <h3>Step {id + 1}.</h3>
              {stage}
              <RemoveCircleOutlineIcon type="submit" onClick={() => deleteBtn(id)} />
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      {/* inputVisiable이 true라면, 커리큘럼을 추가하는 것이 가능함(input 태그가 보임) */}
      {inputVisiable ? (
        <form onSubmit={onCurriculumSubmit}>
          <h3>Stage {curriculumList.length + 1}.</h3>
          <input ref={curriculumRef} type="text" placeholder="커리큘럼을 단계별로 입력해주세요" />
          <IconButton type="submit" aria-label="add">
            <AddCircleOutlineIcon />
          </IconButton>
        </form>
      ) : (
        // 만약 false라면, 추가할 것인지 선택하도록 조정함
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab aria-label="add" onClick={() => setInputVisiable(true)}>
            <AddIcon />
          </Fab>
        </Box>
      )}
      <label htmlFor="number_of_participants">
        <input
          id="number_of_participants"
          type="number"
          placeholder="참여 인원"
          min={0}
          max={10}
          value={maximum}
          onChange={handleInputMaximum}
        />
        명
      </label>
      <label htmlFor="time_of_lesson">
        <input
          id="time_of_lesson"
          type="number"
          placeholder="예상 강의 시간"
          step={0.5}
          min={0}
          max={10}
          value={runningtime}
          onChange={handleInputRunningtime}
        />{' '}
        시간
      </label>
    </div>
  );
};

export default StepFive;
