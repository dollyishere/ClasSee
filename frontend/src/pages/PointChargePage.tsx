import React, { useState } from 'react';
import {
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import useViewModel from '../viewmodels/PointChargeViewModel';
import privateInfoState from '../models/PrivateInfoAtom';

import kakaoPay from '../assets/payment_icon_yellow_small.png';
import authTokenState from '../models/AuthTokenAtom';

const PointChargePage = () => {
  const userInfo = useRecoilValue(privateInfoState);
  const [checked, setChecked] = useState<boolean>(false);
  const [point, setPoint] = useState<number | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const { chargePoint } = useViewModel();

  const paymentMethods = [
    {
      name: 'kakaoPay',
      src: kakaoPay,
    },
  ];
  const prices = [
    [5000, 10000, 15000],
    [20000, 25000, 30000],
    [50000, 80000, 100000],
  ];

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handlePointChange = (newPoint: number) => {
    if (newPoint === point) {
      setPoint(null);
    } else {
      setPoint(newPoint);
    }
  };

  const handlePaymentChange = (newPayment: string) => {
    if (payment === newPayment) {
      setPayment(null);
    } else {
      setPayment(newPayment);
    }
  };

  const handleChargeSubmit = () => {
    if (point === null) {
      alert('결제한 포인트를 선택해주세요.');
      return;
    }
    if (payment === null) {
      alert('결제 수단을 선택하세요.');
      return;
    }
    if (!checked) {
      alert('결제 동의를 체크해주세요.');
      return;
    }

    if (userInfo !== null) {
      chargePoint(userInfo?.email, point, payment);
    }
  };

  return (
    <div className="point-charge-page">
      <Card className="point-charge-page__card">
        <CardContent>
          <div className="point-charge-page__select-box">
            <form className="point-charge-page__price-form">
              {prices.map((row: Array<number>) => (
                <div className="point-charge-page__row" key={row[0]}>
                  {row.map((price: number) => (
                    <button
                      key={price}
                      type="button"
                      className="button point-charge-page__button--price"
                      style={{
                        backgroundColor: point === price ? '#7062c7' : '',
                        color: point === price ? 'white' : '',
                      }}
                      onClick={() => handlePointChange(price)}
                    >
                      {price}P
                    </button>
                  ))}
                </div>
              ))}
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
              {paymentMethods.map((method: any) => (
                <button
                  key={method.name}
                  type="button"
                  className="point-charge-page__button--payment button"
                  style={{
                    backgroundColor: method.name === payment ? '#7062c7' : '',
                  }}
                  onClick={() => handlePaymentChange(method.name)}
                >
                  <img alt="카카오페이" src={method.src} />
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
            onClick={handleChargeSubmit}
          >
            충전 신청
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointChargePage;
