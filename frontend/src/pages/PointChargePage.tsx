import React, { useState } from 'react';
import {
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import privateInfoState from '../models/PrivateInfoAtom';

import kakaoPay from '../assets/payment_icon_yellow_small.png';

const PointChargePage = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  const paymentMethods = [
    {
      name: 'kakao',
      src: kakaoPay,
    },
  ];
  const userInfo = useRecoilValue(privateInfoState);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="point-charge-page">
      <Card className="point-charge-page__card">
        <CardContent>
          <div className="point-charge-page__select-box">
            <form className="point-charge-page__price-form">
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
            </form>
            <div className="point-charge-page__row--point">
              {userInfo !== null ? (
                <span>보유 포인트 {userInfo.point} P</span>
              ) : null}
            </div>
          </div>
          <div className="point-charge-page__payment">
            <div className="point-charge-page__label">결제 수단</div>
            <div className="point-charge-page__buttons">
              {paymentMethods.map((payment: any) => (
                <button
                  type="button"
                  className="point-charge-page__button--payment button"
                >
                  <img alt="카카오페이" src={payment.src} />
                </button>
              ))}
            </div>
          </div>
          <div className="point-charge-page__approve">
            <div className="point-charge-page__label">결제 동의</div>
            <div className="point-charge-page__contents">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleCheck} />
                  }
                  label="결제 수단과 금액을 확인하였습니다."
                />
              </FormGroup>
            </div>
          </div>
          <button
            type="button"
            className="button point-charge-page__button--submit"
          >
            충전 신청
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointChargePage;
