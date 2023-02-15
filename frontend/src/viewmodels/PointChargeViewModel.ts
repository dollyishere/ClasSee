import { useRecoilState } from 'recoil';
import useOrderApi from '../apis/OrderApi';
import useUserApi from '../apis/UserApi';
import useKakaoApi from '../apis/KakaoApi';
import PrivateInfoState from '../models/PrivateInfoAtom';

const PointChargeViewModel = () => {
  const { doChargePoint } = useOrderApi();
  const { doGetUserInfo } = useUserApi();
  const { doKakaoPayReady, doKakaoPayApprove } = useKakaoApi();
  const [userInfo, setUserInfo] = useRecoilState(PrivateInfoState);

  const kakaoPayReady = async (itemName: string, price: number) => {
    const response = await doKakaoPayReady(itemName, price);
    if (response.status === 200) {
      window.open(
        response.data.next_redirect_pc_url,
        '카카오페이 결제',
        'fullscreen=no, status=no',
      );

      localStorage.setItem('kakaoTid', response.data.tid);
    }
  };

  const chargePoint = async (email: string, point: number) => {
    const response = await doChargePoint(email, point);
    if (response?.statusCode === 200) {
      const newUserInfo = await doGetUserInfo(email);
      if (newUserInfo !== null) {
        setUserInfo({
          ...newUserInfo,
          email,
        });
        return 200;
      }
    }
    return null;
  };
  const kakaoPayApprove = async (email: string, pgToken: string) => {
    const tid = localStorage.getItem('kakaoTid');
    if (tid !== null) {
      const response = await doKakaoPayApprove(tid, pgToken);
      if (response.status === 200) {
        const chargeResponse = await chargePoint(
          email,
          response.data.amount.total,
        );
        if (chargeResponse === 200) {
          localStorage.removeItem('kakaoTid');
          return 200;
        }
      }
    }
    return null;
  };
  return {
    chargePoint,
    kakaoPayReady,
    kakaoPayApprove,
  };
};

export default PointChargeViewModel;
