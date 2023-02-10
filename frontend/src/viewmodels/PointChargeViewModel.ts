import useOrderApi from '../apis/OrderApi';
import useUsrApi from '../apis/UserApi';

const PointChargeViewModel = () => {
  const { doChargePoint } = useOrderApi();

  const chargePoint = async (email: string, point: number, payment: string) => {
    if (payment === 'kakaoPay') {
      // 카카오페이 로직처리 성공했다고 가정
      const response = await doChargePoint(email, point);
    }
  };
  return {
    chargePoint,
  };
};

export default PointChargeViewModel;
