import axios from 'axios';

const KakaoAPi = () => {
  const doKakaoPayReady = async (itemName: string, price: number) => {
    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/ready',
      {
        cid: 'TC0ONETIME',
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        item_name: itemName,
        quantity: 1,
        total_amount: price,
        tax_free_amount: 0,
        approval_url: `${process.env.REACT_APP_PRODUCTION_URL}/mypage/point/complete`,
        fail_url: `${process.env.REACT_APP_PRODUCTION_URL}/mypage/point/fail`,
        cancel_url: `${process.env.REACT_APP_PRODUCTION_URL}/mypage/point/cancel`,
      },
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return response;
  };

  const doKakaoPayApprove = async (tid: string, pgToken: string) => {
    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/approve',
      {
        cid: 'TC0ONETIME',
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        tid,
        pg_token: pgToken,
      },
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return response;
  };

  return {
    doKakaoPayReady,
    doKakaoPayApprove,
  };
};

export default KakaoAPi;
