import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Pagination } from '@mui/material';

import Header from '../components/Header';
import PrivateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/NoticeViewModel';
import useTimeStamp from '../utils/TimeStamp';
import Footer from '../components/Footer';

const NoticePage = () => {
  const [page, setPage] = useState<number>(1);
  const [notices, setNotices] = useState([]);
  const [count, setCount] = useState<number>(0);
  const userInfo = useRecoilValue(PrivateInfoState);
  const { getNotices } = useViewModel();
  const { toDate } = useTimeStamp();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const getData = async () => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const response = await getNotices(limit, offset);
      setCount(Math.ceil(response.count / limit));
      setNotices(response.page);
    };
    getData();
  }, [page]);
  return (
    <div className="notice-page">
      <Header />
      <div className="notice-page__contents">
        <div className="notice-page__title">공지사항</div>
        <div className="notice-page__content">
          {userInfo && userInfo.userRole === 'ROLE_ADMIN' ? (
            <div className="notice-page__write">
              <Link to="write">공지사항 작성하기</Link>
            </div>
          ) : null}
          <div className="notice-page__table">
            <div className="notice-page__table-header">
              <div className="notice-page__table-col--id">번호</div>
              <div className="notice-page__table-col--title">제목</div>
              <div className="notice-page__table-col--regtime">등록일</div>
            </div>
            <div className="notice-page__table-body">
              {notices.map((notice: any) => (
                <Link to={`/notice/${notice.id}`} key={notice.id}>
                  <div className="notice-page__table-row">
                    <div className="notice-page__table-col--id notice-page__table-col">
                      {notice.id}
                    </div>
                    <div className="notice-page__table-col--title notice-page__table-col">
                      {notice.title}
                    </div>
                    <div className="notice-page__table-col--regtime notice-page__table-col">
                      {toDate(notice.regtime)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="notice-page__pagination">
            <Pagination
              variant="outlined"
              count={count}
              page={page}
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoticePage;
