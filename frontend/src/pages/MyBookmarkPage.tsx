import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Pagination } from '@mui/material';

import PrivateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/MyBookmarkViewModel';
import { Lesson } from '../types/LessonsType';

const MyBookmarkPage = () => {
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [lessons, setLessons] = useState<Array<Lesson>>([]);

  const userInfo = useRecoilValue(PrivateInfoState);
  const { getBookmark } = useViewModel();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (userInfo !== null) {
      const getData = async () => {
        const data = await getBookmark(userInfo.email);
        setLessons(data);
      };
      getData();
    }
  }, [page]);

  return (
    <div className="my-bookmark-page">
      북마크
      <div className="my-bookmark-page__pagination">
        <Pagination
          variant="outlined"
          count={count}
          page={page}
          shape="rounded"
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default MyBookmarkPage;
