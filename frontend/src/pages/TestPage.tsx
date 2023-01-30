import React from 'react';

import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import useViewModel from '../viewmodels/TestViewModel';
import testState from '../models/TestAtom';

const TestPage = () => {
  const { test } = useViewModel();

  const testData = useRecoilValue(testState);

  return (
    <div>
      <button type="button" onClick={test}>
        클릭
      </button>
      <div>{testData}</div>
    </div>
  );
};

export default TestPage;
