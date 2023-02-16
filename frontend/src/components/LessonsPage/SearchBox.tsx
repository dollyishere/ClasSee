import React, { useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import { SearchBoxProps } from '../../types/SearchBoxType';

const SearchBox = ({
  dayOfWeek,
  setDayOfWeek,
  setMinStartTime,
  setMaxStartTime,
  setMinPrice,
  setMaxPrice,
  search,
}: SearchBoxProps) => {
  const minStartTimeRef = useRef(null);
  const maxStartTimeRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const hours = [...new Array(25)].map((_, i: number) => i);

  const onChangeMinStartTime = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setMinStartTime(Number(event.target.value));
  };
  const onChangeMaxStartTime = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setMaxStartTime(Number(event.target.value));
  };
  const onChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };
  const onChangeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };
  const reset = () => {
    setMinStartTime(undefined);
    setMaxStartTime(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setDayOfWeek(new Array(7).fill(false));
    if (minStartTimeRef.current !== null) {
      const target = minStartTimeRef.current as HTMLSelectElement;
      target.value = 'default';
    }
    if (maxStartTimeRef.current !== null) {
      const target = maxStartTimeRef.current as HTMLSelectElement;
      target.value = 'default';
    }
    if (minPriceRef.current !== null) {
      const target = minPriceRef.current as HTMLInputElement;
      target.value = '';
    }
    if (maxPriceRef.current !== null) {
      const target = maxPriceRef.current as HTMLInputElement;
      target.value = '';
    }
  };

  const handleDayClick = (day: number) => {
    const newDayOfWeek = dayOfWeek;
    newDayOfWeek[day] = !newDayOfWeek[day];
    setDayOfWeek([...newDayOfWeek]);
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="search-box">
      <Card className="search-box__card">
        <CardContent>
          <div className="search-box__row">
            <div className="search-box__label">요일</div>
            <div className="search-box__content">
              {days.map((day: string, i: number) => (
                <button
                  type="button"
                  className={
                    dayOfWeek[i]
                      ? 'button search-box__button--day clicked'
                      : 'button search-box__button--day'
                  }
                  onClick={() => handleDayClick(i)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="search-box__row">
            <div className="search-box__label">시작 시간</div>
            <div className="search-box__content">
              <div className="search-box__content--side">
                최소
                <select
                  className="search-box__input"
                  onChange={onChangeMinStartTime}
                  ref={minStartTimeRef}
                >
                  <option value="default">선택</option>
                  {hours.map((hour: number) => (
                    <option value={hour} key={hour}>
                      {String(hour).padStart(2, '0')} : 00
                    </option>
                  ))}
                </select>
                시
              </div>
              <div>~</div>
              <div className="search-box__content--side">
                최대
                <select
                  className="search-box__input"
                  onChange={onChangeMaxStartTime}
                  ref={maxStartTimeRef}
                >
                  <option value="default">선택</option>
                  {hours.map((hour: number) => (
                    <option value={hour} key={hour}>
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
                  onChange={onChangeMinPrice}
                  ref={minPriceRef}
                />
                P
              </div>
              <div>~</div>
              <div>
                최대
                <input
                  type="text"
                  placeholder="100,000"
                  className="search-box__input"
                  onChange={onChangeMaxPrice}
                  ref={maxPriceRef}
                />
                P
              </div>
            </div>
          </div>
          <div className="search-box__row">
            <button
              type="button"
              className="button search-box__button"
              onClick={reset}
            >
              초기화
            </button>
            <button
              type="button"
              className="button search-box__button"
              onClick={search}
            >
              검색하기
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBox;
