const PointChargeViewModel = () => {
  const chargePoint = (point: number, payment: string) => {
    if (payment === 'kakaoPay') {
      // 카카오페이 로직처리 성공했다고 가정
    }
  };
  return {
    chargePoint,
  };
};

export default PointChargeViewModel;
