import { Card, CardContent } from '@mui/material';
import React from 'react';

const SearchBox = () => {
  const hours = [...new Array(25)].map((_, i: number) => i);

  return (
    <div className="search-box">
      <Card className="search-box__card">
        <CardContent>
          <div className="search-box__row">
            <div className="search-box__label">요일</div>
            <div className="search-box__content">
              <button type="button" className="button search-box__button--day">
                월요일
              </button>
              <button type="button" className="button search-box__button--day">
                화요일
              </button>
              <button type="button" className="button search-box__button--day">
                수요일
              </button>
              <button type="button" className="button search-box__button--day">
                목요일
              </button>
              <button type="button" className="button search-box__button--day">
                금요일
              </button>
              <button type="button" className="button search-box__button--day">
                토요일
              </button>
              <button type="button" className="button search-box__button--day">
                일요일
              </button>
            </div>
          </div>
          <div className="search-box__row">
            <div className="search-box__label">시작 시간</div>
            <div className="search-box__content">
              <div className="search-box__content--side">
                최소
                <select className="search-box__input">
                  {hours.map((hour: number) => (
                    <option value={hour}>
                      {String(hour).padStart(2, '0')} : 00
                    </option>
                  ))}
                </select>
                시
              </div>
              <div>~</div>
              <div className="search-box__content--side">
                최대
                <select className="search-box__input">
                  {hours.map((hour: number) => (
                    <option value={hour}>
                      {String(hour).padStart(2, '0')} : 00
                    </option>
                  ))}
                </select>
                시
              </div>
            </div>
          </div>
          <div className="search-box__row">
            <div className="search-box__label">금액</div>
            <div className="search-box__content">
              <div className="search-box__content--side">
                최소
                <input
                  type="text"
                  placeholder="10,000"
                  className="search-box__input"
                />
                P
              </div>
              <div>~</div>
              <div>
                최대
                <input
                  type="text"
                  placeholder="10,000"
                  className="search-box__input"
                />
                P
              </div>
            </div>
          </div>
          <div className="search-box__row">
            <button type="button" className="button search-box__button">
              초기화
            </button>
            <button type="button" className="button search-box__button">
              검색하기
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBox;
