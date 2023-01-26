import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const StepFive = () => {
  const toDoRef = useRef<HTMLInputElement>(null);
  const [toDos, setToDos] = useState<string[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toDoRef.current) {
      console.log(toDoRef.current.value);
      const toDo = toDoRef.current.value as string;
      if (toDo) {
        setToDos([...toDos, toDo]);
      }
      toDoRef.current.value = '' as string;
    }
  };
  const deleteBtn = (id: number) => {
    setToDos(toDos.filter((_, currentIndex) => currentIndex !== id));
  };
  return (
    <div>
      <h2>Step 5. 커리큘럼 등록</h2>
      <form onSubmit={onSubmit}>
        <input ref={toDoRef} type="text" placeholder="Write your to do" />
        <button type="submit">Add To Do</button>
      </form>
      <hr />
      {toDos.length > 0 ? (
        <ul>
          {toDos.map((item: string, index: number) => (
            <li>
              {item}
              {/* <button onClick={() => deleteBtn(index)}>x</button> */}
            </li>
          ))}
        </ul>
      ) : null}

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
