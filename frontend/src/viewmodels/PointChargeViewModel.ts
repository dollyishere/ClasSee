import { useRecoilState } from 'recoil';
import useOrderApi from '../apis/OrderApi';
import useUserApi from '../apis/UserApi';
import PrivateInfoState from '../models/PrivateInfoAtom';

const PointChargeViewModel = () => {
  const { doChargePoint } = useOrderApi();
  const { doGetUserInfo } = useUserApi();
  const [userInfo, setUserInfo] = useRecoilState(PrivateInfoState);

  const chargePoint = async (email: string, point: number, payment: string) => {
    if (payment === 'kakaoPay') {
      // 카카오페이 로직처리 성공했다고 가정
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
    }
    return null;
  };
  return {
    chargePoint,
  };
};

export default PointChargeViewModel;
