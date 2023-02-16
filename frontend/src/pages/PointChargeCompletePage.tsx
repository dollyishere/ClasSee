import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';
import { useRecoilValue } from 'recoil';
import PrivateInfoState from '../models/PrivateInfoAtom';
import useViewModel from '../viewmodels/PointChargeViewModel';

const PointChargeCompletePage = () => {
  const userInfo = useRecoilValue(PrivateInfoState);
  const params = useParams();
  const location = useLocation();
  const { kakaoPayApprove } = useViewModel();
  if (params.status === 'cancel') {
    alert('결제가 취소되었습니다.');
    window.close();
  } else if (params.status === 'fail') {
    alert('결제가 실패하였습니다.');
    window.close();
  }
  useEffect(() => {
    if (userInfo) {
      const sendData = async () => {
        const kakaoResponse = await kakaoPayApprove(
          userInfo.email,
          location.search.split('=')[1],
        );
        console.log(kakaoResponse);
        if (kakaoResponse === undefined) {
          alert('내부 서버 오류');
          window.close();
        }
        if (kakaoResponse.statusCode === 400) {
          alert('권한이 없습니다.');
          window.close();
        }
      };
      sendData();
    }
  }, []);
  return (
    <div className="point-charge-completion-page">
      <div className="point-charge-page">
        <Card className="point-charge-page__card--success">
          <CardContent>
            <div className="point-charge-page__contents">
              <div className="point-charge-page__row">
                <div className="point-charge-page__label">이름</div>
                <div className="point-charge-page__content">
                  {userInfo ? userInfo.name : ''}
                </div>
              </div>
              <div className="point-charge-page__row">
                <div className="point-charge-page__label">결제 수단</div>
                <div className="point-charge-page__content">카카오 페이</div>
              </div>
              <div className="point-charge-page__row">
                <div className="point-charge-page__label">보유 포인트</div>
                <div className="point-charge-page__content">
                  {userInfo ? userInfo.point : ''}
                </div>
              </div>
              <button
                type="button"
                className="button point-charge-page__button--back"
                onClick={window.close}
              >
                닫기
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PointChargeCompletePage;
