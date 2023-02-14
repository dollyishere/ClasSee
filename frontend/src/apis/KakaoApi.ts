import axios from 'axios';

const KakaoAPi = () => {
  const kakaoPayReady = async () => {
    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/ready',
      {
        cid: 'TC0ONETIME',
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        item_name: '초코파이',
        quantity: 1,
        total_amount: 2200,
        vat_amount: 200,
        tax_free_amount: 0,
        approval_url: 'http://localhost:3000/',
        fail_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
      },
      {
        headers: {
          Authorization: `KakaoAK`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return response;
  };

  return {
    kakaoPayReady,
  };
};

export default KakaoAPi;
