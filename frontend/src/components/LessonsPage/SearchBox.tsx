import { Card, CardContent } from '@mui/material';
import React from 'react';

const SearchBox = () => {
  return (
    <div className="search-box">
      <Card className="search-box__card">
        <CardContent>
          <div className="search-box__row">
            <div className="search-box__label">요일</div>
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
          <div className="search-box__row">
            <div className="search-box__label">시작 시간</div>
            <div>
              최소
              <select>
                <option value="0">0</option>
              </select>
              시
            </div>
            <div>~</div>
            <div>
              최대
              <select>
                <option value="0">0</option>
              </select>
              시
            </div>
          </div>
          <div className="search-box__row">
            <div className="search-box__label">금액</div>
            <div>
              최소
              <input type="text" placeholder="10,000" />P
            </div>
            <div>~</div>
            <div>
              최대
              <input type="text" placeholder="10,000" />P
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
