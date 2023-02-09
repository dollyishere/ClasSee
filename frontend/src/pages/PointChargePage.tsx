import React from 'react';
import { Card, CardContent } from '@mui/material';

const PointChargePage = () => {
  return (
    <div className="point-charge-page">
      <Card className="point-charge-page__card">
        <CardContent>
          <div className="point-charge-page__select-box">
            <div className="point-charge-page__row">
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                5,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                10,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                15,000원
              </button>
            </div>
            <div className="point-charge-page__row">
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                20,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                25,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                30,000원
              </button>
            </div>
            <div className="point-charge-page__row">
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                50,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                80,000원
              </button>
              <button
                type="button"
                className="button point-charge-page__button--price"
              >
                100,000원
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointChargePage;
