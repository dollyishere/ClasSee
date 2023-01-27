import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Button, CardActions } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const StepFive = () => {
  // 각 stage를 입력하는 용도로 사용하는 input 값을 제어할 stageRef를 생성함
  // type은 HTMLInputElement로 지정해줌
  const stageRef = useRef<HTMLInputElement>(null);

  // stage 값을 담아줄 stageList를 useState로 생성, type은 string array로 지정해줌
  const [stageList, setStageList] = useState<string[]>([]);

  // stage input form이 submit되었을 때 실행될 이벤트인 onStageSubmit을 제작함
  // 이때 이벤트의 속성은 React.FormEvent<HTMLFormElement>로 지정함
  const onStageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // form은 제출될 시, 새로고침 되므로 preventDefault()를 이용해 해당 이벤트를 방지함
    e.preventDefault();
    // 만약 stageRef.current 값이 null이 아니라면, 이하의 코드를 실행함
    if (stageRef.current) {
      // 먼저 stageRef.current.value로 입력값을 뽑아낸 후, string으로 타입을 지정함
      // 이후 stage 변수를 새로 생성해 내부에 입력값을 배정함
      const stage = stageRef.current.value as string;

      // 만약 입력값이 null이 아니라면, setStageList를 이용해 stageList에 해당 값을 초기화함
      if (stage) {
        setStageList([...stageList, stage]);
      }

      // 이후 stageRef.current.value 값을 초기화해줌
      stageRef.current.value = '' as string;
    }
  };

  // 만약 삭제 버튼을 누를 시, 해당하는 stage는 삭제됨
  const deleteBtn = (id: number) => {
    setStageList(stageList.filter((_, currentIndex) => currentIndex !== id));
  };

  return (
    <div>
      <h2>Step 5. 커리큘럼 등록</h2>
      {stageList.length > 0 ? (
        <ul>
          {stageList.map((item: string, id: number) => (
            <li>
              <h3>Step {id + 1}.</h3>
              {item}
              <RemoveCircleOutlineIcon type="submit" onClick={() => deleteBtn(id)} />
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      <form onSubmit={onStageSubmit}>
        <h3>Stage {stageList.length + 1}.</h3>
        <input ref={stageRef} type="text" placeholder="커리큘럼을 단계별로 입력해주세요" />
        <IconButton type="submit" aria-label="add">
          <AddCircleOutlineIcon />
        </IconButton>
      </form>
      <CardActions>
        <Link to="/create_lesson/4">
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
