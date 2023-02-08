import React from 'react';

import { Button, Card, CardActions } from '@mui/material';

import { ChangeComponentProps } from '../types/CreateLessonType';

const ChangeComponentBtn = ({
  selectedComponentState,
  setSelectedComponentState,
  handleCreateLessonSubmit,
}: ChangeComponentProps) => {
  return (
    // 렌더링되는 컴포넌트가 무엇인지에 따라 버튼의 모습도 변화함
    // 만약 selectedComponentState의 값이 0이라면, 이전 단계를 볼 필요가 없으므로 해당 버튼을 숨김
    // 이전 단계 버튼의 경우, 클릭할 때마다 onClick event로 selectedComponentState 값을 1 감소시킴
    // 이를 통해 현재 렌더링되는 컴포넌트를 리렌더링을 통해 변화시킴
    <CardActions>
      {selectedComponentState === 1 ? null : (
        <Button
          type="button"
          variant="contained"
          onClick={() => setSelectedComponentState(selectedComponentState - 1)}
        >
          이전 단계
        </Button>
      )}
      {/* 반대로 다음 단계 버튼의 경우, selectedComponentState의 값이 6이라면 다음 단계 대신 강의 생성 버튼을 보이도록 함 */}
      {/* 마찬가지로 다음 단계 버튼의 경우 누를 때마다 selectedComponentState 값을 1씩 증가시켜 재렌더링을 유도함 */}
      {selectedComponentState === 6 ? (
        <Button
          type="button"
          variant="contained"
          onClick={handleCreateLessonSubmit}
        >
          강의 생성
        </Button>
      ) : (
        <Button
          type="button"
          variant="contained"
          onClick={() => setSelectedComponentState(selectedComponentState + 1)}
        >
          다음 단계
        </Button>
      )}
    </CardActions>
  );
};
export default ChangeComponentBtn;
