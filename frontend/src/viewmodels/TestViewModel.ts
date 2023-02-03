import axios from 'axios';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import testState from '../models/TestAtom';

const TestViewModel = () => {
  const [tt, setTT] = useRecoilState(testState);
  const test = () => {
    setTT((prev: number) => prev + 1);
    // axios
    //   .get('http://i8a707.p.ssafy.io/api/v1/article/list?limit=1&offset=0')
    //   .then((res: any) => {
    //     console.log(res.data.page[0].title);
    //     setTT(res.data.page[0].title);
    //   });
  };
  return {
    test,
  };
};

export default TestViewModel;
